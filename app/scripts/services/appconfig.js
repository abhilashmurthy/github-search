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
  		'debounce': 500,
  		'rateLimitRemainingWarning': 5,
  		'infiniteScrollDistance': 0,
		'categories': [{
			'name': 'name',
			'selected': true,
			'checkboxSelected': true //This is just a hack
		}, {
			'name': 'description',
			'selected': true,
			'checkboxSelected': true //This is just a hack
		}, {
			'name': 'readme',
			'selected': true,
			'checkboxSelected': true //This is just a hack
		}],
  });
