require('../../dependencies.js');

var UserModel = require('../../models/userModel.js');

var DashboardView = Backbone.View.extend({
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