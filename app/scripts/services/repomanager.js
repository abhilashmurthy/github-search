'use strict';

/**
 * @ngdoc service
 * @name githubSearchApp.RepoManager
 * @description
 * # RepoManager
 * Service in the githubSearchApp.
 */
angular.module('githubSearchApp')
    .service('RepoManager', ['$q', '$http', 'GITHUB_CONFIG', 'Repo', function($q, $http, GITHUB_CONFIG, Repo) {
        return {
            searchRepos: function(query) {
                var deferred = $q.defer();
                $http.get(GITHUB_CONFIG.endpoint + '?q=' + query)
                    .success(function(response, status, getResponseHeaders) {
                        var toReturn = {
                            rate_limit_remaining: getResponseHeaders()[GITHUB_CONFIG.rate_limit_header],
                            repos: []
                        };
                        for (var i = 0; i < response[GITHUB_CONFIG.response_array].length; i++) {
                            toReturn.repos.push(new Repo(response[GITHUB_CONFIG.response_array][i]));
                        }
                        deferred.resolve(toReturn);
                    })
                    .error(function(response, status) {
                        if (status === 403) {
                            var toReturn = {
                                rate_limit_remaining: 0
                            };
                            deferred.resolve(toReturn);
                        }
                    });
                return deferred.promise;
            }
        };
    }])
    .factory('Repo', function() {
        function Repo(data) {
            for (var attr in data) {
                if (data.hasOwnProperty(attr)) {
                    this[attr] = data[attr];
                }
            }
        }
        return Repo;
    });