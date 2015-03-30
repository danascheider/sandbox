
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
        client.waitForVisible('#dashboard-top-widgets div[data-name=tasks]', function(err, isVisible) {
          expect(isVisible).toBe(true);
          done();
        });
      });
    });

    describe('deadline widget', function() {
      it('is visible by default', function(done) {
        client.waitForVisible('#dashboard-top-widgets div[data-name=deadlines]', function(err, isVisible) {
          expect(isVisible).toBe(true);
          done();
        });
      });
    });

    describe('appointment widget', function() {
      it('is visible by default', function(done) {
        client.waitForVisible('#dashboard-top-widgets div[data-name=appointments]', function(err, isVisible) {
          expect(isVisible).toBe(true);
          done();
        });
      });
    });

    describe('recommendation widget', function() {
      it('is visible by default', function(done) {
        client.waitForVisible('#dashboard-top-widgets div[data-name=recommendations]', function(err, isVisible) {
          expect(isVisible).toBe(true);
          done();
        });
      });
    });

    describe('changeLinkColor', function() {
      it('changes the link color to the color of the panel heading', function(done) {
        client.waitForVisible('#dashboard-top-widgets')
              .moveToObject('div[data-name=tasks]')
              .waitFor('#dashboard-top-widgets .panel-primary span')
              .getCssProperty('#dashboard-top-widgets .panel-primary span', 'color', function(err, res) {

          var values = res.map(function(val) { return val.parsed.hex; });

          expect(values).toEqual(['#428bca', '#428bca']);
          done();
        });
      });
    });
  });
});

// Items to be tested:
//   - changeLinkColor changes the link color to the heading background color
//   - changeLinkColorBack changes the link color back to gray