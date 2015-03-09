require(process.cwd() + '/spec/support/jsdom.js');

var App = require(process.cwd() + '/js/dependencies.js');
var Env = require(process.cwd() + '/spec/support/env.js');
var SUT = require(process.cwd() + '/js/models/protectedResource.js');

var Backbone = App.Backbone;
var $ = Backbone.$ = App.$;

describe('Protected Resource', function() {
  var resource;

  beforeEach(function() {
    resource = new SUT({id: 1});
    resource.url = App.API.base + '/protected-resources/1'; 
  });

  afterAll(function() {
    resource = null;
  });

  it('returns its token', function() {
    spyOn($, 'cookie').and.returnValue(Env.btoa('testuser:testuser'));
    var string = 'Basic ' + Env.btoa('testuser:testuser');
    expect(resource.token()).toEqual(string);
  });

  describe('destroy() method', function() {
    it('attaches an authorization header', function() {
      spyOn($, 'ajax');
      resource.destroy();
      expect($.ajax).toHaveBeenCalled;
    });

    it('calls destroy on the Backbone model prototype', function() {
      spyOn(Backbone.Model.prototype.destroy, 'call');
      resource.destroy();
      expect(Backbone.Model.prototype.destroy.call).toHaveBeenCalledWith(resource, {});
    });
  });
});