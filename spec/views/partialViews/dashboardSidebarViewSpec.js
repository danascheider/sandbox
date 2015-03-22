require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var SUT = require(process.cwd() + '/js/views/partialViews/dashboardSidebarView.js');

var matchers       = require('jasmine-jquery-matchers'),
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
    context        = describe; // RSpecify

Backbone.$         = $;

describe('Dashboard Sidebar View', function() {
  beforeEach(function() {
    jasmine.addMatchers(matchers);
    var sidebar = new SUT();
  });

  describe('constructor', function() {
    it('doesn\'t call render #travis', function() {
      spyOn(SUT.prototype, 'render');
      var newSidebar = new SUT();
      expect(SUT.prototype.render).not.toHaveBeenCalled();
    });
  });
});