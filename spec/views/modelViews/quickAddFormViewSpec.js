require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var SUT = require(process.cwd() + '/js/views/modelViews/taskViews/quickAddFormView.js');

var matchers       = require('jasmine-jquery-matchers'),
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
    TaskModel      = require(process.cwd() + '/js/models/taskModel.js'),
    TaskCollection = require(process.cwd() + '/js/collections/taskCollection.js'),
    context        = describe; // RSpecify

Backbone.$         = $;

var task1 = new TaskModel({id: 1, title: 'Test Task 1', status: 'Blocking'}),
    task2 = new TaskModel({id: 2, title: 'Test Task 2', status: 'Blocking'}),
    task3 = new TaskModel({id: 3, title: 'Test Task 3', status: 'Blocking'});

var collection = new TaskCollection([task1, task2, task3]);

describe('Quick-Add Task Form', function() {
  var view, xhr, e;

  beforeEach(function() {
    jasmine.addMatchers(matchers);
    view = new SUT({collection: collection, grouping: {status: 'Blocking'}});
  });

  afterAll(function() {
    view.remove();
    view = null;
  });

  describe('constructor', function() {
    it('assigns the collection #travis', function() {
      expect(view.collection).toBe(collection);
    });

    it('doesn\'t call render #travis', function() {
      spyOn(SUT.prototype, 'render');
      var newView = new SUT({collection: collection});
      expect(SUT.prototype.render).not.toHaveBeenCalled();
    });

    it('sets the `grouping` property #travis', function() {
      expect(view.grouping).toEqual({status: 'Blocking'});
    });
  });

  describe('elements', function() {
    beforeEach(function() {
      view.render();
    });

    afterEach(function() {
      view.remove();
    });

    it('is a form #travis', function() {
      expect(view.$el[0].tagName).toBe('FORM');
    });

    it('has class .task-form #travis', function() {
      expect(view.$el[0]).toHaveClass('task-form');
    });

    it('has class .create-form #travis', function() {
      expect(view.$el[0]).toHaveClass('create-form');
    });

    it('has class .quick-add-form #travis', function() {
      expect(view.$el[0]).toHaveClass('quick-add-form');
    });
  });

  describe('event callbacks', function() {
    describe('createTask', function() {
      beforeEach(function() {
        e = $.Event('submit', {target: view.$el});
        view.render();
      });

      afterEach(function() {
        view.remove();
        collection.reset([task1, task2, task3]);
      });

      context('when valid', function() {
        beforeEach(function() {
          xhr = new XMLHttpRequest();

          spyOn(Canto.Utils, 'getAttributes').and.callFake(function() {
            return {title: 'Finish writing tests'};
          });

          spyOn($, 'ajax').and.callFake(function(args) {
            args.success();
          });
        });

        it('doesn\'t refresh the browser #travis', function() {
          spyOn(e, 'preventDefault');
          view.createTask(e);
          expect(e.preventDefault).toHaveBeenCalled();
        });

        it('creates a new task #travis', function() {
          spyOn(TaskModel.prototype, 'initialize');
          view.createTask(e);
          expect(TaskModel.prototype.initialize).toHaveBeenCalled();
        });

        it('attaches an auth header #travis', function() {
          spyOn($, 'cookie').and.callFake(function(args) {
            return args === 'userID' ? 342 : btoa('testuser:testuser');
          });

          xhr.open('POST', Canto.API.tasks.collection(342));
          view.createTask(e);
          $.ajax.calls.argsFor(0)[0].beforeSend(xhr);
          expect(xhr.getRequestHeader('Authorization')).toEqual('Basic ' + btoa('testuser:testuser'));
        });

        it('sets the new task\'s attributes according to its grouping #travis', function() {
          spyOn(TaskModel.prototype, 'save');
          view.createTask(e);
          expect(TaskModel.prototype.save.calls.argsFor(0)[0].status).toEqual('Blocking');
        });

        it('adds the new task to the beginning of the collection #travis', function() {
          spyOn(collection, 'unshift');
          view.createTask(e);
          expect(collection.unshift).toHaveBeenCalled();
        });

        it('triggers the newTask event #travis', function() {
          var spy = jasmine.createSpy('spy');
          view.on('newTask', spy);
          view.createTask(e);
          expect(spy).toHaveBeenCalled();
          view.off();
        });

        it('resets the form #travis', function() {
          spyOn(view.$el[0], 'reset');
          view.createTask(e);
          expect(view.$el[0].reset).toHaveBeenCalled();
        });
      });

      context('when no title given', function() {
        it('doesn\'t create a task', function() {
          spyOn(collection, 'create');
          spyOn(TaskModel.prototype, 'initialize');
          view.createTask(e);
          expect(collection.create).not.toHaveBeenCalled();
          expect(TaskModel.prototype.initialize).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('special methods', function() {
    describe('isA', function() {
      it('returns true with arg \'QuickAddFormView\' #travis', function() {
        expect(view.isA('QuickAddFormView')).toBe(true);
      });

      it('returns true with arg \'TaskCollectionView\' #travis', function() {
        expect(view.isA('TaskCollectionView')).toBe(true);
      });

      it('returns true with arg \'TaskCreateFormView\' #travis', function() {
        expect(view.isA('TaskCreateFormView')).toBe(true);
      });

      it('returns true with arg \'TaskForm\' #travis', function() {
        expect(view.isA('TaskFormView')).toBe(true);
      });

      it('returns true with arg \'Backbone.View\' #travis', function() {
        expect(view.isA('Backbone.View')).toBe(true);
      });

      it('returns false with other arg #travis', function() {
        expect(view.isA('Backbone.Model')).toBe(false);
      });
    });
  });
});