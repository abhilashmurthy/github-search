'use strict';

/**
 * @ngdoc service
 * @name githubSearchApp.APP_CONFIG
 * @description
 * # APP_CONFIG
 * Constant in the githubSearchApp.
 */
angular.module('githubSearchApp')
  .constant('APP_CONFIG', {
		'categories': [{
			'name': 'name',
			'selected': true,
			'checkboxSelected': true
		}, {
			'name': 'description',
			'selected': true,
			'checkboxSelected': true
		}, {
			'name': 'readme',
			'selected': true,
			'checkboxSelected': true
		}],
  });
