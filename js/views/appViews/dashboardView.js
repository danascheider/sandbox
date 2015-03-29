Canto      = Canto || require('../../dependencies.js');
Canto.View = Canto.View || require('./cantoView.js');

var UserModel = require('../../models/userModel.js');
var SidebarView = require('../partialViews/dashboardSidebarView.js');

var DashboardView = Canto.View.extend({
  id                 : 'dashboard-wrapper',
  template           : JST['dashboard'],

  events             : {
    'click'             : 'hideDropdownMenus',
    'click li.dropdown' : 'toggleDropdownMenu'
  },

  // --------------------- //
  // Canto View Properties //
  // --------------------- //

  klass              : 'DashboardView',
  family             : 'Canto.View',
  superFamily        : 'Backbone.View',

  types              : function() {
    return Canto.View.prototype.types().concat(['DashboardView', 'TopLevelView']);
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
    var that = this;
    return Canto.View.prototype.render.call(this, this.template({user: this.user}), function() {
      that.sidebarView.render();
      that.$('div.sidebar-collapse').html(that.sidebarView.$el);
    });
  }
});

module.exports = DashboardView;