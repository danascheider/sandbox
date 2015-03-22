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
              .waitForVisible('#side-menu li.active ul.nav-second-level', function(err, isVisible) {

          expect(isVisible).toBe(true);
          done();
        });
      });
    });
  });
});