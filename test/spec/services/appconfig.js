

describe('Service: APPCONFIG', function () {

  // load the service's module
  beforeEach(module('githubSearchApp'));

  // instantiate service
  var APPCONFIG, _;
  beforeEach(inject(function (_APP_CONFIG_, ___) {
    APP_CONFIG = _APP_CONFIG_;
    _ = ___;
  }));

  it('should init the categories with the correct values and select them by default', function () {
    expect(_.pluck(APP_CONFIG.categories, 'name')).toEqual(['name', 'description', 'readme']);
    expect(_.pluck(APP_CONFIG.categories, 'selected')).toEqual([true, true, true]);
  });

  it('should enable a default debouce for changes in models', function () {
    expect(APP_CONFIG.debounce).toBe(500);
  });

});
