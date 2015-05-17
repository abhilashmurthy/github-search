'use strict';

/**
 * @ngdoc function
 * @name githubSearchApp.controller:SummaryCtrl
 * @description
 * # SummaryCtrl
 * Controller of the githubSearchApp
 */
angular.module('githubSearchApp')
  .controller('SummaryCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
