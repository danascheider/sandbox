// NOTE: The following callbacks are tested partially or completely
//       in the listItemUISpec.js file:
//       - hideEditForm
//       - showEditForm
//       - hideEditIcons
//       - showEditIcons
//       - markComplete
//       - toggleTaskDetails
//       - render

require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var SUT = require(process.cwd() + '/js/views/modelViews/taskViews/taskListItemView.js');

var matchers  = require('jasmine-jquery-matchers');
var TaskModel = require(process.cwd() + '/js/models/taskModel.js');
var ModelView = require(process.cwd() + '/js/views/modelViews/taskViews/taskModelView.js');
Backbone.$    = $;
var context   = describe; // RSpecify

// FIX: Need to give serious consideration to testing styles. If styles are not
//      the responsibility of the view, they should not be tested by the view
//      spec. If they are the responsibility of the view, they should be defined
//      in the view. 

describe('#travis List Item Task View', function() {
  var view, e;

  var task = new TaskModel({title: 'Finish writing test suite', status: 'New', priority: 'Normal'});

  beforeEach(function() { 
    jasmine.addMatchers(matchers);
    view = new SUT({model: task}); 
  });

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
      expect(view.$el).toHaveTag('li');
    });

    it('has class .task-list-item', function() {
      expect(view.$el).toHaveClass('task-list-item');
    });
  });

  describe('elements', function() {
    beforeEach(function() { view.render(); });

    it('has a mark-complete checkbox', function() {
      expect(view.$('i[title="Mark complete"]')).toExist();
    });

    it('doesn\'t display its edit form by default', function() {
      pending('Need to implement the edit form view');
    });

    describe('draggable functionality', function() {
      it('has class ui-widget-content', function() {
        expect(view.$el).toHaveClass('ui-widget-content');
      });

      it('has class .ui-draggable', function() {
        expect(view.$el).toHaveClass('ui-draggable');
      });
    });

    describe('edit icon', function() {
      it('is present', function() {
        expect(view.$('i[title="Edit"]')).toExist();
      });
    });

    describe('delete icon', function() {
      it('is present', function() {
        expect(view.$('i[title="Delete"]')).toExist();
      });
    });

    describe('backlog icon', function() {
      it('is present', function() {
        expect(view.$('i[title="Backlog"]')).toExist();
      });
    });
  });

  describe('events', function() {
    //
  });

  describe('event callbacks', function() {
    describe('backlogTask', function() {
      beforeEach(function() {

        // It is necessary to stub both $.ajax and task.save, because otherwise
        // the program waits for the server to respond, which, of course, it won't.

        spyOn($, 'ajax');
        spyOn(task, 'save').and.callThrough();
        view.backlogTask();
      });

      afterEach(function() { task.unset('backlog'); });

      it('changes the task\'s backlog status to true', function() {
        expect(task.get('backlog')).toBe(true);
      });

      it('saves the task', function() {
        expect(task.save).toHaveBeenCalled();
      });
    });

    describe('deleteTask', function() {
      it('destroys the task', function() {
        spyOn(task, 'destroy');
        view.deleteTask();
        expect(task.destroy).toHaveBeenCalled();
      });
    });

    describe('hideEditForm', function() {
      it('removes the edit form from the DOM', function() {
        pending('Define the edit form view');
        spyOn(view.editForm, 'remove');
        view.hideEditForm();
        expect(view.editForm.remove).toHaveBeenCalled();
      });
    });

    describe('markComplete', function() {
      it('marks the task complete and saves', function() {
        spyOn(task, 'save');
        view.markComplete();
        expect(task.save.calls.argsFor(0)[0]).toEqual({status: 'Complete'});
      });
    });
  });

  describe('special functions', function() {
    describe('changePosition', function() {
      it('removes inline styles', function() {
        view.changePosition();
        expect(view.$el.attr('style')).not.toExist();
      });

      it('renders the view', function() {
        spyOn(view, 'render');
        view.changePosition();
        expect(view.render).toHaveBeenCalled();
      });
    });

    describe('configureDraggable', function() {
      beforeEach(function() {
        spyOn(view.$el, 'draggable');
        view.configureDraggable();
      });

      it('makes the view draggable', function() {
        expect(view.$el.draggable).toHaveBeenCalled();
      });

      it('confines the view to its parent list', function() {
        expect(view.$el.draggable.calls.argsFor(0)[0].containment).toEqual('parent');
      });

      it('connects to the sortable task list', function() {
        expect(view.$el.draggable.calls.argsFor(0)[0].connectToSortable).toEqual('.task-list');
      });
    });

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

  describe('core view functions', function() {
    describe('render', function() {
      it('sets the HTML of its element', function() {
        spyOn(view.$el, 'html');
        view.render();
        expect(view.$el.html).toHaveBeenCalled();
      });

      it('returns itself', function() {
        expect(view.render()).toBe(view);
      });

      it('configures the draggable property', function() {
        spyOn(view, 'configureDraggable', function() {
          view.render();
          expect(view.configureDraggable).toHaveBeenCalled();
        });
      });

      it('delegates events', function() {
        spyOn(view, 'delegateEvents');
        view.render();
        expect(view.delegateEvents).toHaveBeenCalled();
      });

      it('renders the model view', function() {
        spyOn(view.modelView, 'render');
        view.render();
        expect(view.modelView.render).toHaveBeenCalled();
      });
    });
  });
});