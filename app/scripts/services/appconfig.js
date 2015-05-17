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
  		'sortOptions': [{
  			'label': 'Full Name',
  			'value': 'full_name',
  			'units': 'alphabetical'
  		}, {
  			'label': 'Owner Name',
  			'value': 'owner.login',
  			'units': 'alphabetical'
  		},{
  			'label': 'Language',
  			'value': 'language',
  			'units': 'buckets'
  		}, {
  			'label': 'Follower Count',
  			'value': 'followers',
  			'units': 'buckets',
  			'bucketValues': ['< 50', '50 - 100', '> 100']
  		}],
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
