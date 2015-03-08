var App = require(process.cwd() + '/js/dependencies.js');
var Env = require(process.cwd() + '/spec/env.js');

var $      = App.$;
var expect = Env.Chai.expect;

var SUT = require(process.cwd() + '/js/models/protectedResource.js');

describe('Protected Resource', function() {
  var resource;
  var sandbox = Env.Sinon.sandbox.create();

  before(function() {
    resource = new SUT();
    sandbox.stub($, 'cookie').withArgs('auth').returns(Env.btoa('testuser:testuser'));
  });

  after(function() {
    resource = null;
  });

  describe('token()', function() {
    it('returns the auth header value for the logged-in user', function() {
      var string = 'Basic ' + Env.btoa('testuser:testuser');
      expect(resource.token()).to.equal(string);
    });
  });
});