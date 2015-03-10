require(process.cwd() + '/spec/support/jsdom.js');

var App = require(process.cwd() + '/js/dependencies.js');
var Env = require(process.cwd() + '/spec/support/env.js');
var SUT = require(process.cwd() + '/js/models/userModel.js');

var Backbone          = App.Backbone;
var $                 = Backbone.$ = App.$;
var context           = describe // RSpecify

describe('User Model', function() {
  var user;

  beforeEach(function() {
    user = new SUT({id: 342, username: 'testuser', password: 'testuser', email: 'testuser@example.com', first_name: 'Test', last_name: 'User'});
  });

  afterAll(function() {
    user = null;
  });

  describe('properties', function() {
    it('has `urlRoot` /users', function() {
      expect(user.urlRoot).toEqual(App.API.base + '/users');
    });
  });

  describe('constructor', function() {
    beforeEach(function() { spyOn(SUT.prototype, 'protectedFetch'); });

    it('instantiates a task collection', function() {
      pending('need to define the task collection');
    });

    context('when instantiated with an ID', function() {
      it('calls protectedFetch', function() {
        var newUser = new SUT({id: 14});
        expect(SUT.prototype.protectedFetch).toHaveBeenCalled();
      });

      it('doesn\'t call protectedFetch if `sync` is set to false', function() {
        var newUser = new SUT({id: 22}, {sync: false});
        expect(SUT.prototype.protectedFetch).not.toHaveBeenCalled();
      });
    });

    context('when not instantiated with an ID', function() {
      it('doesn\'t call protectedFetch', function() {
        var newUser = new SUT();
        expect(SUT.prototype.protectedFetch).not.toHaveBeenCalled();
      });
    });
  });
});