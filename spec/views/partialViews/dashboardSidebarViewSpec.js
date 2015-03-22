require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var SUT = require(process.cwd() + '/js/views/partialViews/dashboardSidebarView.js');

var matchers       = require('jasmine-jquery-matchers'),
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
    context        = describe; // RSpecify

Backbone.$         = $;

describe('Dashboard Sidebar View', function() {
  var sidebar, e, link;

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

  describe('elements', function() {
    beforeEach(function() {
      sidebar.render();
    });

    it('is a ul #travis', function() {
      expect(sidebar.$el[0].tagName).toEqual('UL');
    });
  })

  describe('events', function() {
    var newSidebar;

    beforeEach(function() { 
      spyOn(SUT.prototype, 'toggleSecondLevelNav');
      spyOn(SUT.prototype, 'goToDashboard');
      spyOn(SUT.prototype, 'goToTaskPage');
      newSidebar = new SUT();
      newSidebar.render();
    });

    describe('click sidebar link', function() {
      it('calls toggleSecondLevelNav #travis', function() {
        newSidebar.$('a.sidebar-link').last().click();
        expect(SUT.prototype.toggleSecondLevelNav).toHaveBeenCalled();
      });
    });

    describe('click li > .dashboard-link', function() {
      it('calls goToDashboard #travis', function() {
        newSidebar.$('li > .dashboard-link').first().click();
        expect(SUT.prototype.goToDashboard).toHaveBeenCalled();
      });
    });

    describe('click li > .task-page-link', function() {
      it('calls goToTaskPage #travis', function() {
        newSidebar.$('li > .task-page-link').first().click();
        expect(SUT.prototype.goToTaskPage).toHaveBeenCalled();
      });
    })
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
      beforeEach(function() {
        link = sidebar.$('a[href=#]').first();
        e = $.Event('click', {target: link});
      });

      context('when the menu clicked is closed', function() {
        it('adds the `active` class to its parent #travis', function() {
          sidebar.toggleSecondLevelNav(e);
          expect(link.closest('li')).toHaveClass('active');
        });

        it('removes the `active` class from any other li\'s #travis', function() {
          sidebar.$('a[href=#]').last().closest('li').addClass('active');
          sidebar.toggleSecondLevelNav(e);
          expect(sidebar.$('a[href=#]').last().closest('li')).not.toHaveClass('active');
        });
      });

      context('when the menu clicked is open', function() {
        it('removes the `active` class from all the menus #travis', function() {
          link.closest('li').addClass('active');
          sidebar.toggleSecondLevelNav(e);
          expect(sidebar.$('li.active').length).toEqual(0);
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

  describe('core view functions', function() {
    describe('render', function() {
      it('sets the HTML of its element #travis', function() {
        spyOn(sidebar.$el, 'html');
        sidebar.render();
        expect(sidebar.$el.html).toHaveBeenCalledWith(sidebar.template());
      });

      it('calls delegateEvents on itself #travis', function() {
        spyOn(sidebar, 'delegateEvents');
        sidebar.render();
        expect(sidebar.delegateEvents).toHaveBeenCalled();
      });

      it('returns itself #travis', function() {
        expect(sidebar.render()).toBe(sidebar);
      });
    });
  });
});