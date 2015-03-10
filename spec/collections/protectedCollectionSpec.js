require(process.cwd() + '/spec/support/jsdom.js');
document = window;

var App = require(process.cwd() + '/js/dependencies.js');
var Env = require(process.cwd() + '/spec/support/env.js');
var SUT = require(process.cwd() + '/js/collections/protectedCollection.js');

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var Backbone       = App.Backbone;
var $              = Backbone.$ = App.$;
var Model          = Backbone.Model.extend({});
var context        = describe; // RSpecify

describe('Protected Collection', function() {
  var collection, model1, model2, model3, xhr;

  beforeEach(function() {
    collection = new SUT({model: Model});
    collection.url = App.API.base + '/models';
    xhr = new XMLHttpRequest();
    spyOn($, 'cookie').and.returnValue(Env.btoa('testuser:testuser'));
  });

  describe('token', function() {
    it('returns the value of the auth header for the logged-in user', function() {
      expect(collection.token()).toEqual('Basic ' + Env.btoa('testuser:testuser'));
    });
  });

  describe('core functions', function() {
    describe('fetch', function() {
      beforeEach(function() { spyOn($, 'ajax'); });

      it('attaches the auth header', function() {
        xhr.open('GET', collection.url);
        collection.fetch();
        $.ajax.calls.argsFor(0)[0].beforeSend(xhr);
        expect(xhr.getRequestHeader('Authorization')).toEqual(collection.token());
      });

      it('calls fetch on the Backbone collection prototype', function() {
        spyOn(Backbone.Collection.prototype, 'fetch');
        collection.fetch();
        expect(Backbone.Collection.prototype.fetch).toHaveBeenCalled();
      });
    });
  });
});