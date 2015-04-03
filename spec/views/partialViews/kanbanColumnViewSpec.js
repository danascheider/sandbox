/****************************************************************************
 *                                                                         *
 * KANBAN COLUMN VIEW                                                      *
 *                                                                         *
 * The Kanban column view displays information about the user's tasks,     *
 * sorted by status. Each column has tasks of one status: In Progress,     *  
 * New, Blocking, or Backlogged. In the future, users may be able to       *
 * access their completed tasks as well.                                   *
 *                                                                         *
 * CONTENTS                                                          LINE  *
 * Core Requires .................................................... 26   *
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
/***************************************************************************/

/* Core Requires
/****************************************************************************/

require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/spec/support/env.js');

var matchers       = _.extend(require('jasmine-jquery-matchers')),
    fixtures       = require(process.cwd() + '/spec/support/fixtures/fixtures.js'),
    context        = describe,
    fcontext       = fdescribe;

var SUT = require(process.cwd() + '/js/views/partialViews/kanbanColumnView.js');

/****************************************************************************
 * BEGIN SUITE                                                              *
/****************************************************************************/

describe('Kanban Column View #travis', function() {
  var view, data;

  beforeAll(function() {
    jasmine.addMatchers(matchers);
    _.extend(global, fixtures);
    data = {collection: collection, color: 'blue', icon: 'fa-exclamation-circle', headline: 'New'};
  });

  beforeEach(function() {
    view = new SUT(data);
  });

  afterAll(function() {
    view.remove();
    view = null;
    global = _.omit(global, fixtures);
  });

  /* Static Properties
  /**************************************************************************/

  describe('properties', function() {
    it('has klass KanbanColumnView', function() {
      expect(view.klass).toEqual('KanbanColumnView');
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
      var newView = new SUT(data);
    });

    it('sets the collection', function () {
      expect(view.collection).toBe(collection);
    });

    it('sets the data property', function() {
      var newView = new SUT(data);
      _.each(['color', 'icon', 'headline'], function(prop) {
        expect(newView.data[prop]).toEqual(data[prop]);
      });
    });

    // FIX: Decide if the groupedBy property is really such a good idea

    it('creates a collection view', function() {
      expect(view.collectionView.isA('TaskCollectionView')).toBe(true);
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

  describe('remove()', function() {
    it('removes the collection view', function() {
      spyOn(view.collectionView, 'remove');
      view.remove();
      expect(view.collectionView.remove).toHaveBeenCalled();
    });

    it('removes itself from the DOM using the Canto View prototype', function() {
      spyOn(Canto.View.prototype.remove, 'call');
      view.remove();
      expect(Canto.View.prototype.remove.call).toHaveBeenCalledWith(view);
    });
  });

  describe('render()', function() {
    it('renders the collection view', function() {
      spyOn(view.collectionView, 'render');
      view.render();
      expect(view.collectionView.render).toHaveBeenCalled();
    });

    it('attaches the collection view to the DOM', function() {
      $('body').html(view.$el);
      view.render();
      expect(view.$('ul.task-list')).toBeInDom();
    });
  });

  /* Special Functions
  /**************************************************************************/

  describe('special functions', function() {
    describe('isA()', function() {
      it('returns true with argument KanbanColumnView', function() {
        expect(view.isA('KanbanColumnView')).toBe(true);
      });

      it('returns true with argument KanbanColumn', function() {
        expect(view.isA('KanbanColumn')).toBe(true);
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