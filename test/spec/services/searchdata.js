'use strict';

describe('Service: SearchData', function () {

  // load the service's module
  beforeEach(module('githubSearchApp'));

  // instantiate service
  var SearchData;
  beforeEach(inject(function (_SearchData_) {
    SearchData = _SearchData_;
  }));

  it('should do something', function () {
    expect(!!SearchData).toBe(true);
  });

});
