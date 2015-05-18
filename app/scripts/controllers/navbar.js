'use strict';

/**
 * @ngdoc function
 * @name githubSearchApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the githubSearchApp
 */
angular.module('githubSearchApp')
  .controller('NavbarCtrl', function ($scope, SearchData, APP_CONFIG, $timeout, $mdToast) {
        $scope.searchText = null;
        $scope.searchCategories = [];
    	$scope.isEnteringText = false;
        $scope.categories = APP_CONFIG.categories;
        $scope.defaultDebounce = APP_CONFIG.debounce;

        $scope.$watch('searchText', function (newValue) {
            if (validateSearchText() && validateSearchCategories()) {
                console.log('Setting search data: ' + newValue + $scope.searchCategories);
            	SearchData.setSearchData(newValue, $scope.searchCategories);
            }
            SearchData.setEnteringText(false);
        });

        $scope.$watch('searchCategories', function (newValue, oldValue) {
        	if (oldValue && newValue.indexOf('none') >= 0) {
        		$scope.searchCategories = oldValue || [];
        		return;
        	}
            if (validateSearchText() && validateSearchCategories()) {
                SearchData.setSearchData($scope.searchText, newValue);
            }
            SearchData.setEnteringText(false);
        });

        $scope.changeEnteringText = function (event) {
            if (event) {
                var keyCode = event.which || event.keyCode;
                if (keyCode === 0 || event.ctrlKey || event.metaKey || event.altKey) {
                    SearchData.setEnteringText(false);
                    return false;
                }
            }
            SearchData.setEnteringText(true);
        };

        function validateSearchText() {
            if (!$scope.searchText || $scope.searchText.length === 0) {
                return false;
            }
            if ($scope.searchText.length < 3) {
                $mdToast.show(
                    $mdToast.simple()
                    .content('Please enter a keyword with at least 3 chars!')
                    .action('OK')
                    .position('bottom right')
                    .hideDelay(3000)
                    .parent('md-toolbar.navbar')
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
                    .action('OK')
                    .position('bottom right')
                    .hideDelay(3000)
                    .parent('md-toolbar.navbar')
                );
                return false;
            }
            return true;
        }

  });
