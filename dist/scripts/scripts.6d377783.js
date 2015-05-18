"use strict";function ResultCtrl(a,b,c){a.repo=c.getFocusedResult(),a.ok=function(){b.cancel()}}angular.module("underscore",[]).factory("_",["$window",function(a){return a._}]),angular.module("githubSearchApp",["ngAnimate","ngAria","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial","infinite-scroll","underscore"]),angular.module("githubSearchApp").controller("GithubSearchCtrl",["$scope","GITHUB_CONFIG","APP_CONFIG","SearchData","ResultData","$interval",function(a,b,c,d,e,f){a.isWelcomeScreen=!0,a.isEnteringText=!1,a.hasResults=!1,a.isLoadingNextPage=!1,a.hasApiError=!1,a.toggleHomeScreen=function(b){b?(b.stopPropagation(),a.isWelcomeScreen=!0,a.$broadcast(c.resetNav),a.$broadcast(c.resetSummary),a.$broadcast(c.resetResults)):a.isWelcomeScreen=!1},a.$watch(function(){return d.isEnteringText()},function(b){"undefined"!=typeof b&&b.length&&(a.isEnteringText=b)}),a.$watch(function(){return e.isLoadingNextPage()},function(b){"undefined"!=typeof b&&(a.isLoadingNextPage=b)}),a.$watch(function(){return e.getTotalRepoCount()},function(b){"undefined"!=typeof b&&(a.hasResults=b>0)}),a.$watch(function(){return e.getApiError()},function(b){"undefined"!=typeof b&&b.length&&(a.hasApiError=b,e.reset(),a.refreshTimeRemaining=20,f(function(){--a.refreshTimeRemaining,a.refreshTimeRemaining||window.location.reload()},1e3))})}]),angular.module("githubSearchApp").controller("NavbarCtrl",["$scope","SearchData","APP_CONFIG","$timeout","$mdToast",function(a,b,c,d,e){function f(){return a.searchText&&0!==a.searchText.length?a.searchText.length<3?(e.show(e.simple().content("Please enter a keyword with at least 3 chars!").action("OK").position("bottom right").hideDelay(3e3).parent("md-toolbar.navbar")),!1):!0:!1}function g(){return a.searchCategories&&0!==a.searchCategories.length?!0:(e.show(e.simple().content("Please select at least one search category!").action("OK").position("bottom right").hideDelay(3e3).parent("md-toolbar.navbar")),!1)}a.searchText=null,a.searchCategories=[],a.isEnteringText=!1,a.categories=c.categories,a.defaultDebounce=c.debounce,a.$on(c.resetNav,function(){a.searchText=null,a.searchCategories=a.categories.map(function(a){return a.name})}),a.$watch("searchText",function(c){f()&&g()&&(console.log("Setting search data: "+c+a.searchCategories),b.setSearchData(c,a.searchCategories)),b.setEnteringText(!1)}),a.$watch("searchCategories",function(c,d){return d&&c.indexOf("none")>=0?void(a.searchCategories=d||[]):(f()&&g()&&b.setSearchData(a.searchText,c),void b.setEnteringText(!1))}),a.changeEnteringText=function(a){if(a){var c=a.which||a.keyCode;if(0===c||a.ctrlKey||a.metaKey||a.altKey)return b.setEnteringText(!1),!1}b.setEnteringText(!0)}}]),function(){angular.module("githubSearchApp").constant("GITHUB_CONFIG",{name:"Github Search Repositories v3",endpoint:"https://api.github.com/search/repositories",rate_limit_header:"x-ratelimit-remaining",response_array:"items",total_count:"total_count"})}(),angular.module("githubSearchApp").service("RepoManager",["$q","$http","GITHUB_CONFIG","Repo",function(a,b,c,d){return{searchRepos:function(e,f){var g=a.defer();return console.log("GET: "+c.endpoint+"?q="+e+"&page="+f),b.get(c.endpoint+"?q="+e+"&page="+f).success(function(a,b,e){for(var f={rate_limit_remaining:e()[c.rate_limit_header],total_count:a[c.total_count],repos:[]},h=0;h<a[c.response_array].length;h++)f.repos.push(new d(a[c.response_array][h]));g.resolve(f)}).error(function(a,b){if(console.log(b),403===b){var c={rate_limit_remaining:0};g.resolve(c)}}),g.promise}}}]).factory("Repo",function(){function a(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b])}return a}),angular.module("githubSearchApp").constant("APP_CONFIG",{debounce:500,rateLimitRemainingWarning:5,infiniteScrollDistance:0,sortOptions:[{label:"Full Name",value:"full_name",units:"alphabetical"},{label:"Language",value:"language",units:"buckets",type:"eq"},{label:"Watchers",value:"watchers",units:"buckets",type:"gteq",bucketValues:[0,50,100,200]}],resetNav:"resetNavCtrl",resetSummary:"resetSummCtrl",resetResults:"resetResultsCtrl",categories:[{name:"name",selected:!0,checkboxSelected:!0},{name:"description",selected:!0,checkboxSelected:!0},{name:"readme",selected:!0,checkboxSelected:!0}]}),angular.module("githubSearchApp").factory("SearchData",function(){var a={searchText:"",searchCategories:[],isEnteringText:!1};return{setSearchData:function(b,c){a.searchText=b,a.searchCategories=c},getSearchText:function(){return a.searchText},getSearchCategories:function(){return a.searchCategories},getSearchQuery:function(){var b=a.searchText;return b=b.concat(" in:"),b=b.concat(a.searchCategories.join(","))},isEnteringText:function(){return a.isEnteringText},setEnteringText:function(b){a.isEnteringText=b}}}),angular.module("githubSearchApp").controller("SummaryCtrl",["$scope","APP_CONFIG","SearchData","ResultData","$mdToast",function(a,b,c,d,e){a.totalRepoCount=0,a.searchText="",a.searchCategories=[],a.selectedSortKey=null,a.sortOptions=b.sortOptions,a.$on(b.resetSummary,function(){a.selectedSortKey=null}),a.$watch(function(){return c.getSearchText()},function(b){"undefined"!=typeof b&&(a.searchText=b)}),a.$watch(function(){return c.getSearchCategories()},function(b){"undefined"!=typeof b&&(a.searchCategories=b)}),a.$watch(function(){return d.getTotalRepoCount()},function(b){return"undefined"!=typeof b?0===b?(e.show(e.simple().content("No results found...").position("bottom right").hideDelay(3e3).parent("md-toolbar.navbar")),void a.github.reset()):void(a.totalRepoCount=b):void 0}),a.$watch("selectedSortKey",function(b,c){if(b!==c){var e=a.sortOptions.filter(function(a){return a.value===b})[0];d.sortBy(e)}})}]),ResultCtrl.$inject=["$scope","$mdDialog","ResultData"],angular.module("githubSearchApp").controller("ResultsCtrl",["$scope","SearchData","ResultData","APP_CONFIG","$mdToast","$mdDialog",function(a,b,c,d,e,f){a.github=c,a.infiniteScrollDistance=d.infiniteScrollDistance,a.sortKey=null,a.sortType=null,a.sortBucketValues=[];var g=function(){a.github.reset()};a.$on(d.resetResults,function(){g()}),a.$watch(function(){return b.getSearchQuery()},function(b,c){b&&0!==b.length&&b!==c&&(g(),a.github.setSearchQuery(b))}),a.$watch(function(){return c.getRateLimitRemaining()},function(b){"undefined"!=typeof b&&b>=0&&b<d.rateLimitRemainingWarning&&(e.show(e.simple().content("API rate limit: "+b+" more times").position("bottom right").hideDelay(3e3).parent("md-toolbar.navbar")),0===b&&a.github.reset())}),a.$watch(function(){return c.getSortKey()},function(b){"undefined"!=typeof b&&(a.sortKey=b,a.sortType=c.getSortType(),a.sortBucketValues=c.getSortBucketValues())}),a.bucketMatcher=function(b,c){return function(d){if("gteq"===c){for(var e=0,f=0;f<a.sortBucketValues.length;f++)if(a.sortBucketValues[f]===b&&f+1<=a.sortBucketValues.length){e=a.sortBucketValues[f+1];break}return d[a.sortKey]>=b&&(e?d[a.sortKey]<=e:!0)}return"eq"===c?d[a.sortKey]===b:void 0}},a.showDialog=function(a){c.setFocusedResult(a),f.show({controller:ResultCtrl,templateUrl:"views/result.html"})}}]),angular.module("githubSearchApp").factory("ResultData",["$http","GITHUB_CONFIG","APP_CONFIG","_",function(a,b,c,d){var e={searchQuery:"",repos:[],totalRepoCount:-1,currentPage:1,lastPage:1,isLoadingNextPage:!1,rateLimitRemaining:-1,apiError:"",focusedResult:{},sortKey:"",sortType:"",sortBucketValues:[]},f=function(){return e.isLoadingNextPage?!1:e.searchQuery?e.currentPage>e.lastPage?!1:!0:!1},g=function(a){e.sortType="",e.sortBucketValues=[],"buckets"===a.units&&(a.bucketValues?e.sortBucketValues=a.bucketValues:e.sortBucketValues=d.uniq(e.repos,function(b){return b[a.value]}).map(function(b){return b[a.value]}),e.sortType=a.type),e.sortKey=a.value},h=function(){if(f()){e.isLoadingNextPage=!0;var c=b.endpoint+"?q="+e.searchQuery+"&page="+e.currentPage;console.log("GET: "+c),a.get(c).success(function(a,c,d){200!==c?e.apiError=a[b.error_message]:(e.rateLimitRemaining=d()[b.rate_limit_header],e.repos=e.repos.concat(a[b.response_array]),e.totalRepoCount=a[b.total_count],1===e.lastPage&&(e.lastPage=Math.ceil(a[b.total_count]/e.repos.length)),e.currentPage<=e.lastPage&&e.currentPage++),e.isLoadingNextPage=!1}).error(function(a,b){a||(e.apiError="Connection Timeout: Unable to load Github API"),403===b&&(e.apiError="API limit reached"),e.isLoadingNextPage=!1})}};return{setSearchQuery:function(a){e.searchQuery=a,h()},fetchResults:h,getRepos:function(){return e.repos},getTotalRepoCount:function(){return e.totalRepoCount},isLoadingNextPage:function(){return e.isLoadingNextPage},getRateLimitRemaining:function(){return e.rateLimitRemaining},getApiError:function(){return e.apiError},reset:function(){e.searchQuery="",e.repos=[],e.totalRepoCount=-1,e.currentPage=1,e.lastPage=1,e.isLoadingNextPage=!1,e.rateLimitRemaining=-1,e.error="",e.focusedResult={},e.sortKey="",e.sortType="",e.sortBucketValues=[]},setFocusedResult:function(a){e.focusedResult=a},getFocusedResult:function(){return e.focusedResult},sortBy:g,getSortKey:function(){return e.sortKey},getSortType:function(){return e.sortType},getSortBucketValues:function(){return e.sortBucketValues.sort(),e.sortBucketValues}}}]);