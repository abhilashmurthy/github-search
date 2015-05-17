'use strict';

describe('Service: ResultData', function () {

  // load the service's module
  beforeEach(module('githubSearchApp'));

  // instantiate service
  var ResultData;
  beforeEach(inject(function (_ResultData_) {
    ResultData = _ResultData_;
  }));

  it('should do something', function () {
    expect(!!ResultData).toBe(true);
  });

});
