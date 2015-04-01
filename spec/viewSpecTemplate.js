/****************************************************************************
 *                                                                         *
 * META-INFORMATION AND THE TABLE OF CONTENTS                              *
 *                                                                         *
 * This is a place to share meta-information about the system under test.  *
 * It explains briefly what the purpose of that element of the app is      *  
 * and any other relevant information.                                     *
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

require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/spec/support/env.js');

var matchers       = _.extend(require('jasmine-jquery-matchers'), require(process.cwd() + '/spec/support/matchers/toBeA.js')),
    fixtures       = require(process.cwd() + '/spec/support/fixtures/fixtures.js'),
    context        = describe,
    fcontext       = fdescribe;

var SUT = require(process.cwd() + '/js/views/appViews/dashboardView.js');

/****************************************************************************
 * BEGIN SUITE                                                              *
/****************************************************************************/

describe(/* ACTUAL VALUE */, function() {
  var view;

  beforeEach(function() {

    // Create an instance of the view under test
    // Insert args here

    view = new SUT();
    _.extend(global, fixtures);
  });

  afterAll(function() {
    view.remove();
    view = null;
    global = global.omit(fixtures);
  });

  /* Static Properties
  /**************************************************************************/

  describe('properties', function() {
    it('has klass /* EXPECTED VALUE */', function() {
      expect(view.klass).toEqual(/* Expected Value */);
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
      var newView = new SUT();
      expect(SUT.prototype.render).not.toHaveBeenCalled();
    });
  });

  /* Elements
  /**************************************************************************/

  /* Event Wiring
  /**************************************************************************/

  /* Event Callbacks
  /**************************************************************************/

  /* Core View Functions
  /**************************************************************************/

  /* Special Functions
  /**************************************************************************/

  describe('special functions', function() {
    describe('isA', function() {
      it('returns true with argument /* ACTUAL VALUE HERE */', function() {
        expect(view.isA(/* ACTUAL VALUE */)).toBe(true);
      });

      it('returns true with argument /* ACTUAL VALUE HERE */', function() {
        expect(view.isA(/* ACTUAL VALUE */)).toBe(true);
      });

      it('returns false with another argument', function() {
        expect(view.isA('Corvette')).toBe(false);
      });
    });
  });
});