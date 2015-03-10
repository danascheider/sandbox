require(process.cwd() + '/spec/support/jsdom.js');
document = window;

var App = require(process.cwd() + '/js/dependencies.js');
var Env = require(process.cwd() + '/spec/support/env.js');
var SUT = require(process.cwd() + '/js/presenters/appPresenter.js');

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var Backbone       = App.Backbone;
var $              = Backbone.$ = App.$;
var context        = describe; // RSpecify

describe('App Presenter', function() {
  var presenter;

  beforeEach(function() { presenter = new SUT(); });
  afterAll(function() { presenter = null; });

  describe('constructor', function() {
    it('initializes a homepage view', function() {
      pending('define the homepage view');
    });
  });

  describe('events', function() {
    describe('redirect:dashboard', function() {
      it('calls emitRedirect', function() {
        pending('fuller implementation of the app as a whole');
      });
    });
  });
});