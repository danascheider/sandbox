require('../../dependencies.js');

var UserModel = require('../../models/userModel.js');

var DashboardView = Backbone.View.extend({
  id         : 'dashboard-wrapper',
  setUser    : function() {},

  // ------------------- //
  // Core View Functions //
  // ------------------- //
  initialize : function(opts) {
    opts = opts || {};
    this.setUser(opts.user);
  }
});

module.exports = DashboardView;