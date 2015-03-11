require(process.cwd() + '/spec/support/jsdom.js');

var App = require(process.cwd() + '/js/dependencies.js');
var Env = require(process.cwd() + '/spec/support/env.js');
var SUT = require(process.cwd() + '/js/views/modelViews/taskViews/taskModelView.js');

var TaskModel = require(process.cwd() + '/js/models/taskModel.js');
var Backbone  = App.Backbone;
var $         = Backbone.$ = App.$;
var context   = describe; // RSpecify

describe('Task Model View', function() {
  var view;

  var task = new TaskModel({
    title        : 'My Task 1', 
    status       : 'New',
    priority     : 'Low',
    deadline     : new Date(2015, 08, 28),
    description  : "Test Canto's front-end functionality",
    owner_id     : 342,
    task_list_id : 14,
    position     : 1
  });

  beforeEach(function() {
    spyOn($, 'cookie').and.callFake(function(name) {
      return name === 'userID' ? 342 : Env.btoa('testuser:testuser');
    });

    view = new SUT({model: task});
  });

  afterAll(function() {
    view.remove();
    view = null;
  });

  describe('constructor', function() {
    it('assigns the model', function() {
      expect(view.model).toBe(task);
    });

    it('does not call render', function() {
      spyOn(SUT.prototype, 'render');
      var newView = new SUT({model: task});
      expect(SUT.prototype.render).not.toHaveBeenCalled();
    });
  });

  describe('el', function() {
    beforeEach(function() { view.render(); });

    it('is a div', function() {
      expect(view.$el[0].tagName).toEqual('DIV');
    });

    it('has class .task-model', function() {
      expect(view.$el[0].className).toEqual(jasmine.stringMatching('task-model'));
    });
  });

  describe('events', function() {
    describe('save model', function() {
      it('calls renderOnSync', function() {
        spyOn(SUT.prototype, 'renderOnSync');
        var newView = new SUT({model: task});
        task.trigger('sync');
        expect(SUT.prototype.renderOnSync).toHaveBeenCalled();
      });
    });
  });

  describe('view elements', function() {
    beforeEach(function() { view.render(); });

    it('displays the task\'s title', function() {
      expect(view.$('a.task-title').html()).toEqual('My Task 1');
    });

    it('displays the task\'s deadline', function() {
      expect(view.$('table.task-details').html()).toEqual(jasmine.stringMatching('Monday, September 28, 2015'));
    });

    it('displays the task\'s priority', function() {
      expect(view.$('table.task-details').html()).toEqual(jasmine.stringMatching('Low'));
    });

    it('displays the task\'s status', function() {
      expect(view.$('table.task-details').html()).toEqual(jasmine.stringMatching('New'));
    });

    it('displays the task\'s description', function() {
      expect(view.$('table.task-details').html()).toEqual(jasmine.stringMatching("Test Canto's front-end functionality"));
    });

    it('does not display blank fields', function() {
      task.unset('deadline');
      view.render();
      expect(view.$('tr.task-deadline-row').length).toEqual(0);
      task.set('deadline', new Date(2015, 8, 28));
    });
  });

  describe('special functions', function() {
    describe('isA', function() {
      it('returns true with arg \'TaskModelView\'', function() {
        expect(view.isA('TaskModelView')).toBe(true);
      });

      it('returns true with arg \'Backbone.View\'', function() {
        expect(view.isA('Backbone.View')).toBe(true);
      });

      it('returns false with another string', function() {
        expect(view.isA('TaskCollection')).toBe(false);
      });
    });
  });

  describe('event callbacks', function() {
    describe('renderOnSync', function() {
      beforeEach(function() { spyOn(view, 'render'); });

      context('when not marked complete', function() {
        it('calls the render function', function() {
          view.renderOnSync();
          expect(view.render).toHaveBeenCalled();
        });
      });

      context('when marked complete', function() {
        it('doesn\'t call render', function() {
          task.set('status', 'Complete');
          view.renderOnSync();
          expect(view.render).not.toHaveBeenCalled();
          task.set('status', 'New');
        });
      });
    });
  });

  describe('core functions', function() {
    describe('render', function() {
      it('returns the view', function() {
        expect(view.render()).toEqual(view);
      });

      it('sets the HTML of the view\'s el', function() {
        spyOn(view.$el, 'html');
        view.render();

        // Expect view.$el.html() to be called with 1 argument - i.e.,
        // as a setter; jQuery.prototype.html() is a getter when called
        // without arguments
        
        expect(view.$el.html.calls.mostRecent().args.length).toEqual(1);
      });
    });
  });
});