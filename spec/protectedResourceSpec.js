var App = require(process.cwd() + '/js/dependencies.js');
var Env = require(process.cwd() + '/spec/support/env.js');
var SUT = require(process.cwd() + '/js/models/protectedResource.js');

var Backbone = App.Backbone;
var $        = App.$

describe('Protected Resource', function() {
  var resource;

  beforeEach(function() {
    resource = new SUT();
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
    it('attaches an authorization header');

    it('calls destroy on the Backbone model prototype', function() {
      spyOn(Backbone.Model.prototype, 'destroy');
      resource.destroy();
      expect(Backbone.Model.prototype.destroy).toHaveBeenCalledWith(resource, {});
    });
  });
});