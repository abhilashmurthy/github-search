'use strict';

function ResultCtrl($scope, $mdDialog, ResultData) {
	$scope.repo = ResultData.getFocusedResult();
	$scope.ok = function () {
		$mdDialog.cancel();
	};
}

/**
 * @ngdoc function
 * @name githubSearchApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the githubSearchApp
 */
angular.module('githubSearchApp')
	.controller('ResultsCtrl', function ($scope, SearchData, ResultData, APP_CONFIG, $mdToast, $mdDialog) {
		$scope.github = ResultData;
		$scope.infiniteScrollDistance = APP_CONFIG.infiniteScrollDistance;
		$scope.sortKey = null;
		$scope.sortBucketValues = [];
		var sortType = null;

		var resetResults = function () {
			$scope.github.reset();
		};

		$scope.$on(APP_CONFIG.resetResults, function () {
			resetResults();
		});

		$scope.$watch(function() {
				return SearchData.getSearchQuery();
			}, function (newVal, oldVal) {
				if (!newVal || newVal.length === 0 || newVal === oldVal) {
					return;
				}
				resetResults();
				$scope.github.setSearchQuery(newVal);
			});

		$scope.$watch(function () {
				return ResultData.getRateLimitRemaining();
			}, function (newVal) {
				if (typeof newVal === 'undefined') {
					return;
				}
				if (newVal >= 0 && newVal < APP_CONFIG.rateLimitRemainingWarning) {
					$mdToast.show(
						$mdToast.simple()
						.content('API rate limit: ' + newVal + ' more times')
						.position('bottom right')
						.hideDelay(3000)
						.parent('md-toolbar.navbar')
					);
					if (newVal === 0) {
						$scope.github.reset();
					}
				}
			});

		$scope.$watch(function () {
				return ResultData.getSortKey();
			}, function (newVal) {
				if (typeof newVal === 'undefined') {
					return;
				}
				$scope.sortKey = newVal;
				$scope.sortBucketValues = ResultData.getSortBucketValues();
				sortType = ResultData.getSortType();
			});

		$scope.bucketMatcher = function (bucketValue) {
			return function (repo) {
				if (sortType === 'gteq') {
					var nextBucketValue = 0;
					for (var i = 0; i < $scope.sortBucketValues.length; i++) {
						if ($scope.sortBucketValues[i] === bucketValue && i + 1 <= $scope.sortBucketValues.length) {
							nextBucketValue = $scope.sortBucketValues[i + 1];
							break;
						}
					}
					return repo[$scope.sortKey] >= bucketValue && (nextBucketValue ? repo[$scope.sortKey] <= nextBucketValue : true);
				} else if (sortType === 'eq') {
					return repo[$scope.sortKey] === bucketValue;
				}
			};
		};

		$scope.showDialog = function (repo) {
			ResultData.setFocusedResult(repo);
			$mdDialog.show({
				controller: ResultCtrl,
				templateUrl: 'views/result.html'
			});
		};

	});
