/****************************************************************************
 *                                                                         *
 * DASHBOARD HOME VIEW                                                     *
 *                                                                         *
 * The DashboardHomeView is the view the user sees when they first log     *
 * into their dashboard. It contains summary information about all their   *
 * activities and obligations.                                             *
 *                                                                         *
 * CONTENTS                                                          LINE  *
 * Requires ......................................................... 26   *
 * Suite ............................................................ 44   *
 *   Filters ........................................................ 50   *
 *   Authorization and Authentication ............................... 60   *
 *     token()                                                             *
 *   Core Functions ................................................. 69   *
 *     fetch()                                                             *
 *   Special Functions .............................................. 91   *
 *     updateAll() .................................................. 92   *
 *     isA() ....................................................... 140   *
 *                                                                         *
/****************************************************************************/

/* Core Requires
/****************************************************************************/

require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var fixtures       = require(process.cwd() + '/spec/support/fixtures/fixtures.js'),
    matchers       = _.extend(require(process.cwd() + '/spec/support/matchers/toBeA.js'), require('jasmine-jquery-matchers')),
    context        = describe,
    fcontext       = fdescribe;

var SUT = require(process.cwd() + '/js/views/partialViews/dashboardHomeView.js');

/******************************************************************************
 *                                                                            *
 * BEGIN SUITE                                                                *
 *                                                                            *  
/******************************************************************************/

fdescribe('Dashboard Home View #travis', function() {
  var view;

  /* Filters
  /****************************************************************************/

  beforeAll(function() {
    _.extend(global, fixtures);
  });

  beforeEach(function() {
    view = new SUT({user: user});
  });

  afterEach(function() {
    restoreFixtures();
  });

  afterAll(function() {
    view.remove();
    view = null;
    global = _.omit(global, fixtures);
  });

  /* Static Properties
  /****************************************************************************/

  describe('properties', function() {
    it('has klass DashboardHomeView', function() {
      expect(view.klass).toEqual('DashboardHomeView');
    });

    it('has family Canto.View', function() {
      expect(view.family).toEqual('Canto.View');
    });

    it('has superFamily Backbone.View', function() {
      expect(view.superFamily).toEqual('Backbone.View');
    });
  });

  /* View Constructor
  /**************************************************************************/

  describe('constructor', function() {
    it('does not call render', function() {
      spyOn(SUT.prototype, 'render');
      var newView = new SUT({user: user});
      expect(SUT.prototype.render).not.toHaveBeenCalled();
    });

    it('calls setUser', function() {
      spyOn(SUT.prototype, 'setUser');
      var newView = new SUT({user: user});
      expect(SUT.prototype.setUser).toHaveBeenCalled();
    });
  });

  /* Event Wiring
  /**************************************************************************/

  /* Event Callbacks
  /**************************************************************************/


  /* Special Functions
  /**************************************************************************/

  describe('special functions', function() {
    describe('isA', function() {
      it('returns true with argument DashboardHomeView', function() {
        expect(view.isA('DashboardHomeView')).toBe(true);
      });

      it('returns true with argument PartialView', function() {
        expect(view.isA('PartialView')).toBe(true);
      });

      it('returns false with another argument', function() {
        expect(view.isA('Corvette')).toBe(false);
      });
    });
  });
});