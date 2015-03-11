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
  var collection, model1, model2, model3, xhr, ajaxSettings, spy;

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

  describe('special functions', function() {
    describe('updateAll', function() {
      beforeEach(function() {
        spy = jasmine.createSpy('spy');

        model1 = new Model({foo: 'bar'}), model2 = new Model({foo: 'baz'}), model3 = new Model({foo: 'qux'});
        
        collection.reset([model1, model2, model3]);
        collection.on('collectionSynced', spy);
        
        spyOn($, 'ajax').and.callFake(function(args) {
          args.success();
        });

        // Only 2 of the 3 models have been modified in this example, so only
        // those should be sent in the request.

        spyOn(model1, 'hasChanged').and.returnValue(true);
        spyOn(model2, 'hasChanged').and.returnValue(false);
        spyOn(model3, 'hasChanged').and.returnValue(true);

        collection.updateAll();
        ajaxSettings = $.ajax.calls.argsFor(0)[0];
      });

      it('sends a request to the collection\'s main URL', function() {
        expect(ajaxSettings.url).toEqual(collection.url);
      });

      it('sends a PUT request', function() {
        expect(ajaxSettings.type).toEqual('PUT');
      });

      it('triggers the collectionSynced event', function() {
        expect(spy).toHaveBeenCalled();
      });

      it('includes all changed models', function() {
        var expected = [JSON.parse(JSON.stringify(model1)), JSON.parse(JSON.stringify(model3))];
        expect(JSON.parse(ajaxSettings.data)).toEqual(expected);
      });

      it('reintegrates the updated models into itself', function() {
        model1.set({foo: 'qux'});
        collection.updateAll();
        expect(collection.models[0].get('foo')).toEqual('qux');
      });
    });

    describe('isA', function() {
      it('returns true with arg \'ProtectedCollection\'', function() {
        expect(collection.isA('ProtectedCollection')).toBe(true);
      });

      it('returns true with arg \'Backbone.Collection\'', function() {
        expect(collection.isA('Backbone.Collection')).toBe(true);
      });

      it('returns false with another value', function() {
        expect(collection.isA('TaskModel')).toBe(false);
      });
    });
  });
});