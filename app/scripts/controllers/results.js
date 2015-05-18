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

		$scope.showDialog = function (repo) {
			ResultData.setFocusedResult(repo);
			$mdDialog.show({
				controller: ResultCtrl,
				templateUrl: 'views/result.html'
			});
		};

	});
