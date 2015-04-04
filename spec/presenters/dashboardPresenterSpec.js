/* Core Requires
/*****************************************************************************************/

require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/spec/support/env.js');

/* Module-Specific Requires
/*****************************************************************************************/

var DashboardPresenter = require(process.cwd() + '/js/presenters/dashboardPresenter.js');

/* Configuration
/*****************************************************************************************/

var matchers = require('jasmine-jquery-matchers'),
    fixtures = require(process.cwd() + '/spec/support/fixtures/fixtures.js'),
    context  = describe,
    fcontext = fdescribe;

/*****************************************************************************************
/* BEGIN SUITE                                                                           *
/*****************************************************************************************/

describe('Dashboard Presenter #travis', function() {
  var presenter, spy;

  /* Filters
  /***************************************************************************************/

  beforeAll(function() {
    jasmine.addMatchers(matchers);
    _.extend(global, fixtures);
  });

  beforeEach(function() {
    presenter = new DashboardPresenter({user: user});
  });

  afterEach(function() {
    restoreFixtures();
  });

  afterAll(function() {
    global = _.omit(global, fixtures);
    presenter.destroy();
    presenter = null;
  });

  /* Canto Model Properties
  /***************************************************************************************/

  describe('Canto model properties', function() {
    it('has klass DashboardPresenter', function() {
      expect(presenter.klass).toBe('DashboardPresenter');
    });

    it('has family Canto.Model', function() {
      expect(presenter.family).toBe('Canto.Model');
    });

    it('has superFamily Backbone.Model', function() {
      expect(presenter.superFamily).toBe('Backbone.Model');
    });
  });

  /* Presenter Constructor
  /***************************************************************************************/

  describe('constructor', function() {
    beforeEach(function() {
      spyOn($, 'ajax').and.callFake(function(args) {
        args.success(user.toJSON());
      });
    });

    it('can be instantiated without a user', function() {
      var newPresenter = new DashboardPresenter();
      expect(newPresenter.user).not.toExist();
    });

    it('creates a dashboard view', function() {
      expect(presenter.dashboardView).toExist();
    });

    it('calls setUser', function() {
      pending('Need to implement the setUser method');
      spyOn(DashboardPresenter.prototype, 'setUser');
      var newPresenter = new DashboardPresenter({user: user});
      expect(DashboardPresenter.prototype.setUser).toHaveBeenCalledWith(user);
    });
  });

  /* Event Callbacks
  /***************************************************************************************/

  describe('event callbacks', function() {
    describe('redirect()', function() {
      beforeEach(function() {
        spy = jasmine.createSpy();
        presenter.on('redirect', spy);
      });

      afterEach(function() { presenter.off('redirect'); });

      it('emits the redirect:dashboard event', function() {
        presenter.redirect({destination: 'dashboard'});
        expect(spy).toHaveBeenCalledWith({destination: 'dashboard'});
      });

      it('emits the redirect:tasks event', function() {
        presenter.redirect({destination: 'tasks'});
        expect(spy).toHaveBeenCalledWith({destination: 'tasks'});
      });
    });
  });

  /* Special Functions
  /***************************************************************************************/

  describe('special functions', function() {
    describe('isA', function() {
      it('returns true with argument `Presenter`', function() {
        expect(presenter.isA('Presenter')).toBe(true);
      });

      it('returns true with argument \'DashboardPresenter\'', function() {
        expect(presenter.isA('DashboardPresenter')).toBe(true);
      });

      it('returns false with another argument', function() {
        expect(presenter.isA('Backbone.Router')).toBe(false);
      });
    });
  });
});