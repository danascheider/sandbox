require(process.cwd() + '/spec/support/jsdom.js');
document = window;

var App = require(process.cwd() + '/js/dependencies.js');
var Env = require(process.cwd() + '/spec/support/env.js');
var SUT = require(process.cwd() + '/js/models/userModel.js');

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var Backbone       = App.Backbone;
var $              = Backbone.$ = App.$;

describe('User Model', function() {
  var user, xhr;

  beforeEach(function() {
    user = new SUT({id: 342, username: 'testuser', password: 'testuser', email: 'testuser@example.com', first_name: 'Test', last_name: 'User'});
    xhr = new XMLHttpRequest();
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

    describe('when instantiated with an ID', function() {
      it('calls protectedFetch', function() {
        var newUser = new SUT({id: 14});
        expect(SUT.prototype.protectedFetch).toHaveBeenCalled();
      });

      it('doesn\'t call protectedFetch if `sync` is set to false', function() {
        var newUser = new SUT({id: 22}, {sync: false});
        expect(SUT.prototype.protectedFetch).not.toHaveBeenCalled();
      });
    });

    describe('when not instantiated with an ID', function() {
      it('doesn\'t call protectedFetch', function() {
        var newUser = new SUT();
        expect(SUT.prototype.protectedFetch).not.toHaveBeenCalled();
      });
    });
  });

  describe('core functions', function() {
    beforeEach(function() {
      spyOn($, 'ajax');
    });

    describe('fetch', function() {
      it('calls Backbone fetch function', function() {
        spyOn(Backbone.Model.prototype, 'fetch');
        user.fetch();
        expect(Backbone.Model.prototype.fetch).toHaveBeenCalled();
      });

      it('sets the auth header for the requested user', function() {
        xhr = new XMLHttpRequest();
        xhr.open('GET', user.url());
        user.fetch();
        $.ajax.calls.argsFor(0)[0].beforeSend(xhr);
        expect(xhr.getRequestHeader('Authorization')).toEqual('Basic ' + Env.btoa('testuser:testuser'));
      });

      it('sends the request to the requested user\'s endpoint', function() {
        user.fetch();
        expect($.ajax.calls.argsFor(0)[0].url).toEqual(user.url());
      });
    });
  });

  describe('special functions', function() {
    beforeEach(function() {
      spyOn($, 'cookie').and.returnValue('Basic ' + Env.btoa('danascheider:danascheider'));
      spyOn($, 'ajax');
    });

    describe('protectedFetch', function() {
      it('calls Backbone fetch function', function() {
        spyOn(Backbone.Model.prototype, 'fetch');
        user.protectedFetch();
        expect(Backbone.Model.prototype.fetch).toHaveBeenCalled();
      });

      it('sets the auth header for the requested user', function() {
        xhr.open('GET', user.url);
        user.protectedFetch();
        $.ajax.calls.argsFor(0)[0].beforeSend(xhr);
        expect(xhr.getRequestHeader('Authorization')).toEqual('Basic ' + Env.btoa('danascheider:danascheider'));
      });

      it('sends the request to the requested user\'s endpoint', function() {

        user.protectedFetch();
        expect($.ajax.calls.argsFor(0)[0].url).toEqual(App.API.base + '/users/342');
      });
    });
  });
});