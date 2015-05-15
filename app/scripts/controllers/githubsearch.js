(function() {
    'use strict';
    angular
        .module('githubSearchApp', ['ngMaterial'])
        .controller('GithubSearchCtrl', function() {
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
            // function loadAll() {
            //         var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware';
            //         return allStates.split(/, +/g).map(function(state) {
            //             return {
            //                 value: state.toLowerCase(),
            //                 display: state
            //             };
            //         });
            //     }
            self.states = [];

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