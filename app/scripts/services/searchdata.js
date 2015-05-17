'use strict';

/**
 * @ngdoc service
 * @name githubSearchApp.SearchData
 * @description
 * # SearchData
 * Factory in the githubSearchApp.
 */
angular.module('githubSearchApp')
  .factory('SearchData', function () {
    var SearchData = {
      searchText: '',
      searchCategories: [],
      isEnteringText: false
    };

    // Public API here
    return {
      setSearchData: function (searchText, searchCategories) {
        SearchData.searchText = searchText;
        SearchData.searchCategories = searchCategories;
      },
      getSearchText: function () {
        return SearchData.searchText;
      },
      getSearchCategories: function () {
        return SearchData.searchCategories;
      },
      getSearchQuery: function() {
        var searchQuery = SearchData.searchText;
        searchQuery = searchQuery.concat(' in:');
        searchQuery = searchQuery.concat(SearchData.searchCategories.join(','));
        return searchQuery;
      },
      isEnteringText: function () {
        return SearchData.isEnteringText;
      },
      setEnteringText: function (isEnteringText) {
        SearchData.isEnteringText = isEnteringText;
      }
    };
  });
