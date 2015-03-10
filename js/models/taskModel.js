var App = require(process.cwd() + '/js/dependencies.js');
var ProtectedResource = require(process.cwd() + '/js/models/protectedResourceModel');

var Backbone = App.Backbone, _ = App._, $ = App.$;

var TaskModel = ProtectedResource.extend({
  urlRoot : function() {
    return App.API.tasks.collection($.cookie('userID'));
  },

  url     : function() {
    return App.API.tasks.single(this.get('id'));
  },

  // ----------------- //
  // Special Functions //
  // ----------------- //

  complete     : function() {
    return this.get('status') === 'Complete';
  },

  displayTitle : function() {
    return this.escape('title');
  },

  incomplete   : function() {
    return this.get('status') != 'Complete';
  },

  // -------------------- //
  // Core Model Functions //
  // -------------------- //

  fetch      : function(opts) {
    opts = opts || {};
    opts.url = opts.url || this.url();
    return ProtectedResource.prototype.fetch.call(this, opts);
  },

  initialize : function() {
    // FIX: This should do something to handle validation errors
  },

  save       : function(attrs, opts) {
    attrs = attrs || this.attributes;
    opts  = opts || {};

    opts.url = this.isNew() ? this.urlRoot() : this.url();

    return ProtectedResource.prototype.save.call(this, attrs, opts);
  },

  validate   : function(attrs) {
    if (!attrs.title) {
      return 'Title is required';
    }
  }
});

module.exports = TaskModel;