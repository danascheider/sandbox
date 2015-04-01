/***************************************************************************
 *                                                                         *
 * DASHBOARD TASK VIEW                                                     *
 *                                                                         *
 * The dashboard task view is the page that shows detailed information     *
 * about the user's tasks. Currently, it takes the form of a Kanban        *
 * board, but I'm considering other possibilities as well.                 *
 *                                                                         *
 * CONTENTS                                                          LINE  *
 * Requires ......................................................... 97   *
 * Suite ........................................................... 116   *
 *   Filters ....................................................... 122   *
 *   Properties ..................................................... --   *
 *     klass ........................................................ --   *
 *     family ....................................................... --   *
 *     superFamily .................................................. --   *
 *   Constructor ................................................... 144   *
 *     doesn't call render ......................................... 164   *
 *     calls setUser() ............................................. 145   *
 *     can be instantiated without a user .......................... 170   *
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
 *         doesn't re-render the main dash ......................... ---   *
 *         removes the task view ................................... ---   *
 *         renders the home view ................................... ---   *
 *         attaches the home view to the DOM ....................... ---   *
 *       when the main dash isn't visible .......................... ---   *
 *         renders the main dash view .............................. ---   *
 *         renders the home view ................................... ---   *
 *         attaches the home view to the DOM ....................... ---   *
 *     showTaskView() .............................................. ---   *
 *       when the main dash and home view are visible .............. ---   *
 *         doesn't re-render the main dash ......................... ---   *
 *         removes the home view ................................... ---   *
 *         renders the task view ................................... ---   *
 *         attaches the task view to the DOM ....................... ---   *
 *       when the main dash and task view are visible .............. ---   *
 *         doesn't re-render the main dash ......................... ---   *
 *         renders the task view ................................... ---   *
 *         attaches the task view to the DOM ....................... ---   *
 *       when the main dash isn't visible .......................... ---   *
 *         doesn't re-render the main dash ......................... ---   *
 *         renders the task view ................................... ---   *
 *         attaches the task view to the DOM ....................... ---   *
 *   Core View Functions ............................................ 97   *
 *     remove() .................................................... 105   *
 *       removes its child views ................................... ---   *
 *       removes itself using the Backbone.View.prototype .......... ---   *
 *     render() ..................................................... 97   *
 *       fetches the task collection ............................... ---   *
 *       creates child views ....................................... ---   *
 *   Special Functions .............................................. 69   *
 *     isA() ....................................................... ---   *
 *       returns true with argument DashboardTaskView .............. ---   *
 *       returns false with another argument ....................... ---   *
 *     setUser() .................................................... 69   *
 *       sets this.user ............................................ ---   *
 *       calls setUser on the home view ............................ ---   *
 *       calls setUser on the task view ............................ ---   *
 *                                                                         *
/***************************************************************************/

/* Core Requires
/***************************************************************************/

require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/spec/support/env.js');

var matchers       = _.extend(require('jasmine-jquery-matchers'), require(process.cwd() + '/spec/support/matchers/toBeA.js')),
    fixtures       = require(process.cwd() + '/spec/support/fixtures/fixtures.js'),
    context        = describe,
    fcontext       = fdescribe;

var SUT = require(process.cwd() + '/js/views/partialViews/dashboardTaskView.js');

/****************************************************************************
 * BEGIN SUITE                                                              *
/****************************************************************************/

describe('Dashboard Task View #travis', function() {
  var view, e, spy;

  /* Filters
  /**************************************************************************/

  beforeAll(function() {
    jasmine.addMatchers(matchers);
    _.extend(global, fixtures);
  });

  beforeEach(function() {
    view = new SUT({user: user});
  });

  afterEach(function() {
    fixtures.restoreFixtures();
  });

  afterAll(function() {
    view.remove();
    dashboard = null;
    global = _.omit(global, fixtures);
  });

  /* Static Properties
  /**************************************************************************/

  describe('properties', function() {
    it('has klass DashboardTaskView', function() {
      expect(view.klass).toEqual('DashboardTaskView');
    });

    it('has family Canto.View', function() {
      expect(view.family).toEqual('Canto.View');
    });

    it('has superFamily Backbone.View', function() {
      expect(view.superFamily).toEqual('Backbone.View');
    });
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

  /* View Elements
  /**************************************************************************/

  /* View Events
  /**************************************************************************/

  /* Event Callbacks
  /**************************************************************************/

  /* Core View Functions
  /**************************************************************************/

  describe('remove', function() {
    _.each(['newColumn', 'inProgressColumn', 'blockingColumn', 'backlogColumn'], function(column) {
      it('removes its ' + column, function() {
        pending('Need to implement the Kanban column view');
        spyOn(view[column], 'remove');
        view.remove();
        expect(view[column].remove).toHaveBeenCalled();
      });
    });

    it('removes itself using the Backbone.View.prototype', function() {
      spyOn(Backbone.View.prototype.remove, 'call');
      view.remove();
      expect(Backbone.View.prototype.remove.call).toHaveBeenCalledWith(view);
    });
  });

  describe('render', function() {
    it('fetches the task collection', function() {
      spyOn(user.tasks, 'fetch');
      view.render();
      expect(user.tasks.fetch).toHaveBeenCalled();
    });

    _.each(['newColumn', 'inProgressColumn', 'blockingColumn', 'backlogColumn'], function(column) {
      it('creates the ' + column, function() {
        pending('Need to implement the Kanban column view');
        view.render();
        expect(view[column]).toExist();
      });
    });
  });

  /* Special Functions
  /**************************************************************************/

  describe('special functions', function() {
    describe('isA', function() {
      it('returns true with argument DashboardTaskView', function() {
        expect(view.isA('DashboardTaskView')).toBe(true);
      });

      it('returns false with another argument', function() {
        expect(view.isA('Corvette')).toBe(false);
      });
    });
  });
});