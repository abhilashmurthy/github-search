(function() {
    'use strict';
    angular
        .module('githubSearchApp', ['ngMaterial'])
        .controller('GithubSearchCtrl', function() {
            var self = this;
            self.selectedItem = null;
            self.searchText = null;

            // ******************************
            // Internal methods
            // ******************************
            /**
             * Search for states... use $timeout to simulate
             * remote dataservice call.
             */
            function querySearch(query) {
                var results = query ? self.states.filter(createFilterFor(query)) : [];
                return results;
            }

            self.querySearch = querySearch;
            /**
             * Build `states` list of key/value pairs
             */
            function loadAll() {
                    var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware';
                    return allStates.split(/, +/g).map(function(state) {
                        return {
                            value: state.toLowerCase(),
                            display: state
                        };
                    });
                }
                // list of `state` value/display objects
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
        });
})();