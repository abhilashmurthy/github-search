'use strict';

describe('Service: GITHUB_CONFIG', function () {

  // load the service's module
  beforeEach(module('githubSearchApp'));

  // instantiate service
  var GITHUB_CONFIG;
  beforeEach(inject(function (_GITHUB_CONFIG_) {
    GITHUB_CONFIG = _GITHUB_CONFIG_;
  }));

  it('should do something', function () {
    expect(!!GITHUB_CONFIG).toBe(true);
  });

});
