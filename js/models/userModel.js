var App = require(process.cwd() + '/js/dependencies.js');

var Backbone = App.Backbone, _ = App._, $ = App.$;

var UserModel = Backbone.Model.extend({
  urlRoot: App.API.users.collection,

  // ----------------- //
  // Special Functions //
  // ----------------- //

  protectedFetch : function() {
    //
  },

  // -------------------- //
  // Core Model Functions //
  // -------------------- //

  initialize     : function(attrs, opts) {
    opts = opts || {};
    
    if(this.get('id') && !(opts.sync === false)) { this.protectedFetch(); }
  }
});

module.exports = UserModel;