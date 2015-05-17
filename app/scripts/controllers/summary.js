'use strict';

/**
 * @ngdoc function
 * @name githubSearchApp.controller:SummaryCtrl
 * @description
 * # SummaryCtrl
 * Controller of the githubSearchApp
 */
angular.module('githubSearchApp')
  .controller('SummaryCtrl', function ($scope, APP_CONFIG, SearchData, ResultData, $mdToast) {
  		$scope.totalRepoCount = 0;
  		$scope.searchText = '';
  		$scope.searchCategories = [];
  		$scope.sortOptions = APP_CONFIG.sortOptions;

  		/* REPORT */
        $scope.$watch(function () {
                return SearchData.getSearchText();
            }, function (newVal) {
                if (typeof newVal === 'undefined') {
                    return;
                }
                $scope.searchText = newVal;
            });

        $scope.$watch(function () {
                return SearchData.getSearchCategories();
            }, function (newVal) {
                if (typeof newVal === 'undefined') {
                    return;
                }
                $scope.searchCategories = newVal;
            });

		$scope.$watch(function () {
				return ResultData.getTotalRepoCount();
			}, function (newVal) {
				if (typeof newVal === 'undefined') {
					return;
				}
				if (newVal === 0) {
					$mdToast.show(
						$mdToast.simple()
						.content('No results found...')
						.position('top right')
						.hideDelay(3000)
					);
					$scope.github.reset();
					return;
				}
				$scope.totalRepoCount = newVal;
			});

		/* SORT */
		// $scope.$watch('selectedSortKey', function (newVal) {
		// 	var repos = ResultData.getRepos();
		// 	var units = sortOptions.filter(function (sortOption) {

		// 	});

		// });

  });
