'use strict';

/* UNDERSCORE FACTORY */
angular.module('underscore', [])
  .factory('_', ['$window', function($window) {
    return $window._; // assumes underscore has already been loaded on the page
  }]);

/**
 * @ngdoc overview
 * @name githubSearchApp
 * @description
 * # githubSearchApp
 *
 * Main module of the application.
 */
angular
  .module('githubSearchApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'infinite-scroll',
    'underscore'
  ]);