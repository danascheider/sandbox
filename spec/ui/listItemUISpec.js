require(process.cwd() + '/spec/support/webdriver.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var matchers = require('jasmine-jquery-matchers'),
    context  = describe;

describe('Display Functions - Task List Item View', function() {
  beforeAll(function(done) {
    jasmine.addMatchers(matchers);
    client.init().url('http://localhost/#listItemViewSpec', done);
  });

  beforeEach(function(done) {
    client.refresh(done);
  });

  afterAll(function(done) {
    client.end();
    done();
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
    });
  });

  describe('callbacks', function() {
    describe('hideEditForm', function() {
      context('when the edit form is not visible', function() {
        it('doesn\'t toggle the form', function() {
          pending('Define the edit form view');
        });
      });

      context('when the edit form is visible', function() {
        it('hides the form', function() {
          pending('Define the edit form view');
        });
      });
    });

    describe('showEditIcons', function(done) {
      it('shows the edit icon', function(done) {
        client.waitForVisible('#triggers a')
              .click('#triggers a[data-method=showEditIcons]')
              .waitForVisible('li#task-1 i[title=Edit]', function(err, isVisible) {

          expect(isVisible).toBe(true);
          done();
        });
      });

      it('shows the backlog icon', function(done) {
        client.waitForVisible('#triggers a')
              .click('#triggers a[data-method=showEditIcons]')
              .waitForVisible('li#task-1 i[title=Backlog]', function(err, isVisible) {

          expect(isVisible).toBe(true);
          done();
        });
      });

      it('shows the delete icon', function(done) {
        client.waitForVisible('#triggers')
              .click('#triggers a[data-method=showEditIcons]')
              .waitForVisible('li#task-1 i[title=Delete]', function(err, isVisible) {

          expect(isVisible).toBe(true);
          done();
        });
      });
    });
  });
});