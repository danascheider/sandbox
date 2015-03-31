/***************************************************************************
 *                                                                         *
 * DASHBOARD HOME VIEW                                                     *
 *                                                                         *
 * The DashboardHomeView is the view the user sees when they first log     *
 * into their dashboard. It contains summary information about all their   *
 * activities and obligations.                                             *
 *                                                                         *
 * CONTENTS                                                          LINE  *
 * Requires ......................................................... 28   *
 * Suite ............................................................ 36   *
 *   Filters ........................................................ 41   *
 *   Static Properties .............................................. 73   *
 *   Constructor .................................................... 89   *
 *   Elements ...................................................... 112   *
 *   Core Functions ................................................ 127   *
 *     render() .................................................... 130   *
 *     remove() ..................................................... --   *
 *   Special Functions .............................................. 91   *
 *     isA() ........................................................ 92   *
 *     setUser() ................................................... 140   *
 *                                                                         *
/****************************************************************************/

/* Core Requires
/****************************************************************************/

Canto = Canto || require('../../js/dependencies.js');
require(process.cwd() + '/spec/support/webdriver.js');
require(process.cwd() + '/spec/support/env.js');

/******************************************************************************
 * BEGIN SUITE                                                                *
/******************************************************************************/

describe('Dashboard Home View - Visual Elements #ui', function() {

  /* Filters
  /****************************************************************************/

  beforeAll(function() {
    jasmine.addMatchers(require('jasmine-jquery-matchers'));
  });

  describe('view elements', function() {
    //
  });
});