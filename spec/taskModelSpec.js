require(process.cwd() + '/spec/support/jsdom.js');

var App = require(process.cwd() + '/js/dependencies.js');
var Env = require(process.cwd() + '/spec/support/env.js');
var SUT = require(process.cwd() + '/js/models/taskModel.js');

var ProtectedResource = require(process.cwd() + '/js/models/protectedResourceModel.js');
var XMLHttpRequest    = require('xmlhttprequest').XMLHttpRequest;
var Backbone          = App.Backbone;
var $                 = Backbone.$ = App.$;
var context           = describe;

describe('Task Model', function() {
  var task, xhr;

  beforeEach(function() {
    task = new SUT({id: 1, title: 'My Task'});
    var cookie = spyOn($, 'cookie').and.callFake(function(name) {
      return name === 'userID' ? 342 : 'Basic ' + Env.btoa('testuser:testuser');
    });
    spyOn($, 'ajax');
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

  describe('core functions', function() {
    describe('fetch', function() {
      it('sends the request to the task\'s individual endpoint', function() {
        task.fetch();
        expect($.ajax.calls.argsFor(0)[0].url).toEqual(task.url());
      });

      it('calls fetch on the ProtectedResource prototype', function() {
        spyOn(ProtectedResource.prototype, 'fetch');
        task.fetch();
        expect(ProtectedResource.prototype.fetch).toHaveBeenCalled();
      });
    });

    describe('save', function() {
      it('calls validate', function() {
        spyOn(task, 'validate');
        task.save();
        expect(task.validate).toHaveBeenCalled();
      });

      it('calls save on the ProtectedResource prototype', function() {
        spyOn(ProtectedResource.prototype, 'save');
        task.save();
        expect(ProtectedResource.prototype.save).toHaveBeenCalled();
      });

      context('when the task is new', function() {
        beforeEach(function() {
          spyOn(task, 'isNew').and.returnValue(true);
          task.save();
        });

        it('sends the request to the collection endpoint', function() {
          expect($.ajax.calls.argsFor(0)[0].url).toEqual(task.urlRoot());
        });

        it('sends a POST request', function() {
          expect($.ajax.calls.argsFor(0)[0].type).toEqual('POST');
        });
      });

      context('when the task is not new', function() {
        beforeEach(function() { 
          spyOn(task, 'isNew').and.returnValue(false); 
          task.save();
        });

        it('sends the request to the individual endpoint', function() {
          expect($.ajax.calls.argsFor(0)[0].url).toEqual(task.url());
        });

        it('sends a PUT request', function() {
          expect($.ajax.calls.argsFor(0)[0].type).toEqual('PUT');
        });
      });
    });
  });

  describe('special functions', function() {
    describe('complete', function() {
      context('when the task is complete', function() {
        it('returns true', function() {
          task.set('status', 'Complete');
          expect(task.complete()).toEqual(true);
        });
      });
    });
  });
});