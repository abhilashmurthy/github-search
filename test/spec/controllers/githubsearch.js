  

describe('Controller: GithubSearchCtrl', function () {

  // load the controller's module
  beforeEach(module('githubSearchApp'));

  var GithubsearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GithubSearchCtrl = $controller('GithubSearchCtrl', {
      $scope: scope
    });
  }));

  it('should open the app with the welcome screen', function () {
    expect(scope.isWelcomeScreen).toBeTruthy();
    expect(scope.isEnteringText).toBeFalsy();
    expect(scope.hasResults).toBeFalsy();
    expect(scope.isLoadingNextPage).toBeFalsy();
    expect(scope.hasApiError).toBeFalsy();
  });

});
