require(process.cwd() + '/spec/support/webdriver.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var matchers = require('jasmine-jquery-matchers'),
    context  = describe;

describe('#ui Task List Item View', function() {
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

    it('doesn\'t display the task details by default', function(done) {
      client.waitForVisible('li#task-1 .task-details', function(err, isVisible) {
        expect(isVisible).toBe(false);
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

    describe('hideEditIcons', function() {
      beforeEach(function() {
        client.waitForVisible('#triggers a')
              .click('#triggers a[data-method=showEditIcons]')
              .waitForVisible('span.edit-task');
      });

      it('hides the edit icon', function(done) {
        client.click('#triggers a[data-method=hideEditIcons]')
              .waitForVisible('li#task-1 i[title=Edit]', function(err, isVisible) {
          
          expect(isVisible).toBe(false);
          done();
        });
      });
    });

    describe('markComplete', function() {
      beforeEach(function() {
        client.waitForVisible('#triggers a')
              .click('#triggers a[data-method=markComplete]')
      });

      it('checks the checkbox', function(done) {
        client.waitForVisible('i.fa-check-square-o', function(err, isVisible) {
          expect(isVisible).toBe(true);
          done();
        });
      });

      it('doesn\'t show the unchecked checkbox icon', function(done) {
        client.waitFor('i.fa-check-square-o')
              .getAttribute('i.fa-check-square-o', 'class', function(err, res) {

          expect('i.fa-check-square-o').not.toHaveClass('fa-square-o');
          done();
        });
      });
    });

    describe('showEditIcons', function() {
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

    describe('toggleTaskDetails', function() {
      context('when the details are hidden', function() {
        it('shows the details', function(done) {
          client.waitForVisible('#triggers a')
                .click('#triggers a[data-method=toggleTaskDetails]')
                .waitForVisible('.task-details', function(err, isVisible) {

            expect(isVisible).toBe(true);
            done();
          });
        });
      });

      context('when the details are visible', function() {
        it('hides the details', function(done) {
          client.waitForVisible('#triggers a')
                .click('#triggers a[data-method=toggleTaskDetails]')
                .waitFor('.task-details')
                .click('#triggers a[data-method=toggleTaskDetails]')
                .waitFor('.task-details', function(err, res) {

            expect($('li#task-1 .task-details')).not.toBeVisible();
            done();
          });
        });
      });
    });
  });
});