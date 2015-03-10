require(process.cwd() + '/spec/support/jsdom.js');

var App = require(process.cwd() + '/js/dependencies.js');
var Env = require(process.cwd() + '/spec/support/env.js');
var SUT = require(process.cwd() + '/js/models/userModel.js');

var Backbone          = App.Backbone;
var $                 = Backbone.$ = App.$;

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
});