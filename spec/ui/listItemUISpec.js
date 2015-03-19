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
    client.init();
  });

  beforeEach(function(done) {
    client.url('http://localhost/#listItemViewSpec', done);
  });

  afterAll(function(done) {
    client.end();
    done();
    task = null;
    view = null;
  });

  describe('view elements', function() {
    it('displays the mark-complete checkbox', function(done) {
      client.waitForVisible('li#task-1 i[title="Mark complete"]', function(err, isVisible) {
        expect(isVisible).toBe(true);
        done();
      });
    });

    it('displays the task model', function(done) {
      client.waitForVisible('li#task-1 div.task-model', function(err, isVisible) {
        expect(isVisible).toBe(true);
        done();
      });
    });

    it('doesn\'t display the edit icon by default', function(done) {
      client.waitForVisible('li#task-1 i[title=Edit]', function(err, isVisible) {
        expect(isVisible).toBe(false);
        done();
      });
    });

    it('doesn\'t display the delete icon by default', function(done) {
      client.waitForVisible('li#task-1 i[title=Delete]', function(err, isVisible) {
        expect(isVisible).toBe(false);
        done();
      });
    });

    it('doesn\'t display the backlog icon by default', function(done) {
      client.waitForVisible('li#task-1 i[title=Backlog]', function(err, isVisible) {
        expect(isVisible).toBe(false);
        done();
      });
    })
  });
});