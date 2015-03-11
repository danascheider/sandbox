require(process.cwd() + '/spec/support/jsdom.js');
document = window;

var App = require(process.cwd() + '/js/dependencies.js');
var Env = require(process.cwd() + '/spec/support/env.js');
var SUT = require(process.cwd() + '/js/collections/taskCollection.js');

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var TaskModel      = require(process.cwd() + '/js/models/taskModel.js');
var Backbone       = App.Backbone;
var $              = Backbone.$ = App.$;
var context        = describe; // RSpecify

describe('Task Collection', function() {
  var collection;

  // Instantiate the tasks that will populate the collection
  var task1 = new TaskModel({id: 1, title: 'Task 1', status: 'New', priority: 'Normal', position: 1});
  var task2 = new TaskModel({id: 2, title: 'Task 2', status: 'New', priority: 'Normal', position: 2});
  var task3 = new TaskModel({id: 3, title: 'Task 3', status: 'Complete', priority: 'Normal', position: 3});

  beforeEach(function() {
    spyOn($, 'cookie').and.callFake(function(name) {
      return name === 'userID' ? 342 : Env.btoa('testuser:testuser');
    });

    collection = new SUT([task1, task2, task3]);
  });

  describe('constructor', function() {
    it('sets the models', function() {
      expect(collection.models).toEqual([task1, task2, task3]);
    });
  });
});