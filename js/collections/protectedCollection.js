var App = require(process.cwd() + '/js/dependencies.js');
var Backbone       = App.Backbone;
var $              = App.$;
var context        = describe; // RSpecify

var ProtectedCollection = Backbone.Collection.extend({
  token : function() {
    return 'Basic ' + $.cookie('auth');
  },

  // ------------------------- //
  // Core Collection Functions //
  // ------------------------- //

  fetch : function(opts) {
    opts = opts || {};

    var that = this;

    opts.beforeSend = (opts.beforeSend) || function(xhr) {
      xhr.setRequestHeader('Authorization', that.token());
    };

    return Backbone.Collection.prototype.fetch.call(this, opts);
  }
});

module.exports = ProtectedCollection;