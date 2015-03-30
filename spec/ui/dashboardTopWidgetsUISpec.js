
/* Core Requires
/*************************************************************************/

require(process.cwd() + '/spec/support/webdriver.js');
require(process.cwd() + '/js/dependencies.js');
require(process.cwd() + '/spec/support/env.js');

var matchers = require('jasmine-jquery-matchers'),
    context  = describe,
    fcontext = fdescribe;

/****************************************************************************
 *                                                                          *
 * BEGIN SUITE                                                              *
 *                                                                          *  
/****************************************************************************/

describe('Dashboard Top Widgets View #ui', function() {

  /* Filters
  /***********************************************************************/

  beforeAll(function(done) {
    client.init().url('http://localhost/#dashboardTopWidgetViewSpec', done);
  });

  beforeEach(function(done) {
    client.refresh();
    done();
  });

  afterAll(function() {
    client.end();
  });

  describe('view elements', function() {
    describe('task widget', function() {
      it('is visible by default', function(done) {
        client.waitForVisible('#view div[data-name=tasks]', function(err, isVisible) {
          expect(isVisible).toBe(true);
          done();
        });
      });
    });
  });
});

// Items to be tested:
//   - task widget is visible by default
//   - deadline widget is visible by default
//   - appointment widget is visible by default
//   - recommendation widget is visible by default
//   - changeLinkColor changes the link color to the heading background color
//   - changeLinkColorBack changes the link color back to gray