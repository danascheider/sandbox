require(process.cwd() + '/spec/support/jsdom.js');

var App = require(process.cwd() + '/js/dependencies.js');
var Env = require(process.cwd() + '/spec/support/env.js');
var SUT = require(process.cwd() + '/js/views/modelViews/taskViews/taskListItemView.js');

var TaskModel = require(process.cwd() + '/js/models/taskModel.js');
var ModelView = require(process.cwd() + '/js/views/modelViews/taskViews/taskModelView.js');
var Backbone  = App.Backbone;
var $         = Backbone.$ = App.$;
var context   = describe; // RSpecify

describe('List Item Task View', function() {
  var view, e;

  var task = new TaskModel({title: 'Finish writing test suite', status: 'New', priority: 'Normal'});

  beforeEach(function() { view = new SUT({model: task}); });
  afterEach(function() { view.remove(); });
  afterAll(function() { view = null; });

  describe('constructor', function() {
    it('doesn\'t call render', function() {
      spyOn(SUT.prototype, 'render');
      var newView = new SUT({model: task});
      expect(SUT.prototype.render).not.toHaveBeenCalled();
    });

    it('creates a model view', function() {
      expect(view.modelView.isA('TaskModelView')).toBe(true);
    });
  });
});