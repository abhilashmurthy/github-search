'use strict';

angular
    .module('githubSearchApp')
    .controller('GithubSearchCtrl', function ($scope, GITHUB_CONFIG, RepoManager, $timeout, $mdToast) {
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