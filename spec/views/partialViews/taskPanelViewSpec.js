require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

// The fixtures file defines a user, three tasks, and a task collection.
// Using _.extend enables us to treat them as imported variables instead
// of having to use the Fixtures namespace.

var SUT = require(process.cwd() + '/js/views/partialViews/taskPanelView.js');

var Fixtures       = require(process.cwd() + '/spec/support/fixtures/fixtures.js'),
    matchers       = _.extend(require('jasmine-jquery-matchers'), require(process.cwd() + '/spec/support/matchers/toBeA')),
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
    context        = describe,
    fcontext       = fdescribe;

fdescribe('Task Panel View', function() {

  // Declare variables to be used in the tests
  var taskPanel, opts, e;

  beforeAll(function() {
    _.extend(global, Fixtures);

    opts = {
      collection : collection,
      grouping   : {
        backlog : false
      }
    };
  });

  beforeEach(function() {

    // Add Jasmine jQuery matchers and the custom toBeA matcher
    jasmine.addMatchers(matchers);

    // Create an instance of the SUT
    taskPanel = new SUT(opts);
  });

  afterEach(function() {
    taskPanel.remove();
    taskPanel.unbind();
    restoreFixtures();
  });

  afterAll(function() {
    taskPanel = null;

    // Scrub up the pollution
    global = _.omit(global, Fixtures);
  });

  describe('constructor', function() {
    it('doesn\'t call render #travis', function() {
      spyOn(SUT.prototype, 'render');
      var newPanel = new SUT(opts);
      expect(SUT.prototype.render).not.toHaveBeenCalled();
    });

    it('sets a collection #travis', function() {
      expect(taskPanel.collection).toBe(collection);
    });

    it('instantiates a collection view #travis', function() {

      // For some reason, when I worded this with the toBeA('TaskCollectionView')
      // matcher, it passed even when the thing did not exist. That's why I'm 
      // using the stupid matcher.
      
      expect(taskPanel.collectionView).toExist();
    });
  });
});