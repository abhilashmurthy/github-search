'use strict';

angular
    .module('githubSearchApp')
    .controller('GithubSearchCtrl', function ($scope, GITHUB_CONFIG, SearchData, ResultData, $interval) {
        $scope.isEnteringText = false;
        $scope.hasResults = false;
        $scope.isLoadingNextPage = false;
        $scope.hasApiError = false;

        $scope.$watch(function () {
                return SearchData.isEnteringText();
            }, function (newVal) {
                if (typeof newVal === 'undefined') {
                    return;
                }
                $scope.isEnteringText = newVal;
            });

        $scope.$watch(function () {
                return ResultData.isLoadingNextPage();
            }, function (newVal) {
                if (typeof newVal === 'undefined') {
                    return;
                }
                $scope.isLoadingNextPage = newVal;
            });

        $scope.$watch(function () {
                return ResultData.getTotalRepoCount();
            }, function (newVal) {
                if (typeof newVal === 'undefined') {
                    return;
                }
                $scope.hasResults = newVal > 0;
            });

        $scope.$watch(function () {
                return ResultData.getApiError();
            }, function (newVal) {
                if (typeof newVal === 'undefined' || !newVal.length) {
                    return;
                }
                $scope.hasApiError = newVal;
                ResultData.reset();

                $scope.refreshTimeRemaining = 20;
                $interval(function () {
                    --$scope.refreshTimeRemaining;
                    if (!$scope.refreshTimeRemaining) {
                        window.location.reload();
                    }
                }, 1000);
            });

    });