require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var SUT = require(process.cwd() + '/js/views/modelViews/taskViews/quickAddFormView.js');

var matchers       = require('jasmine-jquery-matchers');
var TaskModel      = require(process.cwd() + '/js/models/taskModel.js');
var TaskCollection = require(process.cwd() + '/js/collections/taskCollection.js');
Backbone.$         = $;
var context        = describe; // RSpecify

var task1 = new TaskModel({id: 1, title: 'Test Task 1', status: 'Blocking'}),
    task2 = new TaskModel({id: 2, title: 'Test Task 2', status: 'Blocking'}),
    task3 = new TaskModel({id: 3, title: 'Test Task 3', status: 'Blocking'});

var collection = new TaskCollection([task1, task2, task3]);

describe('Quick-Add Task Form', function() {
  var view;

  beforeEach(function() {
    jasmine.addMatchers(matchers);
    view = new SUT({collection: collection, grouping: {status: 'Blocking'}});
  });

  afterAll(function() {
    view.remove();
    view = null;
  });

  describe('constructor', function() {
    it('#travis assigns the collection', function() {
      expect(view.collection).toBe(collection);
    });

    it('#travis doesn\'t call render', function() {
      spyOn(SUT.prototype, 'render');
      var newView = new SUT({collection: collection});
      expect(SUT.prototype.render).not.toHaveBeenCalled();
    });

    it('#travis sets the `grouping` property', function() {
      expect(view.grouping).toEqual({status: 'Blocking'});
    });
  });
});