require(process.cwd() + '/spec/support/webdriver.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var context = describe;

describe('Dashboard View', function() {
  beforeAll(function(done) {
    jasmine.addMatchers(require('jasmine-jquery-matchers'));
    client.init().url('http://localhost/#dashboardViewSpec', done);
  });

  beforeEach(function(done) {
    client.refresh(done);
  });

  afterAll(function(done) {
    client.end();
    done();
  });

  describe('elements', function() {
    it('does not display dropdowns by default #ui', function(done) {
      client.waitForVisible('#dashboard-wrapper ul.dropdown-menu', function(err, isVisible) {
        expect(isVisible).toBe(false);
        done();
      });
    });
  });

  describe('event callbacks', function() {
    describe('hideDropdownMenus', function() {
      context('when no dropdown menus are visible', function() {
        it('doesn\'t display the menus #current', function(done) {
          client.waitForVisible('a[data-method=hideDropdownMenus]')
                .click('a[data-method=hideDropdownMenus]')
                .waitForVisible('#dashboard-wrapper ul.dropdown-menu', function(err, isVisible) {

            expect(isVisible).toBe(false);
            done();
          });
        });
      });
    });
  });
});