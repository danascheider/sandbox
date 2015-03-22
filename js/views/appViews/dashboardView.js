require('../../dependencies.js');

var UserModel = require('../../models/userModel.js');
var SidebarView = require('../partialViews/dashboardSidebarView.js');

var DashboardView = Backbone.View.extend({
  id                 : 'dashboard-wrapper',
  template           : JST['dashboard'],

  events             : {
    'click'             : 'hideDropdownMenus',
    'click li.dropdown' : 'toggleDropdownMenu'
  },

  // --------------- //
  // Event Callbacks //
  // --------------- //

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
    this.$el.html(this.template({user: this.user}));
    this.delegateEvents();

    this.sidebarView.render();
    this.$('div.sidebar-collapse').html(this.sidebarView.el);

    return this;
  }
});

module.exports = DashboardView;