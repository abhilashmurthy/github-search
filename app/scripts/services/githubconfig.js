(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name githubSearchApp.GITHUB_CONFIG
     * @description
     * # GITHUB_CONFIG
     * Constant in the githubSearchApp.
     */
    angular.module('githubSearchApp')
        .constant('GITHUB_CONFIG', {
            'name': 'Github Search Repositories v3',
            'endpoint': 'https://api.github.com/search/repositories',
            'in_categories': [{
                'name': 'name',
                'selected': true
            }, {
                'name': 'description',
                'selected': true
            }, {
                'name': 'readme',
                'selected': true
            }],
            'rate_limit_header': 'x-ratelimit-remaining',
            'response_array': 'items'
        });

})();