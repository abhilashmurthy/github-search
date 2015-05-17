'use strict';

/**
 * @ngdoc function
 * @name githubSearchApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the githubSearchApp
 */
angular.module('githubSearchApp')
  .controller('NavbarCtrl', function ($scope, GITHUB_CONFIG, $timeout, $mdToast) {
        $scope.searchText = null;
        $scope.categories = GITHUB_CONFIG.in_categories;
        $scope.searchCategories = $scope.selectedCategories; //On init

        $scope.$watch('searchText', function () {
            $scope.isEnteringText = false;
            if (validateSearchText() && validateSearchCategories()) {
                // searchGithub();
            }
        });

        $scope.$watch('selectedCategories', function (newValue) {
        	console.log(newValue);
            if (validateSearchText() && validateSearchCategories()) {
                // searchGithub();
            }
        });

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
            // maxPaginationPage = 0;
            $scope.isEnteringText = true;
        };

  });
