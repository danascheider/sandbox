require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var SUT = require(process.cwd() + '/js/views/collectionViews/taskCollectionView.js');

var matchers       = require('jasmine-jquery-matchers'),
    custom         = require(process.cwd() + '/spec/support/matchers/toBeA.js');
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
    TaskModel      = require(process.cwd() + '/js/models/taskModel.js'),
    TaskCollection = require(process.cwd() + '/js/collections/taskCollection.js'),
    ListItemView   = require(process.cwd() + '/js/views/modelViews/taskViews/taskListItemView.js'),
    context        = describe,
    fcontext       = fdescribe;

Backbone.$         = $;

var task1 = new TaskModel({id: 1, title: 'Test Task 1', status: 'Blocking'}),
    task2 = new TaskModel({id: 2, title: 'Test Task 2', status: 'Blocking'}),
    task3 = new TaskModel({id: 3, title: 'Test Task 3', status: 'Blocking'});

var collection = new TaskCollection([task1, task2, task3]);

var childViews = [];

collection.each(function(task) {
  childViews.push(new ListItemView({model: task}));
});

describe('Task Collection View #travis', function() {
  var view;
  
  beforeEach(function() {
    jasmine.addMatchers(matchers);
    jasmine.addMatchers(custom);
    view = new SUT({collection: collection});
  });

  afterAll(function() {
    view.remove();
    view = null;
  });

  describe('constructor', function() {
    it('does not call the render function #travis', function() {
      spyOn(SUT.prototype, 'render');
      var newView = new SUT({collection: collection});
      expect(SUT.prototype.render).not.toHaveBeenCalled();
    });

    it('creates an empty childViews array #travis', function() {
      expect(view.childViews).toEqual([]);
    });

    it('creates a quick-add form #travis', function() {
      expect(view.quickAddForm.klass).toEqual('QuickAddTaskFormView');
    });
  });

  describe('elements', function() {
    beforeEach(function() { view.render(); });

    it('is a ul #travis', function() {
      expect(view.$el[0]).toHaveTag('UL');
    });

    it('has class .task-list #travis', function() {
      expect(view.$el[0]).toHaveClass('task-list');
    });
  });

  describe('special functions', function() {
    describe('retrieveViewForModel', function() {
      context('when there is no view for the model', function() {
        beforeEach(function() { view.childViews = []; });

        it('returns null #travis', function() {
          expect(view.retrieveViewForModel(task1)).toBe(null);
        });
      });

      context('when there is a view for the model', function() {
        beforeEach(function() { view.childViews = childViews; });

        it('returns the appropriate view', function() {
          expect((view.retrieveViewForModel(task1)).klass).toEqual('TaskListItemView');
        });
      });
    });
  });

  describe('core view functions', function() {
    describe('render', function() {
      it('sets the HTML of its el #travis', function() {
        spyOn(view.$el, 'html');
        view.render();
        expect(view.$el.html).toHaveBeenCalled();
      });

      it('renders the quick-add form #travis', function() {
        spyOn(view.quickAddForm, 'render');
        view.render();
        expect(view.quickAddForm.render).toHaveBeenCalled();
      });

      it('calls delegateEvents on itself #travis', function() {
        spyOn(view, 'delegateEvents');
        view.render();
        expect(view.delegateEvents).toHaveBeenCalled();
      });

      it('renders the list items #travis', function() {
        view.render();
        expect(view.$('li.task-list-item').length).toEqual(3);
      });

      it('returns itself', function() {
        expect(view.render()).toBe(view);
      });

      describe('idempotency', function() {
        beforeEach(function() { 
          view.childViews = childViews;
          view.render(); 
        });

        it('maintains the length of the list #travis', function() {
          view.render(); // render a second time
          expect(view.$('.task-list-item').length).toEqual(3);
        });

        it('maintains the length of the child view array #travis', function() {
          view.render();
          expect(view.childViews.length).toEqual(3);
        });
      });
    });
  });
});