/***************************************************************************
 *                                                                         *
 * DASHBOARD HOME VIEW                                                     *
 *                                                                         *
 * The DashboardHomeView is the view the user sees when they first log     *
 * into their dashboard. It contains summary information about all their   *
 * activities and obligations.                                             *
 *                                                                         *
 * CONTENTS                                                          LINE  *
 * Requires ......................................................... 28   *
 * Suite ............................................................ 44   *
 *   Filters ........................................................ 50   *
 *   Static Properties .............................................. --   *
 *   Constructor .................................................... --   *
 *   Event Callbacks ................................................ --   *
 *   Core Functions ................................................. 69   *
 *     render() ..................................................... --   *
 *     remove() ..................................................... --   *
 *   Special Functions .............................................. 91   *
 *     isA() ........................................................ 92   *
 *     setUser() ................................................... 140   *
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

describe('Dashboard Home View #travis', function() {
  var view;

  /* Filters
  /****************************************************************************/

  beforeAll(function() {
    jasmine.addMatchers(matchers);
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

    it('can be instantiated without a user', function() {
      var newView = new SUT();
      expect(newView.user).not.toExist();
    });
  });

  /* Elements
  /**************************************************************************/

  describe('DOM elements', function() {
    beforeEach(function() {
      view.render();
    });

    xit('has a task panel', function() {
      expect(view.$('#task-panel')).toBeInDom();
    });

    xit('has a top widget section', function() {
      expect(view.$('#dashboard-top-widgets')).toBeInDom();
    });
  });

  /* Event Wiring
  /**************************************************************************/

  /* Event Callbacks
  /**************************************************************************/

  /* Core View Functions
  /**************************************************************************/

  describe('render()', function() {
    it('calls renderTaskPanelView', function() {
      spyOn(view, 'renderTaskPanelView');
      view.render();
      expect(view.renderTaskPanelView).toHaveBeenCalled();
    });

    it('renders its top widgets', function() {
      spyOn(view.topWidgetView, 'render');
      view.render();
      expect(view.topWidgetView.render).toHaveBeenCalled();
    });

    it('inserts the task panel view into the DOM', function() {
      pending('Determine why views are not in the DOM');
      spyOn($.prototype, 'html').and.callThrough();
      view.render();
      expect(view.$('#task-panel')).toBeInDom();
    });

    it('inserts the top widget view into the DOM', function() {
      pending('Determine why views are not considered to be in the DOM');
      spyOn($.prototype, 'html').and.callThrough();
      view.render();
      expect(view.$('#dashboard-top-widgets')).toBeInDom();
    })
  });

  describe('remove()', function() {
    _.each(['taskPanelView', 'topWidgetView'], function(str) {
      it('removes the ' + str, function() {
        spyOn(view[str], 'remove');
        view.remove();
        expect(view[str].remove).toHaveBeenCalled();
      });
    });

    it('calls Backbone.View.prototype.remove on itself', function() {
      spyOn(Backbone.View.prototype.remove, 'call');
      view.remove();
      expect(Backbone.View.prototype.remove.call).toHaveBeenCalledWith(view);
    });
  });

  /* Special Functions
  /**************************************************************************/

  describe('special functions', function() {
    describe('isA()', function() {
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

    describe('renderTaskPanelView', function() {
      it('calls render on the task panel view', function() {
        spyOn(view.taskPanelView, 'render');
        view.renderTaskPanelView();
        expect(view.taskPanelView.render).toHaveBeenCalled();
      });

      it('attaches the task panel view to the DOM', function() {
        view.$el.html(view.template());
        view.renderTaskPanelView();
        $('body').html(view.$el);
        expect(view.taskPanelView.$el).toBeInDom();
      });
    });

    describe('setUser()', function() {
      var newView;

      beforeEach(function() {
        newView = new SUT();
        spyOn(newView, 'createTopWidgets');
        newView.setUser(user);
      });

      it('sets the user', function() {
        expect(newView.user).toBe(user);
      });

      it('sets the collection', function() {
        expect(newView.collection).toBe(user.tasks);
      });

      it('creates the task panel', function() {
        expect(newView.taskPanelView.klass).toBe('TaskPanelView');
      });

      it('calls createTopWidgets', function() {
        expect(newView.createTopWidgets).toHaveBeenCalled();
      });
    });
  });
});