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
		$scope.hasResults = false;
		$scope.searchQuery = '';
		$scope.infiniteScrollDistance = APP_CONFIG.infiniteScrollDistance;

		$scope.$watch(function() {
				return SearchData.getSearchQuery();
			}, function (newVal, oldVal) {
				if (!newVal || newVal.length === 0 || newVal === oldVal) {
					return;
				}
				$scope.searchQuery = newVal;
				$scope.github.reset();
				$scope.github.setSearchQuery(newVal);
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
				$scope.hasResults = true;
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
						.position('top right')
						.hideDelay(3000)
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
				templateUrl: 'partials/result.html'
			});
		};

	});