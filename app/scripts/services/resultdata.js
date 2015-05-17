'use strict';

/**
 * @ngdoc service
 * @name githubSearchApp.ResultData
 * @description
 * # ResultData
 * Factory in the githubSearchApp.
 */
angular.module('githubSearchApp')
  .factory('ResultData', function ($http, GITHUB_CONFIG) {
    var ResultData = {
      searchQuery: '',
      repos: [],
      totalRepoCount: -1,
      currentPage: 1,
      lastPage: 1,
      isLoadingNextPage: false,
      rateLimitRemaining: -1,
      error: '',
      focusedResult: {}
    };

    var isAbleToFetch = function () {
        if (ResultData.isLoadingNextPage) {
          return false;
        }
        if (!ResultData.searchQuery) {
          return false;
        }
        if (ResultData.currentPage > ResultData.lastPage) {
          return false;
        }
        return true;
    };

    var fetchResults = function fetchResults () {
        if (isAbleToFetch()) {
          ResultData.isLoadingNextPage = true;
          var url = GITHUB_CONFIG.endpoint + '?q=' + ResultData.searchQuery + '&page=' + ResultData.currentPage;
          console.log('GET: ' + url);
          $http.get(url)
            .success(function (data, status, headers) {
              if (status !== 200) {
                ResultData.error = data[GITHUB_CONFIG.error_message];
              } else {
                ResultData.rateLimitRemaining = headers()[GITHUB_CONFIG.rate_limit_header];
                ResultData.repos = ResultData.repos.concat(data[GITHUB_CONFIG.response_array]);
                ResultData.totalRepoCount = data[GITHUB_CONFIG.total_count];
                if (ResultData.lastPage === 1) {
                  ResultData.lastPage = Math.ceil(data[GITHUB_CONFIG.total_count] / ResultData.repos.length);
                }
                if (ResultData.currentPage <= ResultData.lastPage) {
                  ResultData.currentPage++;
                }
              }
              ResultData.isLoadingNextPage = false;
            })
            .error(function (data, status) {
              if (status !== 200) {
                ResultData.error = data[GITHUB_CONFIG.error_messages];
              }
              ResultData.isLoadingNextPage = false;
            });
        }
      };

    // Public API here
    return {
      setSearchQuery: function (query) {
        ResultData.searchQuery = query;
        fetchResults();
      },
      fetchResults: fetchResults,
      getRepos: function () {
        return ResultData.repos;
      },
      getTotalRepoCount: function () {
        return ResultData.totalRepoCount;
      },
      isLoadingNextPage: function() {
        return ResultData.isLoadingNextPage;
      },
      getRateLimitRemaining: function () {
        return ResultData.rateLimitRemaining;
      },
      getError: function () {
        return ResultData.error;
      },
      reset: function () {
        ResultData.searchQuery = '';
        ResultData.repos = [];
        ResultData.totalRepoCount = -1;
        ResultData.currentPage = 1;
        ResultData.lastPage = 1;
        ResultData.isLoadingNextPage = false;
        ResultData.rateLimitRemaining = -1;
        ResultData.error = '';
        ResultData.focusedResult = {};
      },
      setFocusedResult: function (result) {
        ResultData.focusedResult = result;
      },
      getFocusedResult: function () {
        return ResultData.focusedResult;
      }
    };
  });