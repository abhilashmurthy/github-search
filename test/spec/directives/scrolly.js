'use strict';

describe('Directive: scrolly', function () {

  // load the directive's module
  beforeEach(module('githubSearchApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<scrolly></scrolly>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scrolly directive');
  }));
});