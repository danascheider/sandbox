Canto = Canto || require('../dependencies.js');

var Collection = require('../collections/taskCollection.js');

var UserModel = Backbone.Model.extend({
  urlRoot: Canto.API.users.collection,

  // ----------------- //
  // Special Functions //
  // ----------------- //

  protectedFetch : function(settings) {
    settings = settings || {};
    var that = this;

    settings.url = Canto.API.users.single(this.get('id'));

    settings.beforeSend = (settings.beforeSend) || function(xhr) {
      xhr.setRequestHeader('Authorization', $.cookie('auth'));
    };

    return Backbone.Model.prototype.fetch.call(this, settings);
  },

  // -------------------- //
  // Core Model Functions //
  // -------------------- //

  fetch          : function(settings) {
    settings = settings || {};

    var string = this.get('username') + ':' + this.get('password');
    var token  = 'Basic ' + new Buffer(string).toString('base64');

    settings.beforeSend = (settings.beforeSend) || function(xhr) {
      xhr.setRequestHeader('Authorization', token);
    };

    return Backbone.Model.prototype.fetch.call(this, settings);
  },

  initialize     : function(attrs, opts) {
    opts = opts || {};

    this.tasks = new Collection();

    if(this.get('id') && !(opts.sync === false)) { this.protectedFetch(); }
  }
});

module.exports = UserModel;