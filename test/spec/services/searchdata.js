'use strict';

describe('Service: SearchData', function () {

  // load the service's module
  beforeEach(module('githubSearchApp'));

  // instantiate service
  var SearchData;
  var resetInputs = {
    searchText: '',
    searchCategories: [],
    isEnteringText: false
  };
  beforeEach(inject(function (_SearchData_) {
    SearchData = _SearchData_;
  }));

});
