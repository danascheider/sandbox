require(process.cwd() + '/spec/support/jsdom.js');

var App = require(process.cwd() + '/js/dependencies.js');
var Env = require(process.cwd() + '/spec/support/env.js');
var SUT = require(process.cwd() + '/js/views/modelViews/taskViews/taskModelView.js');

var TaskModel = require(process.cwd() + '/js/models/taskModel.js');
var UserModel = require(process.cwd() + '/js/models/userModel.js');
var Backbone  = App.Backbone;
var $         = Backbone.$ = App.$;
var context   = describe; // RSpecify

describe('Task Model View', function() {
  var view;

  var user = new UserModel({
    id: 342, 
    username   : 'testuser', 
    password   : 'testuser',
    email      : 'testuser@example.com',
    first_name : 'Test',
    last_name  : 'User'
  });

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
      return name === 'userID' ? user.get('id') : Env.btoa(user.get('username') + ':' + user.get('password'));
    });

    view = new SUT({model: task});
  });

  afterAll(function() {
    view = null;
  });

  describe('constructor', function() {
    it('assigns the model', function() {
      expect(view.model).toBe(task);
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

    // it('displays the task\'s description', function() {
    //   view.$('table.task-details').html().should.include("Test Canto's front-end functionality");
    // });

    // it('does not display blank fields', function() {
    //   task.unset('deadline');
    //   view.render();
    //   view.$('tr.task-deadline-row').length.should.equal(0);
    //   task.set('deadline', new Date(2015, 8, 28));
    // });
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
});