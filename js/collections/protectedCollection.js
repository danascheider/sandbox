var App = require(process.cwd() + '/js/dependencies.js');
var $              = App.$;
var context        = describe; // RSpecify

var ProtectedCollection = App.Backbone.Collection.extend({
  token : function() {
    return 'Basic ' + $.cookie('auth');
  }
});

module.exports = ProtectedCollection;