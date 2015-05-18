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
  		$scope.displayRepoCount = 0;
  		$scope.totalRepoCount = 0;
  		$scope.searchText = '';
  		$scope.searchCategories = [];
  		$scope.selectedSortKey = null;
  		$scope.sortOptions = APP_CONFIG.sortOptions;

  		$scope.$on(APP_CONFIG.resetSummary, function (){
  			$scope.selectedSortKey = null;
  			$scope.displayRepoCount = 0;
  		});

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
        	return ResultData.getRepos();
        }, function (newVal) {
			if (typeof newVal === 'undefined') {
				return;
			}
			$scope.displayRepoCount = newVal.length;
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
						.position('bottom right')
						.hideDelay(3000)
						.parent('md-toolbar.navbar')
					);
					$scope.github.reset();
					return;
				}
				$scope.totalRepoCount = newVal;
			});

		/* SORT */
		$scope.$watch('selectedSortKey', function (newVal, oldVal) {
			if (newVal === oldVal) {
				return;
			}
			var selectedOption = $scope.sortOptions.filter(function (sortOption) {
				return sortOption.value === newVal;
			})[0];
			ResultData.sortBy(selectedOption);
		});

  });
