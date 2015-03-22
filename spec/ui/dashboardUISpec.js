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

  describe('elements', function(done) {
    it('does not display dropdowns by default #ui', function(done) {
      client.waitForVisible('#dashboard-wrapper ul.dropdown-menu', function(err, isVisible) {
        expect(isVisible).toBe(false);
        done();
      });
    });
  });
});