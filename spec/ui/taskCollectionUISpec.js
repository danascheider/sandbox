require(process.cwd() + '/js/dependencies.js');

require(process.cwd() + '/spec/support/webdriver.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var matchers = require('jasmine-jquery-matchers'),
    context  = describe,
    fcontext = fdescribe;

describe('Task Collection View Elements', function() {
  beforeAll(function() {
    client.init().url('http://localhost/#taskCollectionViewSpec');
  });

  beforeEach(function(done) {
    client.refresh(done);
  });

  afterAll(function(done) {
    client.end(done);
  });

  it('displays its quick-add form', function(done) {
    client.waitForVisible('#view .quick-add-form', function(err, isVisible) {
      expect(isVisible).toBe(true);
      done();
    });
  });
});