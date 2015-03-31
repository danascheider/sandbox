/***************************************************************************
 *                                                                         *
 * TOP-LEVEL DASHBOARD VIEW                                                *
 *                                                                         *
 * The dashboard is the user's main view from which they manage            *
 * everything. The dashboard displays summary information about their      *
 * affairs and links to all their other pages.                             *
 *                                                                         *
 * CONTENTS                                                          LINE  *
 * Requires ......................................................... 33   *
 * Suite ............................................................ 47   *
 *   Filters ........................................................ 52   *
 *   Constructor .................................................... 59   *
 *     calls setUser()                                                     *
 *     instantiates a sidebar                                              *
 *     instantiates a home view                                            *
 *     instantiates a task view                                            *
 *     doesn't call render                                                 *
 *     can be instantiated without a user                                  *
 *   Properties ..................................................... --   *
 *     klass ........................................................ --   *
 *     family ....................................................... --   *
 *     superFamily .................................................. --   *
 *     types ........................................................ --   *
 *   View Elements................................................... --   *
 *     has ID #dashboard-wrapper .................................... --   *
 *     Sidebar ...................................................... --   *
 *   View Events .................................................... --   *
 *     click $el .................................................... --   *
 *     click li.dropdown ............................................ --   *
 *   Event Callbacks ................................................ --   *
 *     hideDropdownMenus() .......................................... --   *
 *       when no menus are open .................................... ---   *
 *       when a menu is visible .................................... ---   *
 *       when the clicked-on object is inside the menu ............. ---   *
 *     toggleDropdownMenu() ........................................ ---   *
 *       when none of the menus is open ............................ ---   *
 *         adds the .open class to the target menu ................. ---   *
 *         doesn't add the .open class to the other menus .......... ---   *
 *       when another menu is open ................................. ---   *
 *         removes the .open class from the open menu .............. ---   *
 *         adds the .open class to the target menu ................. ---   *
 *       when the target menu is open .............................. ---   *
 *         removes the .open class from the target menu ............ ---   *
 *         doesn't open any other menus ............................ ---   *
 *     showHomeView() .............................................. ---   *
 *       when the main dash and home view are visible .............. ---   *
 *         doesn't re-render the main dash ......................... ---   *
 *         renders the home view ................................... ---   *
 *         attaches the home view to the DOM ....................... ---   *
 *       when the main dash and task view are visible .............. ---   *
 *       when the main dash isn't visible .......................... ---   *
 *   Special Functions .............................................. 69   *
 *     setUser() .................................................... 69   *
 *   Core Functions ................................................. 97   *
 *     initialize() ................................................. 97   *
 *     remove() .................................................... 105   *
 *     render() .................................................... 111   *
 *                                                                         *
/***************************************************************************/

/* Requires
/****************************************************************************/

require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var SUT = require(process.cwd() + '/js/views/appViews/dashboardView.js');

var matchers       = require('jasmine-jquery-matchers'),
    fixtures       = require(process.cwd() + '/spec/support/fixtures/fixtures.js'),
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
    UserModel      = require(process.cwd() + '/js/models/userModel.js'),
    TaskModel      = require(process.cwd() + '/js/models/taskModel.js'),
    TaskCollection = require(process.cwd() + '/js/collections/taskCollection.js'),
    context        = describe,
    fcontext       = fdescribe;

/****************************************************************************
 * BEGIN SUITE                                                              *
/****************************************************************************/

