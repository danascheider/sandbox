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

  describe('el', function() {
    beforeEach(function() { view.render(); });

    it('is a div', function() {
      expect(view.$el[0].tagName).toEqual('DIV');
    });
  });

  describe('special functions', function() {
    describe('isA', function() {});
  });
});