require(process.cwd() + '/spec/support/jsdom.js');

var App = require(process.cwd() + '/js/dependencies.js');
var Env = require(process.cwd() + '/spec/support/env.js');
var SUT = require(process.cwd() + '/js/models/taskModel.js');

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var Backbone       = App.Backbone;
var $              = Backbone.$ = App.$;

describe('Task Model', function() {
  var task, xhr;

  beforeEach(function() {
    task = new SUT({id: 1, title: 'My Task'});
    var cookie = spyOn($, 'cookie').and.callFake(function(name) {
      return name === 'userID' ? 342 : 'Basic ' + Env.btoa('testuser:testuser');
    });
  });

  afterAll(function() {
    task = null;
  });

  describe('properties', function() {
    it('has a `urlRoot` scoped to the logged in user', function() {
      expect(task.urlRoot()).toEqual(App.API.base + '/users/342/tasks');
    });

    it('has an individual `url` not scoped to the logged in user', function() {
      expect(task.url()).toEqual(App.API.base + '/tasks/1');
    });
  });

  describe('constructor', function() {
    it('does not save the task automatically', function() {
      spyOn(SUT.prototype, 'save');
      var newTask = new SUT();
      expect(SUT.prototype.save).not.toHaveBeenCalled();
    });
  });

  describe('validations', function() {
    it('is invalid without a title', function() {
      var newTask = new SUT();
      expect(newTask.isValid()).toBe(false);
    });
  });
});