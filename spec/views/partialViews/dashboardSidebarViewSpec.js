require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var SUT = require(process.cwd() + '/js/views/partialViews/dashboardSidebarView.js');

var matchers       = require('jasmine-jquery-matchers'),
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
    context        = describe; // RSpecify

Backbone.$         = $;

describe('Dashboard Sidebar View', function() {
  var sidebar, e;

  beforeEach(function() {
    jasmine.addMatchers(matchers);
    sidebar = new SUT();
  });

  afterAll(function() {
    sidebar.remove();
    sidebar = null;
  });

  describe('constructor', function() {
    it('doesn\'t call render #travis', function() {
      spyOn(SUT.prototype, 'render');
      var newSidebar = new SUT();
      expect(SUT.prototype.render).not.toHaveBeenCalled();
    });
  });

  describe('event callbacks', function() {
    beforeEach(function() { sidebar.render(); });

    describe('goToDashboard', function() {
      it('triggers the redirect:dashboard event on the view #travis', function() {
        var spy = jasmine.createSpy();
        sidebar.on('redirect', spy);
        sidebar.goToDashboard();
        expect(spy).toHaveBeenCalledWith({destination: 'dashboard'});
        sidebar.off('redirect');
      });
    });

    describe('goToTaskPage', function() {
      it('triggers the redirect:tasks event on the view #travis', function() {
        var spy = jasmine.createSpy();
        sidebar.on('redirect', spy);
        sidebar.goToTaskPage();
        expect(spy).toHaveBeenCalledWith({destination: 'tasks'});
        sidebar.off('redirect');
      });
    });

    describe('toggleSecondLevelNav', function() {
      context('when the menu clicked is closed', function() {
        it('adds the `active` class to its parent #travis', function() {
          var link = sidebar.$('a[href=#]').first();
          e = $.Event('click', {target: link});
          sidebar.toggleSecondLevelNav(e);
          expect(link.closest('li')).toHaveClass('active');
        });
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