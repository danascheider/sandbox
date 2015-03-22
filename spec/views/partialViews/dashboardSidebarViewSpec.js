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
    sidebar = new SUT();
  });

  describe('constructor', function() {
    it('doesn\'t call render #travis', function() {
      spyOn(SUT.prototype, 'render');
      var newSidebar = new SUT();
      expect(SUT.prototype.render).not.toHaveBeenCalled();
    });
  });

  describe('event callbacks', function() {
    describe('goToDashboard', function() {
      beforeEach(function() {
        sidebar.render();
      });

      it('triggers the redirect:dashboard event on the view #travis', function() {
        var spy = jasmine.createSpy();
        sidebar.on('redirect:dashboard', spy);
        sidebar.goToDashboard();
        expect(spy).toHaveBeenCalled();
        sidebar.off('redirect:dashboard');
      });
    });
  });

  describe('special functions', function() {
    describe('isA', function() {
      it('returns true with argument DashboardSidebarView #travis', function() {
        expect(sidebar.isA('DashboardSidebarView')).toBe(true);
      });

      it('returns true with argument Backbone.View #travis', function() {
        expect(sidebar.isA('Backbone.View')).toBe(true);
      });

      it('returns true with argument DashboardView #travis', function() {
        expect(sidebar.isA('DashboardView')).toBe(true);
      });

      it('returns true with argument PartialView #travis', function() {
        expect(sidebar.isA('PartialView')).toBe(true);
      });

      it('returns false with other argument #travis', function() {
        expect(sidebar.isA('Backbone.Router')).toBe(false);
      });
    });
  });
});