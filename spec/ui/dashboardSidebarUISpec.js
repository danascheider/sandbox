require(process.cwd() + '/spec/support/webdriver.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var context = describe;

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
    it('does not display second-level navs by default #ui', function(done) {
      client.waitForVisible('#side-menu ul.nav-second-level', function(err, isVisible) {
        expect(isVisible).toBe(false);
        done();
      });
    });
  });

  describe('toggleSecondLevelNav', function() {
    context('when no menus are visible', function() {
 
      it('expands the second-level nav #ui', function(done) {
        client.waitForVisible('a[data-method=toggleSecondLevelNav]')
              .click('a[data-method=toggleSecondLevelNav]')
              .waitForVisible('#side-menu li.active')
              .execute(function() {

          return $('#side-menu a[href=#]').first().closest('li').find('ul.nav-second-level').is(':visible');
        }, function(err, isVisible) {
          expect(isVisible.value).toBe(true);
          done();
        });
      });
    });

    context('when another menu is visible', function() {
      it('expands the second-level nav #ui', function(done) {
        client.waitForVisible('a[data-method=showLastNav]')
              .click('a[data-method=showLastNav]')
              .waitForVisible('#side-menu li.active')
              .click('a[data-method=toggleSecondLevelNav]')
              .execute(function() {

          return $('#side-menu > li').has('a[href=#]').first().find('ul.nav-second-level').is(':visible');
        }, function(err, isVisible) {
          expect(isVisible.value).toBe(true);
          done();
        });
      });

      it('hides the other open second-level menu #ui #current', function(done) {
        client.waitForVisible('a[data-method=showLastNav]')
              .click('a[data-method=showLastNav]')
              .waitForVisible('#side-menu > li.active')
              .click('a[data-method=toggleSecondLevelNav]')
              .waitForVisible('//ul[@id="side-menu"]/li[last()]/ul[@class="nav-second-level"]', function(err, isVisible) {
                
          expect(isVisible).toBe(false);
          done();
        });
      });
    });  
  });

  describe('showLastNav', function() {

    // Verify that the test apparatus is working as intended

    it('shows the last second-level nav #ui', function(done) {
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