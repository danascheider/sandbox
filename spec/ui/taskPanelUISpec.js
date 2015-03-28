require(process.cwd() + '/js/dependencies.js');

require(process.cwd() + '/spec/support/webdriver.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var matchers = require('jasmine-jquery-matchers'),
    context  = describe,
    fcontext = fdescribe;

describe('Task Panel View Elements', function() {
  describe('hideToggleWidgetIcon', function() {
    it('hides the toggle-widget icon');
  });

  describe('hideWidget', function() {
    it('hides the panel body');
  });

  describe('showToggleWidgetIcon', function() {
    it('shows the toggle-widget icon');
  });

  describe('showWidget', function() {
    it('shows the panel body');
  });

  describe('remove', function() {
    it('hides itself');
  });
});