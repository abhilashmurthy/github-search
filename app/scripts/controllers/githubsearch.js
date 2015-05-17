'use strict';

angular
    .module('githubSearchApp', ['ngMaterial', 'infinite-scroll'])
    .controller('GithubSearchCtrl', function($scope, GITHUB_CONFIG, RepoManager, $timeout, $mdToast) {
        /* SEARCH */
        $scope.selectedItem = null;
        $scope.searchText = null;

        /* CATEGORIES */
        $scope.categories = GITHUB_CONFIG.in_categories;
        $scope.selectedCategories = $scope.categories.map(function (category) {
            return category.name;
        });

        /* RESULTS */
        $scope.results = [];
        var currentPaginationPage = 1;
        var maxPaginationPage = 0;
        $scope.isLoadingNextPage = false;
        $scope.nextResultsPage = function () {
            if ($scope.isLoadingNextPage || !$scope.hasResults) {
                return;
            }
            if (currentPaginationPage < maxPaginationPage) {
                $scope.isLoadingNextPage = true;
                currentPaginationPage++;
                searchGithub();
                $scope.isLoadingNextPage = false;
            }
        };

        /* AUTOCOMPLETE */
        $scope.states = [];

        /**
         * Search for past keywords for query
         */
        $scope.filterAutocomplete = function filterAutocomplete(query) {
            var results = query ? $scope.states.filter(function (state) {
                return state.value.indexOf(angular.lowercase(query)) === 0;
            }) : [];
            return results;
        };

        /** SEARCH **/
        function validateSearchText() {
            if (!$scope.searchText || $scope.searchText.length === 0) {
                return false;
            }
            if ($scope.searchText.length < 3) {
                $mdToast.show(
                    $mdToast.simple()
                    .content('Please enter a keyword with at least 3 chars!')
                    .position('top right')
                    .hideDelay(3000)
                );
                return false;
            }
            return true;
        }

        $scope.searchCategories = $scope.selectedCategories; //On init
        function validateSearchCategories() {
            if (!$scope.searchCategories || $scope.searchCategories.length === 0) {
                $mdToast.show(
                    $mdToast.simple()
                    .content('Please select at least one search category!')
                    .position('top right')
                    .hideDelay(3000)
                );
                return false;
            }
            return true;
        }

        $scope.$watch('searchText', function () {
            $scope.isEnteringText = false;
            if (validateSearchText() && validateSearchCategories()) {
                searchGithub();
            }
        });

        $scope.changeEnteringText = function (event) {
            if (event) {
                var keyCode = event.which || event.keyCode;
                if (keyCode === 0 || event.ctrlKey || event.metaKey || event.altKey) {
                    $scope.isEnteringText = false;
                    return false;
                }
            }
            $scope.results = [];
            $scope.hasResults = false;
            maxPaginationPage = 0;
            $scope.isEnteringText = true;
        };

        var tempFilterText = '', filterTextTimeout;
        $scope.$watch('selectedCategories', function (newValue) {
            if (validateSearchText($scope.searchText)) {
                $scope.changeEnteringText();
                if (filterTextTimeout) {
                    $timeout.cancel(filterTextTimeout);
                }

                tempFilterText = newValue;
                filterTextTimeout = $timeout(function() {
                    $scope.searchCategories = tempFilterText;
                    $scope.isEnteringText = false;
                    if (validateSearchCategories()) {
                        searchGithub();
                    }
                }, 500);
            }
        });

        function searchGithub() {
            RepoManager.searchRepos($scope.searchText + ' in:' + $scope.searchCategories, currentPaginationPage)
                .then(function(response) {
                    $scope.states.push({
                        value: $scope.searchText,
                        display: $scope.searchText
                    });
                    $scope.results = $scope.results.concat(response.repos);
                    $scope.hasResults = response.repos && response.repos.length;
                    $scope.resultsTotalCount = response.total_count;
                    if (!$scope.hasResults) {
                        $mdToast.show(
                            $mdToast.simple()
                            .content('No results found...')
                            .position('top right')
                            .hideDelay(3000)
                        );
                        return false;
                    }

                    if (!maxPaginationPage) {
                        maxPaginationPage = Math.ceil(response.total_count / response.repos.length);
                        console.log(maxPaginationPage);
                    }

                    $scope.rate_limit = parseInt(response.rate_limit_remaining);
                    if ($scope.rate_limit < 5) {
                        $mdToast.show(
                            $mdToast.simple()
                            .content('API rate limit: ' + ($scope.rate_limit + 1) + ' more times')
                            .position('top right')
                            .hideDelay(3000)
                        );
                    }
                });
        }
        $scope.searchGithub = searchGithub;

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