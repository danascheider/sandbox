require(process.cwd() + '/spec/support/jsdom.js');
document = window;

var App = require(process.cwd() + '/js/dependencies.js');
var Env = require(process.cwd() + '/spec/support/env.js');
var SUT = require(process.cwd() + '/js/collections/protectedCollection.js');

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var Backbone       = App.Backbone;
var $              = Backbone.$ = App.$;
var context        = describe; // RSpecify

describe('Protected Collection', function() {
  var collection, model1, model2, model3;

  beforeEach(function() {
    collection = new SUT();
    spyOn($, 'cookie').and.returnValue(Env.btoa('testuser:testuser'));
  });

  describe('token', function() {
    it('returns the value of the auth header for the logged-in user', function() {
      expect(collection.token()).toEqual('Basic ' + Env.btoa('testuser:testuser'));
    });
  });
});