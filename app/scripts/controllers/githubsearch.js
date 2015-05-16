'use strict';

angular
    .module('githubSearchApp', ['ngMaterial'])
    .controller('GithubSearchCtrl', function($scope, GITHUB_CONFIG, RepoManager, $mdToast) {
        $scope.selectedItem = null;
        $scope.searchText = null;

        /**
         * Search for past keywords for query
         */
        $scope.querySearch = function querySearch(query) {
            var results = query ? $scope.states.filter(function (state) {
                return state.value.indexOf(angular.lowercase(query)) === 0;
            }) : [];
            return results;
        };

        function loadAll() {
            var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware';
            return allStates.split(/, +/g).map(function(state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }
        $scope.states = loadAll();

        /* TOAST */

        $scope.toastPosition = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        $scope.getToastPosition = function() {
            return Object.keys($scope.toastPosition)
                .filter(function(pos) {
                    return $scope.toastPosition[pos];
                })
                .join(' ');
        };

        function searchGithub() {
            if (!$scope.searchText) {
                $mdToast.show(
                    $mdToast.simple()
                    .content('Please enter a keyword!')
                    .position($scope.getToastPosition())
                    .hideDelay(3000)
                );
                return;
            }

            var searchIn = ' in:' + $scope.categories.filter(function (category) {
                return category.selected;
            }).map(function (category) {
                return category.name;
            }).join(',');

            RepoManager.searchRepos($scope.searchText + searchIn)
                .then(function(response) {
                    $scope.results = response.repos;
                    $scope.hasResults = response.repos && response.repos.length;
                    $scope.rate_limit = parseInt(response.rate_limit_remaining);
                    if (!$scope.hasResults) {
                        $mdToast.show(
                            $mdToast.simple()
                            .content('No results found...')
                            .position($scope.getToastPosition())
                            .hideDelay(3000)
                        );
                        return false;
                    }
                    if ($scope.rate_limit < 5) {
                        $mdToast.show(
                            $mdToast.simple()
                            .content('You can only search ' + ($scope.rate_limit + 1) + ' more times')
                            .position($scope.getToastPosition())
                            .hideDelay(3000)
                        );
                    }
                });
        }
        $scope.searchGithub = searchGithub;

        /* CATEGORIES */
        $scope.categories = GITHUB_CONFIG.in_categories;

        /* RESULTS */
        $scope.showResult = function (result) {
            if (!result.show) {
                result.show = true;
            } else {
                result.show = !result.show;
            }
            return false;
        };


    });