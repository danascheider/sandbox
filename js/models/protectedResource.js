var App = require(process.cwd() + '/js/dependencies.js');

var Backbone = App.Backbone, _ = App._, $ = App.$;

var ProtectedResource = Backbone.Model.extend({
  token   : function() {
    return 'Basic ' + $.cookie('auth');
  },

  destroy : function(opts) {
    opts = opts || {};
    var that = this;
    return Backbone.Model.prototype.destroy.call(that, opts);
  }
});

module.exports = ProtectedResource;