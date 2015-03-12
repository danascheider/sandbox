require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var SUT = require(process.cwd() + '/js/presenters/appPresenter.js');

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
Backbone.$         = $;
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