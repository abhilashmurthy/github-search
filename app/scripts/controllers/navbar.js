'use strict';

/**
 * @ngdoc function
 * @name githubSearchApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the githubSearchApp
 */
angular.module('githubSearchApp')
  .controller('NavbarCtrl', function ($scope, APP_CONFIG, $timeout, $mdToast) {
        $scope.searchText = null;
        $scope.searchCategories = [];
    	$scope.isEnteringText = false;

        $scope.categories = APP_CONFIG.categories;
        $scope.true_name = true;
        $scope.true_description = true;
        $scope.true_readme = true;

        $scope.$watch('searchText', function () {
            $scope.isEnteringText = false;
            if (validateSearchText() && validateSearchCategories()) {
            	console.log('Searching: ' + $scope.searchText);
            	console.log('Categories: ' + JSON.stringify($scope.searchCategories));
                // searchGithub();
            }
        });

        $scope.$watch('searchCategories', function (newValue, oldValue) {
        	if (oldValue && newValue.indexOf('none') >= 0) {
        		$scope.searchCategories = oldValue || [];
        		return;
        	}
            if (validateSearchText() && validateSearchCategories()) {
            	console.log('Searching: ' + $scope.searchText);
            	console.log('Categories: ' + JSON.stringify($scope.searchCategories));
                // searchGithub();
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
            $scope.isEnteringText = true;
        };

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

  });
