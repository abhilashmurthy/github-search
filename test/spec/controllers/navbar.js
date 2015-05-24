'use strict';

describe('Controller: NavbarCtrl', function () {

  // load the controller's module
  beforeEach(module('githubSearchApp'));

  var NavbarCtrl,
    scope,
    APP_CONFIG,
    _;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _APP_CONFIG_, ___) {
    scope = $rootScope.$new();
    NavbarCtrl = $controller('NavbarCtrl', {
      $scope: scope
    });
    APP_CONFIG = _APP_CONFIG_;
    _ = ___;
  }));

  it('should init the navbar with no search data', function () {
    expect(scope.searchText).toBe(null);
    expect(scope.searchCategories.length).toBe(0);
  });

  it('should init the app with the APP_CONFIG defaults', function () {
    expect(scope.categories).toEqual(APP_CONFIG.categories);
  });

});
