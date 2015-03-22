require(process.cwd() + '/spec/support/jsdom.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var SUT = require(process.cwd() + '/js/views/appViews/dashboardView.js');

var matchers       = require('jasmine-jquery-matchers'),
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest,
    UserModel      = require(process.cwd() + '/js/models/userModel.js'),
    TaskModel      = require(process.cwd() + '/js/models/taskModel.js'),
    TaskCollection = require(process.cwd() + '/js/collections/taskCollection.js'),
    context        = describe; // RSpecify

Backbone.$         = $;

var user  = new UserModel({id: 342, username: 'testuser', password: 'testuser', email: 'testuser@example.com', first_name: 'Test', last_name: 'User'});

var task1 = new TaskModel({id: 1, owner_id: 342, title: 'Test Task 1', status: 'New'}),
    task2 = new TaskModel({id: 2, owner_id: 342, title: 'Test Task 2', status: 'New'}),
    task3 = new TaskModel({id: 3, owner_id: 342, title: 'Test Task 3', status: 'Complete'});

user.tasks = new TaskCollection([task1, task2, task3]);

describe('Main Dashboard View', function() {
  var dashboard, e, spy;

  beforeEach(function() {
    jasmine.addMatchers(matchers);
    dashboard = new SUT({user: user});
  });

  afterAll(function() {
    dashboard.remove();
    dashboard = null;
  });

  describe('constructor', function() {
    it('calls setUser #travis', function() {
      pending('Need to implement the setUser method');
      spyOn(SUT.prototype, 'setUser');
      var newView = new SUT({user: user});
      expect(SUT.prototype.setUser).toHaveBeenCalled();
      expect(SUT.prototype.setUser.calls.argsFor(0)[0]).toEqual(user);
    });

    it('instantiates a sidebar #travis', function() {
      pending('Need to implement the sidebar view');
    });

    it('instantiates a home view #travis', function() {
      pending('Need to implement the dashboard home view');
    });

    it('instantiates a task view #travis', function() {
      pending('Need to implement the dashboard task view');
    });

    it('doesn\'t call render #travis', function() {
      spyOn(SUT.prototype, 'render');
      var newView = new SUT({user: user});
      expect(SUT.prototype.render).not.toHaveBeenCalled();
    });

    it('can be instantiated without a user #travis', function() {
      var newView = new SUT();
      expect(newView.user).not.toExist();
    });
  });

  describe('elements', function() {
    beforeEach(function() {
      dashboard.render();
    });

    it('is a div #travis', function() {
      expect(dashboard.$el[0].tagName).toEqual('DIV');
    });

    it('has ID #dashboard-wrapper #travis', function() {
      expect(dashboard.$el).toHaveId('dashboard-wrapper');
    });
  });
});