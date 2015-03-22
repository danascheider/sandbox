require('../../dependencies.js');

var UserModel = require('../../models/userModel.js');

var DashboardView = Backbone.View.extend({
  id                 : 'dashboard-wrapper',
  template           : JST['dashboard'],

  // --------------- //
  // Event Callbacks //
  // --------------- //

  hideDropdownMenus  : function(e) {
    this.$('li.dropdown').removeClass('open');
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

  // ------------------- //
  // Core View Functions //
  // ------------------- //

  initialize         : function(opts) {
    opts = opts || {};
    this.setUser(opts.user);
  },

  render             : function() {
    this.$el.html(this.template({user: this.user}));
    this.delegateEvents();
  }
});

module.exports = DashboardView;