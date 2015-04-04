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
  var presenter;

  /* Filters
  /***************************************************************************************/

  beforeAll(function() {
    jasmine.addMatchers(matchers);
    _.extend(global, fixtures);
  });

  beforeEach(function() {
    presenter = new DashboardPresenter();
  });

  afterEach(function() {
    restoreFixtures();
  });

  afterAll(function() {
    global = _.omit(global, fixtures);
    presenter.destroy();
    presenter = null;
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
});