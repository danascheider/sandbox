require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

// The fixtures file defines a user, three tasks, and a task collection.
// Using _.extend enables us to treat them as imported variables instead
// of having to use the Fixtures namespace.

var SUT = require(process.cwd() + '/js/views/partialViews/taskPanelView.js');

var Fixtures       = require(process.cwd() + '/spec/support/fixtures/fixtures.js'),
    TaskModel      = require(process.cwd() + '/js/models/taskModel.js'),
    ListItemView   = require(process.cwd() + '/js/views/modelViews/taskViews/taskListItemView.js'),
    matchers       = _.extend(require('jasmine-jquery-matchers'), require(process.cwd() + '/spec/support/matchers/toBeA')),
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
    context        = describe,
    fcontext       = fdescribe;

describe('Task Panel View #travis', function() {

  // Declare variables to be used in the tests
  var taskPanel, opts, childViews, e;

  beforeAll(function() {
    _.extend(global, Fixtures);

    opts = {
      collection : collection,
      grouping   : {
        backlog : false
      }
    };
  });

  beforeEach(function() {

    // Add Jasmine jQuery matchers and the custom toBeA matcher
    jasmine.addMatchers(matchers);

    // Create an instance of the SUT
    taskPanel = new SUT(opts);
  });

  afterEach(function() {
    taskPanel.remove();
    taskPanel.unbind();
    restoreFixtures();
  });

  afterAll(function() {
    taskPanel = null;

    // Scrub up the pollution
    global = _.omit(global, Fixtures);
  });

  describe('constructor', function() {
    it('doesn\'t call render', function() {
      spyOn(SUT.prototype, 'render');
      var newPanel = new SUT(opts);
      expect(SUT.prototype.render).not.toHaveBeenCalled();
    });

    it('sets a collection', function() {
      expect(taskPanel.collection).toBe(collection);
    });

    it('instantiates a collection view', function() {

      // For some reason, when I worded this with the toBeA('TaskCollectionView')
      // matcher, it passed even when the thing did not exist. That's why I'm 
      // using the stupid matcher.

      expect(taskPanel.collectionView).toExist();
    });
  });

  describe('properties', function() {
    it('has klass \'TaskPanelView\'', function() {
      expect(taskPanel.klass).toBe('TaskPanelView');
    });
  });

  describe('elements', function() {
    beforeEach(function() {
      taskPanel.render();
    });

    it('has ID #task-panel', function() {
      expect(taskPanel.$el).toHaveId('task-panel');
    });

    it('has class \'panel\'', function() {
      expect(taskPanel.$el).toHaveClass('panel');
    });

    it('has class \'panel-primary\'', function() {
      expect(taskPanel.$el).toHaveClass('panel-primary');
    });

    it('has class \'dash-widget\'', function() {
      expect(taskPanel.$el).toHaveClass('dash-widget');
    });

    it('has a collection view', function() {
      expect(taskPanel.$('ul.task-list')).toExist();
    });
  });

  fdescribe('events', function() {
    describe('mouseenter', function() {
      it('calls showToggleWidgetIcon', function() {
        spyOn(SUT.prototype, 'showToggleWidgetIcon');
        var newView = new SUT({collection: collection});
        newView.$el.mouseenter();
        expect(SUT.prototype.showToggleWidgetIcon).toHaveBeenCalled();
      });
    });
    // Make sure to test for the callback on the collection's events -
    // change:status and change:backlog
  });

  describe('event callbacks', function() {
    describe('crossOffComplete', function() {
      beforeEach(function() {
        task1.set({status: 'Complete'}, {silent: true});
        taskPanel.render();
      });

      afterEach(function() {
        task1.set({status: 'New'}, {silent: true});
      })

      it('calls crossOff on the collection view', function() {
        spyOn(taskPanel.collectionView, 'crossOff');
        taskPanel.crossOffComplete();
        expect(taskPanel.collectionView.crossOff).toHaveBeenCalledWith(task1);
      });
    });

    describe('filterCollection', function() {
      beforeEach(function() {
        spyOn($, 'ajax');

        for(var i = 4; i < 13; i++) {
          taskPanel.collection.create({title: 'My Task ' + i, position: i}, {sync: false});
        }
      });

      it('returns 10 tasks', function() {
        expect(taskPanel.filterCollection(collection)).toHaveLength(10);
      });

      it('doesn\'t include blocking tasks', function() {
        task3.set({status: 'Blocking'});

        // Yes, it needed to be phrased this way in order for it to work.
        expect(taskPanel.filterCollection(collection).indexOf(task3)).toBe(-1);
      });

      it('doesn\'t include backlogged tasks', function() {
        task2.set({backlog: true});
        expect(taskPanel.filterCollection(collection).indexOf(task2)).toBe(-1);
      })
    });

    describe('hideWidget', function() {
      beforeEach(function() {
        taskPanel.render();
        taskPanel.hideWidget();
      });

      it('changes the icon class to .show-widget', function() {
        expect(taskPanel.$('span.pull-right').first()).not.toHaveClass('hide-widget');
        expect(taskPanel.$('span.pull-right').first()).toHaveClass('show-widget');
      });

      it('changes the icon to fa-plus', function() {
        expect(taskPanel.$('span.pull-right i').first()).not.toHaveClass('fa-minus');
        expect(taskPanel.$('span.pull-right i').first()).toHaveClass('fa-plus');
      })
    });

    describe('removeBacklogged', function() {
      it('removes the specified task from the collection', function() {
        spyOn(taskPanel.collection, 'remove');
        task1.set({backlog: true});
        taskPanel.removeBacklogged();
        expect(taskPanel.collection.remove).toHaveBeenCalledWith(task1);
      });
    });

    describe('showWidget', function() {
      beforeEach(function() {
        taskPanel.render();
        taskPanel.hideWidget(); // hide it first
        taskPanel.showWidget();
      });

      it('changes the icon class to .hide-widget', function() {
        expect(taskPanel.$('span.pull-right').first()).toHaveClass('hide-widget');
        expect(taskPanel.$('span.pull-right').first()).not.toHaveClass('show-widget');
      });

      it('changes the icon to fa-minus', function() {
        expect(taskPanel.$('span.pull-right i').first()).toHaveClass('fa-minus');
      });
    });
  });

  describe('core view functions', function() {
    describe('remove()', function() {
      it('removes the collection view from the DOM', function() {
        spyOn(taskPanel.collectionView, 'remove');
        taskPanel.remove();
        expect(taskPanel.collectionView.remove).toHaveBeenCalled();
      });

      it('removes itself from the DOM', function() {
        spyOn(Backbone.View.prototype.remove, 'call');
        taskPanel.remove();
        expect(Backbone.View.prototype.remove.call).toHaveBeenCalledWith(taskPanel);
      });

      it('calls undelegateEvents', function() {
        spyOn(taskPanel, 'undelegateEvents');
        taskPanel.remove();
        expect(taskPanel.undelegateEvents).toHaveBeenCalled();
      });
    });

    describe('render()', function() {
      it('sets its HTML', function() {
        spyOn(taskPanel.$el, 'html');
        taskPanel.render();
        expect(taskPanel.$el.html).toHaveBeenCalledWith(taskPanel.template());
      });

      it('calls delegateEvents on itself', function() {
        spyOn(taskPanel, 'delegateEvents');
        taskPanel.render();
        expect(taskPanel.delegateEvents).toHaveBeenCalled();
      });

      it('renders its collection view', function() {
        spyOn(taskPanel.collectionView, 'render');
        taskPanel.render();
        expect(taskPanel.collectionView.render).toHaveBeenCalled();
      });

      it('attaches the collection view to the DOM', function() {
        spyOn($.prototype, 'html');
        taskPanel.render();
        expect($.prototype.html.calls.argsFor(1)).toContain(taskPanel.collectionView.template());
      })

      it('configures sortable', function() {
        spyOn($.prototype, 'sortable');
        taskPanel.render();
        expect($.prototype.sortable).toHaveBeenCalled();
      });

      it('doesn\'t let not-sortable things be sorted', function() {
        spyOn($.prototype, 'sortable');
        taskPanel.render();
        expect($.prototype.sortable.calls.argsFor(0)[0].items).toEqual('>*:not(.not-sortable)')
      })

      it('returns itself', function() {
        expect(taskPanel.render()).toEqual(taskPanel);
      });
    });
  });

  describe('special functions', function() {
    describe('isA', function() {
      it('returns true with argument \'TaskPanelView\'', function() {
        expect(taskPanel.isA('TaskPanelView')).toBe(true);
      });

      it('returns true with argument \'TaskPanel\'', function() {
        expect(taskPanel.isA('TaskPanel')).toBe(true);
      });

      it('returns true with argument \'TaskView\'', function() {
        expect(taskPanel.isA('TaskView')).toBe(true);
      });

      it('returns true with argument \'PartialView\'', function() {
        expect(taskPanel.isA('PartialView')).toBe(true);
      });

      it('returns false with other arguments', function() {
        expect(taskPanel.isA('TaskCollectionView')).toBe(false);
      });
    });
  });
});