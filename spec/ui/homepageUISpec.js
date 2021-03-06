/***************************************************************************
 *                                                                         *
 * HOMEPAGE VIEW - VISUAL ELEMENTS                                         *
 *                                                                         *
 * The homepage is the place where users who are not logged in land when   *
 * they visit the site. It is the place where they can get information     *  
 * about the product or log into their dashboard.                          *
 *                                                                         *
 * CONTENTS                                                          LINE  *
 * Requires ......................................................... 20   *
 * Suite ............................................................ 28   *
 *   Filters ........................................................ 33   *
 *   Elements ....................................................... 47   *
 *                                                                         *
/***************************************************************************/

/* Core Requires
/****************************************************************************/

Canto = Canto || require('../../js/dependencies.js');
require(process.cwd() + '/spec/support/webdriver.js');
require(process.cwd() + '/spec/support/env.js');

/******************************************************************************
 * BEGIN SUITE                                                                *
/******************************************************************************/

describe('Homepage View - Visual Elements #ui', function() {

  /* Filters
  /****************************************************************************/

  beforeAll(function() {
    jasmine.addMatchers(require('jasmine-jquery-matchers'));
    client.init().url('http://localhost/#homepageViewSpec');
  });

  beforeEach(function() {
    client.refresh();
  });

  afterAll(function(done) {
    client.end();
    done();
  });

  /* View Elements
  /****************************************************************************/

  describe('view elements', function() {
    it('displays its top nav', function(done) {
      client.waitForVisible('#navbar-top', function(err, isVisible) {
        expect(isVisible).toBe(true);
        done();
      });
    });

    it('displays a link to log in', function(done) {
      client.waitForVisible('#navbar-top .login-link', function(err, isVisible) {
        expect(isVisible).toBe(true);
        done();
      });
    });

    it('displays a registration form', function(done) {
      client.waitForVisible('form#registration-form', function(err, isVisible) {
        expect(isVisible).toBe(true);
        done();
      });
    });

    it('displays a features section', function(done) {
      client.waitForVisible('#view section#features', function(err, isVisible) {
        expect(isVisible).toBe(true);
        done();
      });
    });

    it('displays contact information', function(done) {
      client.waitForVisible('#view #contact-us', function(err, isVisible) {
        expect(isVisible).toBe(true);
        done();
      });
    });

    describe('login form', function() {
      it('is hidden by default', function(done) {
        pending('Need to implement the login form view');
        client.waitForVisible('#login-form', true, function(err, isVisible) {
          expect(isVisible).toBe(false);
          done();
        });
      });
    });
  });
});