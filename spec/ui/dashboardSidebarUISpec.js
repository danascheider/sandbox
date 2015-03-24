require(process.cwd() + '/spec/support/webdriver.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var context  = describe,
    fcontext = fdescribe;

describe('Dashboard Sidebar View', function() {
  beforeAll(function(done) {
    jasmine.addMatchers(require('jasmine-jquery-matchers'));
    client.init().url('http://localhost/#dashboardSidebarViewSpec');
    done();
  });

  beforeEach(function(done) {
    client.refresh();
    done();
  });

  afterAll(function(done) {
    client.end();
    done();
  });

  describe('elements', function() {
    it('does not display second-level navs by default #dashboardSidebar #ui', function(done) {
      client.waitForVisible('#side-menu > li > ul.nav-second-level', function(err, isVisible) {
        expect(isVisible).toBe(false);
        done();
      });
    });
  });

  describe('toggleSecondLevelNav', function() {
    context('when no menus are visible', function() {
      beforeEach(function(done) {
        client.waitForVisible('a[data-method=toggleSecondLevelNav]')
              .click('a[data-method=toggleSecondLevelNav]', done);
      });

      it('expands the second-level nav #dashboardSidebar #ui', function(done) {
          client.isVisible('#side-menu li:nth-child(7)', function(err, isVisible) {
                
          expect(isVisible).toBe(true);
          done();
        });
      });

      it('adds the \'active\' class to the clicked-on li #dashboardSidebar #ui', function(done) {
        client.getAttribute('#side-menu > li:nth-child(7)', 'class', function(err, klass) {
          expect(klass).toEqual('active');
          done();
        });
      });
    });

    // When the toggleSecondLevelNav method is called with a particular target li,
    // and the target li's second-level nav is currently closed, any other dropdown
    // menu that is open should be closed, and any other li with the class 'active'
    // should remove that class. Then, the target li should add the class 'active'
    // and its dropdown menu should slide down.

    // Since this tests the toggleSecondLevelNav callback and not the event wiring,
    // the test apparatus is hard-coded to have the 5th child li - the first one
    // with a second-level nav menu - as the target li.

    // The showLastNav link causes the last second-level nav menu to be displayed.
    // That menu should then be hidden when the toggleSecondLevelNav method is called.

    context('when another menu is visible', function() {
      beforeEach(function(done) {
        client.waitForVisible('a[data-method=showLastNav]')
              .click('a[data-method=showLastNav]')
              .waitForVisible('#side-menu li.active', done);
      });

      it('expands the second-level nav #dashboardSidebar #ui', function(done) {
        client.click('a[data-method=toggleSecondLevelNav]')
              .isVisible('#side-menu > li:nth-child(5) .nav-second-level', function(err, isVisible) {

          expect(isVisible).toBe(true);
          done();
        });
      });

      it('hides the other open second-level menu #dashboardSidebar #ui', function(done) {
        client.click('a[data-method=toggleSecondLevelNav]')
              .waitForVisible('//ul[@id="side-menu"]/li[last()]/ul[@class="nav-second-level"]', function(err, isVisible) {
                
          expect(isVisible).toBe(false);
          done();
        });
      });
    });  

    context('when the target\'s menu is visible', function() {
      beforeEach(function(done) {
        client.waitForVisible('a[data-method=showTargetNav]')
              .click('a[data-method=showTargetNav]')
              .waitFor('#side-menu > li:nth-child(7) .nav-second-level', 1200)
              .click('#side-menu .second-level-nav', done);
      });

      it('hides the target\'s menu #dashboardSidebar #ui', function(done) {
        client.waitForVisible('#side-menu li:nth-child(7) .nav-second-level', true, function(err, isVisible) {
          expect(isVisible).toBe(false);
          done();
        });
      });

      it('removes the \'active\' class from the li', function(done) {
        client.element('#side-menu li:nth-child(7)', function(err, res) {
          expect(res.value).not.toHaveClass('active');
          done();
        });
      });
    });
  });

  describe('showLastNav', function() {

    // Verify that the test apparatus is working as intended

    it('shows the last second-level nav #dashboardSidebar #ui', function(done) {
      client.waitForVisible('a[data-method=showLastNav]')
            .click('a[data-method=showLastNav]')
            .waitForVisible('#side-menu li.active')
            .execute(function() {

        return $('#side-menu > li').last().find('ul.nav-second-level').is(':visible');
      }, function(err, isVisible) {
        expect(isVisible.value).toBe(true);
        done();
      });
    });
  });
});