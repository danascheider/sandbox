var App = require(process.cwd() + '/js/dependencies.js');
var Backbone       = App.Backbone;
var $              = App.$;
var context        = describe; // RSpecify

var ProtectedCollection = Backbone.Collection.extend({
  token     : function() {
    return 'Basic ' + $.cookie('auth');
  },

  // ----------------- //
  // Special Functions //
  // ----------------- //

  isA       : function(type) {
    return ['Backbone.Collection', 'ProtectedCollection'].indexOf(type) > -1 ? true : false;
  },

  updateAll : function(opts) {
    opts         = opts || {};

    var that          = this;
    var callback      = opts.success;
    var changedModels = this.filter(function(model) {
      return model.hasChanged();
    });
    var toSync        = new Backbone.Collection(changedModels, {url: opts.url});

    opts.url        = opts.url || this.url;
    opts.beforeSend = (opts.beforeSend) || function(xhr) {
      xhr.setRequestHeader('Authorization', that.token());
    };
    opts.success    = function(obj, response, xhr) {
      if(callback) { callback.call(obj, response, xhr); }
      that.trigger('collectionSynced');
    }

    Backbone.sync('update', toSync, opts);
  },

  // ------------------------- //
  // Core Collection Functions //
  // ------------------------- //

  fetch     : function(opts) {
    opts = opts || {};

    var that = this;

    opts.beforeSend = (opts.beforeSend) || function(xhr) {
      xhr.setRequestHeader('Authorization', that.token());
    };

    return Backbone.Collection.prototype.fetch.call(this, opts);
  }
});

module.exports = ProtectedCollection;