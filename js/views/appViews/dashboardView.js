/***************************************************************************
 *                                                                         *
 * TOP-LEVEL DASHBOARD VIEW                                                *
 *                                                                         *
 * The dashboard is the user's main view from which they manage            *
 * everything. The dashboard displays summary information about their      *
 * affairs and links to all their other pages.                             *
 *                                                                         *
 * CONTENTS                                                          LINE  *
 * Core Requires .................................................... 33   *
 * Module-Specific Requires ......................................... 39   *
 * Module ........................................................... 47   *
 *   Backbone View Properties ....................................... 52   *
 *   Canto View Properties .......... ............................... 59   *
 *     klass                                                               *
 *     family                                                              *
 *     superFamily                                                         *
 *     types                                                               *
 *   View Events .................................................... --   *
 *   Event Callbacks ................................................ --   *
 *     hideDropdownMenus() .......................................... --   *
 *     toggleDropdownMenu() ......................................... --   *
 *   Special Functions .............................................. 69   *
 *     setUser() .................................................... 69   *
 *     showHomeView() ............................................... 74   *
 *     showTaskView() ............................................... 85   *
 *   Core Functions ................................................. 97   *
 *     initialize() ................................................. 97   *
 *     remove() .................................................... 105   *
 *     render() .................................................... 111   *
 *                                                                         *
/***************************************************************************/

/* Core Requires
/****************************************************************************/

Canto      = Canto || require('../../dependencies.js');
Canto.View = Canto.View || require('./cantoView.js');

/* Module-Specific Requires
/****************************************************************************/

var UserModel = require('../../models/userModel.js');
var SidebarView = require('../partialViews/dashboardSidebarView.js');

/****************************************************************************
 * BEGIN MODULE                                                             *
/****************************************************************************/

var DashboardView = Canto.View.extend({

  /* Backbone View Properties
  /**************************************************************************/

  id                 : 'dashboard-wrapper',
  template           : JST['dashboard'],

  /* Canto View Properties   
  /**************************************************************************/

  klass              : 'DashboardView',
  family             : 'Canto.View',
  superFamily        : 'Backbone.View',

  types              : function() {
    return Canto.View.prototype.types().concat(['DashboardView', 'TopLevelView']);
  },

  /* View Events                  
  /**************************************************************************/

  events             : {
    'click'             : 'hideDropdownMenus',
    'click li.dropdown' : 'toggleDropdownMenu'
  },

  /* Event Callbacks
  /**************************************************************************/

  hideDropdownMenus  : function(e) {
    var li = this.$('li.dropdown');
    if(!li.is(e.target) && !li.has(e.target).length) { li.removeClass('open'); }
  },

  toggleDropdownMenu : function(e) {
    var li = $(e.target).closest('li.dropdown');
    li.siblings().removeClass('open');
    li.toggleClass('open');
  },

  // ----------------- //
  // Special Functions //
  // ----------------- //

  setUser            : function(user) {
    this.user = user;
  },

  showHomeView       : function() {
    if(!this.$el.is(':visible')) { this.render(); }
  },

  showTaskView       : function() {
    if(!this.$el.is(':visible')) { this.render(); }
  },

  // ------------------- //
  // Core View Functions //
  // ------------------- //

  initialize         : function(opts) {
    opts = opts || {};
    this.setUser(opts.user);

    this.sidebarView = new SidebarView();
  },

  remove             : function() {
    this.sidebarView.remove();
    Backbone.View.prototype.remove.call(this);
  },

  render             : function() {
    var that = this;
    return Canto.View.prototype.render.call(this, this.template({user: this.user}), function() {
      that.sidebarView.render();
      that.$('div.sidebar-collapse').html(that.sidebarView.$el);
    });
  }
});

module.exports = DashboardView;