require(process.cwd() + '/spec/support/webdriver.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var Task     = require(process.cwd() + '/js/models/taskModel.js'),
    View     = require(process.cwd() + '/js/views/modelViews/taskViews/taskListItemView.js'), 
    matchers = require('jasmine-jquery-matchers');

var task = new Task({id: 1, title: 'Troubleshoot Selenium tests'});

describe('Display Functions - Task List Item View', function() {
  beforeAll(function() {
    jasmine.addMatchers(matchers);
  });
  
  beforeEach(function(done) {
    client.init().url('http://localhost', done);
    view = new View({model: task});
    view.render();
    $('body').html(view.$el);
  });

  afterAll(function() {
    task = null;
    view = null;
  });

  it('displays the mark-complete checkbox', function(done) {
    expect(view.$('i[title="Mark complete"]')).toBeVisible();
    done();
  });
});