require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var SUT = require(process.cwd() + '/js/views/collectionViews/taskCollectionView.js');

var matchers       = require('jasmine-jquery-matchers'),
    toBeA          = require(process.cwd() + '/spec/support/matchers/toBeA.js');
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
    TaskModel      = require(process.cwd() + '/js/models/taskModel.js'),
    TaskCollection = require(process.cwd() + '/js/collections/taskCollection.js'),
    context        = describe,
    fcontext       = fdescribe;

Backbone.$         = $;

var task1 = new TaskModel({id: 1, title: 'Test Task 1', status: 'Blocking'}),
    task2 = new TaskModel({id: 2, title: 'Test Task 2', status: 'Blocking'}),
    task3 = new TaskModel({id: 3, title: 'Test Task 3', status: 'Blocking'});

var collection = new TaskCollection([task1, task2, task3]);

fdescribe('Task Collection View #travis', function() {
  var view;
  
  beforeEach(function() {
    jasmine.addMatchers(matchers);
    jasmine.addMatchers(toBeA);
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
      console.log(toBeA.toString());
      expect(view.quickAddForm).toBeA('QuickAddForm');
    });
  });

  fdescribe('elements #travis', function() {
    beforeEach(function() { view.render(); });

    it('is a ul', function() {
      expect(view.$el[0]).toHaveTag('UL');
    });
  });
});