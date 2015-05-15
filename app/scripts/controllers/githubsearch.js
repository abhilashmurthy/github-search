(function() {
    'use strict';
    angular
        .module('githubSearchApp', ['ngMaterial'])
        .controller('GithubSearchCtrl', function($mdToast, RepoManager) {
            var self = this;
            self.selectedItem = null;
            self.searchText = null;

            /**
             * Search for past keywords for query
             */
            function querySearch(query) {
                var results = query ? self.states.filter(createFilterFor(query)) : [];
                return results;
            }

            self.querySearch = querySearch;
            function loadAll() {
                    var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware';
                    return allStates.split(/, +/g).map(function(state) {
                        return {
                            value: state.toLowerCase(),
                            display: state
                        };
                    });
                }
            self.states = loadAll();

            /**
             * Create filter function for a query string
             */
            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(state) {
                    return (state.value.indexOf(lowercaseQuery) === 0);
                };
            }

            function searchGithub() {
                if (!self.selectedItem) {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Please enter a keyword!')
                            .position('false true false true')
                            .hideDelay(3000)
                    );
                    return;
                }

                var searchIn = ' in:';
                // searchIn += _.pluck(_.where($scope.categories, {selected: true}), 'name').join();

                RepoManager.searchRepos(self.selectedItem + searchIn)
                    .then(function (response) {
                        console.log(response);
                        // $scope.results = response.repos;
                        // $scope.hasResults = response.repos && response.repos.length;
                        // $scope.rate_limit = parseInt(response.rate_limit_remaining);
                        // if (!$scope.hasResults) {
                        //     // Materialize.toast('No results found...', 3000);
                        //     return false;
                        // }
                        // if ($scope.rate_limit < 5) {
                        //     // Materialize.toast('You can only search ' + ($scope.rate_limit + 1) + ' more times', 3000);
                        // }
                        // // Materialize.showStaggeredList('#resultsList');
                    });
            }
            self.searchGithub = searchGithub;

        });
})();