describe('Main Dashboard View #travis', function() {
  var dashboard, e, spy;

  /* Filters                 
  /**************************************************************************/
  beforeAll(function() {
    jasmine.addMatchers(matchers);
    _.extend(global, fixtures);
  });

  beforeEach(function() {
    dashboard = new SUT({user: user});
  });

  afterAll(function() {
    dashboard.remove();
    dashboard = null;
    global = _.omit(global, fixtures);
  });

  /* Constructor             
  /**************************************************************************/

  describe('constructor', function() {
    it('calls setUser', function() {
      spyOn(SUT.prototype, 'setUser');
      var newView = new SUT({user: user});
      expect(SUT.prototype.setUser).toHaveBeenCalled();
      expect(SUT.prototype.setUser.calls.argsFor(0)[0]).toEqual(user);
    });

    it('instantiates a sidebar', function() {
      expect(dashboard.sidebarView).toBeA('DashboardSidebarView');
    });

    it('instantiates a home view', function() {
      expect(dashboard.homeView.klass).toEqual('DashboardHomeView');
    });

    it('instantiates a task view', function() {
      pending('Need to implement the dashboard task view');
    });

    it('doesn\'t call render', function() {
      spyOn(SUT.prototype, 'render');
      var newView = new SUT({user: user});
      expect(SUT.prototype.render).not.toHaveBeenCalled();
    });

    it('can be instantiated without a user', function() {
      var newView = new SUT();
      expect(newView.user).not.toExist();
    });
  });

  /* Static Properties
  /****************************************************************************/

  describe('properties', function() {
    it('has klass DashboardView', function() {
      expect(dashboard.klass).toEqual('DashboardView');
    });

    it('has family Canto.View', function() {
      expect(dashboard.family).toEqual('Canto.View');
    });

    it('has superFamily Backbone.View', function() {
      expect(dashboard.superFamily).toEqual('Backbone.View');
    });

    describe('types', function() {
      _.each(['DashboardView', 'Dashboard', 'MainDashboardView', 'MainDashboard', 'TopLevelView'], function(type) {
        it('includes ' + type, function() {
          expect(dashboard.types()).toContain(type);
        });
      });
    });
  });

  /* View Elements
  /****************************************************************************/

  describe('elements', function() {
    beforeEach(function() {
      dashboard.render();
      $('body').html(dashboard.el);
    });

    it('has ID #dashboard-wrapper', function() {
      expect(dashboard.$el).toHaveId('dashboard-wrapper');
    });

    describe('sidebar', function() {
      it('is attached to div.sidebar-collapse element', function() {
        expect(dashboard.$('div.sidebar-collapse')).toHaveDescendant('#side-menu');
      });
    });
  });

  /* View Events
  /****************************************************************************/

  describe('events', function() {
    var newDashboard;

    beforeEach(function() {
      spyOn(SUT.prototype, 'hideDropdownMenus');
      spyOn(SUT.prototype, 'toggleDropdownMenu');
      newDashboard = new SUT({user: user});
      newDashboard.render();
    });

    describe('click $el', function() {
      it('calls hideDropdownMenus', function() {
        newDashboard.$el.click();
        expect(SUT.prototype.hideDropdownMenus).toHaveBeenCalled();
      });
    });

    describe('click li.dropdown', function() {
      it('calls toggleDropdownMenu', function() {
        newDashboard.$('li.dropdown').first().click();
        expect(SUT.prototype.toggleDropdownMenu).toHaveBeenCalled();
      });
    });
  });

  /* Event Callbacks
  /****************************************************************************/

  describe('event callbacks', function() {
    beforeEach(function() { dashboard.render(); });
    afterEach(function() { dashboard.remove(); });

    describe('hideDropdownMenus', function() {
      context('when none of the menus is open', function() {
        it('doesn\'t open the menus', function() {
          dashboard.$('li.dropdown').removeClass('open');
          e = $.Event('click', {target: dashboard.$el});
          dashboard.hideDropdownMenus(e);
          expect(dashboard.$('li.dropdown.open')).toHaveLength(0);
        });
      });

      context('when a menu is open', function() {
        it('removes the .open class', function() {
          dashboard.$('li.dropdown').first().addClass('open');
          e = $.Event('click', {target: dashboard.$el});
          dashboard.hideDropdownMenus(e);
          expect(dashboard.$('li.dropdown').first()).not.toHaveClass('open');
        });
      });

      context('when the clicked-on object is inside the menu', function() {
        it('doesn\'t hide the menu', function() {
          dashboard.$('li.dropdown').first().addClass('open');
          e = $.Event('click', {target: dashboard.$('li.dropdown').first().find('ul.dropdown-menu')});
          dashboard.hideDropdownMenus(e);
          expect(dashboard.$('li.dropdown').first()).toHaveClass('open');
        });
      });
    });

    describe('toggleDropdownMenu', function() {
      context('when none of the menus is open', function() {
        beforeEach(function() {
          e = $.Event('click', {target: dashboard.$('a.dropdown-toggle').first()});
          dashboard.toggleDropdownMenu(e);
        });

        it('adds the .open class to the target menu', function() {
          expect(dashboard.$('li.dropdown').first()).toHaveClass('open');
        });

        it('doesn\'t add the .open class to the other menus', function() {
          expect(dashboard.$('li.dropdown').last()).not.toHaveClass('open');
        });
      });

      context('when another menu is open', function() {
        beforeEach(function() {
          dashboard.$('li.dropdown').last().addClass('open');
          e.target = dashboard.$('a.dropdown-toggle').first();
          dashboard.toggleDropdownMenu(e);
        });

        it('removes the .open class from the open menu', function() {
          expect(dashboard.$('li.dropdown').last()).not.toHaveClass('open');
        });

        it('adds the .open class to the target menu', function() {
          expect(dashboard.$('li.dropdown').first()).toHaveClass('open');
        });
      });

      context('when the target menu is open', function() {
        beforeEach(function() {
          dashboard.$('li.dropdown').first().addClass('open');
          e.target = dashboard.$('a.dropdown-toggle').first();
          dashboard.toggleDropdownMenu(e);
        });

        it('removes the .open class from the target menu', function() {
          expect(dashboard.$('li.dropdown').first()).not.toHaveClass('open');
        });

        it('doesn\'t open any other menus', function() {
          expect('li.dropdown.open').not.toExist();
        });
      });
    });

    describe('showHomeView', function() {
      context('when the main dash and home view are visible', function() {
        beforeEach(function() {
          spyOn(dashboard.$el, 'is').and.callFake(function() { return true; });
          // spyOn(dashboard.homeView.$el, 'is').and.callFake(function() { return true; });
        });

        it('doesn\'t re-render the main dash', function() {
          spyOn(dashboard, 'render');
          dashboard.showHomeView();
          expect(dashboard.render).not.toHaveBeenCalled();
        });

        it('renders the home view', function() {
          pending('Need to implement the dashboard home view');
        });

        it('attaches the home view to the DOM', function() {
          pending('Need to implement the dashboard home view');
        });
      });

      context('when the main dash and task view are visible', function() {
        beforeEach(function() {
          spyOn(dashboard.$el, 'is').and.callFake(function() { return true; });
          // spyOn(dashboard.taskView.$el, 'is').and.callFake(function() { return true; });
        });

        it('doesn\'t re-render the main dash', function() {
          spyOn(dashboard, 'render');
          dashboard.showHomeView();
          expect(dashboard.render).not.toHaveBeenCalled();
        });

        it('removes the task view', function() {
          pending('Need to implement the dashboard task view');
        });

        it('renders the home view', function() {
          pending('Need to implement the dashboard home view');
        });

        it('attaches the home view to the DOM', function() {
          pending('Need to implement the dashboard home view');
        });
      });

      context('when the main dash isn\'t visible', function() {
        beforeEach(function() {
          spyOn(dashboard.$el, 'is').and.callFake(function() { return false; });
        });

        it('renders the main dash', function() {
          spyOn(dashboard, 'render');
          dashboard.showHomeView();
          expect(dashboard.render).toHaveBeenCalled();
        });

        it('renders the home view', function() {
          pending('Need to implement the dashboard home view');
        });

        it('attaches the home view to the DOM', function() {
          pending('Need to implement the dashboard home view');
        });
      });
    });

    describe('showTaskView', function() {
      context('when the main dash and home view are visible', function() {
        beforeEach(function() {
          spyOn(dashboard.$el, 'is').and.callFake(function() { return true; });
          // spyOn(dashboard.homeView.$el, 'is').and.callFake(function() { return true; });
          // spyOn(dashboard.taskView.$el, 'is').and.callFake(function() { return false; });
        });

        it('doesn\'t re-render the main dash', function() {
          spyOn(dashboard, 'render');
          dashboard.showTaskView();
          expect(dashboard.render).not.toHaveBeenCalled();
        });

        it('removes the home view', function() {
          pending('Need to implement the dashboard home view');
        });

        it('renders the task view', function() {
          pending('Need to implement the dashboard task view');
        });

        it('attaches the task view to the DOM', function() {
          pending('Need to implement the dashboard task view');
        });
      });

      context('when the main dash and task view are visible', function() {
        beforeEach(function() {
          spyOn(dashboard.$el, 'is').and.callFake(function() { return true; });
          // spyOn(dashboard.taskView.$el, 'is').and.callFake(function() { return true; });
        });

        it('doesn\'t re-render the main dash', function() {
          spyOn(dashboard, 'render');
          dashboard.showTaskView();
          expect(dashboard.render).not.toHaveBeenCalled();
        });

        it('renders the task view', function() {
          pending('Need to implement the dashboard task view');
        });

        it('attaches the task view to the DOM', function() {
          pending('Need to implement the dashboard task view');
        });
      });

      context('when the main dash isn\'t visible', function() {
        beforeEach(function() {
          spyOn(dashboard.$el, 'is').and.callFake(function() { return false; });
        });

        it('renders the main dash', function() {
          spyOn(dashboard, 'render');
          dashboard.showTaskView();
          expect(dashboard.render).toHaveBeenCalled();
        });

        it('renders the task view', function() {
          pending('Need to implement the dashboard task view');
        });

        it('attaches the task view to the DOM', function() {
          pending('Need to implement the dashboard task view');
        });
      });
    });
  });

  describe('special functions', function() {
    describe('isA', function() {
      it('returns true with the argument DashboardView', function() {
        expect(dashboard.isA('DashboardView')).toBe(true);
      });

      it('returns true with the argument TopLevelView', function() {
        expect(dashboard.isA('TopLevelView')).toBe(true);
      });

      it('returns false with another argument', function() {
        expect(dashboard.isA('duck')).toBe(false);
      });
    });

    describe('setUser', function() {
      it('sets this.user', function() {
        var newView = new SUT(); // we already know this won't set the user
        newView.setUser(user);
        expect(newView.user).toBe(user);
      });

      it('calls setUser on the home view', function() {
        pending('Need to implement the dashboard home view');
      });

      it('calls setUser on the task view', function() {
        pending('Need to implement the dashboard task view');
      });
    });
  });

  describe('core functions', function() {
    describe('render', function() {
      it('renders the sidebar view', function() {
        spyOn(dashboard.sidebarView, 'render');
        dashboard.render();
        expect(dashboard.sidebarView.render).toHaveBeenCalled();
      });

      it('inserts the sidebar view into its .sidebar-collapse div', function() {
        dashboard.render();
        $('body').html(dashboard.$el);
        expect(dashboard.sidebarView.el).toBeInDom();
      });
    });

    describe('remove', function() {
      it('removes the home view', function() {
        pending('Need to implement the dashboard home view');
      });

      it('removes the task view', function() {
        pending('Need to implement the dashboard task view');
      });

      it('removes the sidebar view', function() {
        spyOn(dashboard.sidebarView, 'remove');
        dashboard.remove();
        expect(dashboard.sidebarView.remove).toHaveBeenCalled();
      });

      it('removes itself through the Backbone.View prototype', function() {
        spyOn(Backbone.View.prototype.remove, 'call');
        dashboard.remove();
        expect(Backbone.View.prototype.remove.call.calls.argsFor(0)[0]).toBe(dashboard);
      });
    });
  });
});