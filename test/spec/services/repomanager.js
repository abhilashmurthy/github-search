'use strict';

describe('Service: RepoManager', function () {

  // load the service's module
  beforeEach(module('githubSearchApp'));

  // instantiate service
  var RepoManager;
  beforeEach(inject(function (_RepoManager_) {
    RepoManager = _RepoManager_;
  }));

  it('should do something', function () {
    expect(!!RepoManager).toBe(true);
  });

});
