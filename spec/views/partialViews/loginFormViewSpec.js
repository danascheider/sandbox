/****************************************************************************
 *                                                                         *
 * LOGIN FORM VIEW                                                         *
 *                                                                         *
 * The login form is displayed on the homepage when the user clicks the    *
 * .login-link item on the homepage top nav. It provides fields for the    *  
 * username and password, a "remember-me" checkbox, and a login help link. *
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

var SUT = require(process.cwd() + '/js/views/partialViews/loginFormView.js');

/****************************************************************************
 * BEGIN SUITE                                                              *
/****************************************************************************/

describe('Login Form View', function() {
  var view;

  /* Filters
  /**************************************************************************/

  beforeAll(function() {
    jasmine.addMatchers(matchers);
    _.extend(global, fixtures);
  })

  beforeEach(function() {
    view = new SUT();
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
  /**************************************************************************/

  describe('properties', function() {
    it('has klass LoginFormView', function() {
      expect(view.klass).toEqual('LoginFormView');
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

  describe('view elements', function() {
    beforeEach(function() {
      view.render();
    });

    it('is a form', function() {
      expect(view.$el).toHaveTag('form');
    });

    it('has ID #login-form', function() {
      expect(view.$el).toHaveId('login-form');
    });

    it('has a username field', function() {
      expect(view.$('input[name=username]')).toHaveLength(1);
    });

    it('has a password field', function() {
      expect(view.$('input[name=password]')).toHaveLength(1);
    });

    describe('remember checkbox', function() {
      it('is a checkbox', function() {
        expect(view.$('input[name=remember]')[0].type).toEqual('checkbox');
      });

      it('is checked by default', function() {
        expect(view.$('input[name=remember]')).toBeChecked();
      });
    });
  });

  /* Event Wiring
  /**************************************************************************/

  describe('view events', function() {
    //
  });

  /* Event Callbacks
  /**************************************************************************/

  describe('event callbacks', function() {
    //
  });

  /* Core View Functions
  /**************************************************************************/

  describe('core view functions', function() {
    describe('render()', function() {
      //
    });
  });

  /* Special Functions
  /**************************************************************************/

  describe('special functions', function() {
    describe('isA()', function() {
      it('returns true with argument LoginFormView', function() {
        expect(view.isA('LoginFormView')).toBe(true);
      });

      it('returns true with argument LoginForm', function() {
        expect(view.isA('LoginForm')).toBe(true);
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