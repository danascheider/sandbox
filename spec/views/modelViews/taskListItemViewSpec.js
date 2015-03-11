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

    it('creates an edit form', function() {
      pending('Need to implement the edit form view');
    });
  });

  describe('el', function() {
    beforeEach(function() { view.render(); });

    it('is an li', function() {
      expect(view.$el[0].tagName).toEqual('LI');
    });

    it('has class .task-list-item', function() {
      expect(view.$el[0].className).toEqual(jasmine.stringMatching('task-list-item'));
    });
  });

  describe('elements', function() {
    beforeEach(function() { view.render(); });

    it('has a mark-complete checkbox', function() {
      expect(view.$('i[title="Mark complete"]').length).toEqual(1);
    });
  });

  describe('special functions', function() {
    describe('isA', function() {
      it('returns true with arg \'TaskListItemView\'', function() {
        expect(view.isA('TaskListItemView')).toBe(true);
      });

      it('returns true with arg \'ListItemView\'', function() {
        expect(view.isA('ListItemView')).toBe(true);
      });

      it('returns true with arg \'Backbone.View\'', function() {
        expect(view.isA('Backbone.View')).toBe(true);
      });

      it('returns false with other arg', function() {
        expect(view.isA('Backbone.Router')).toBe(false);
      });
    });
  });
});