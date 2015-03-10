var App = require(process.cwd() + '/js/dependencies.js');

var Backbone = App.Backbone, _ = App._, $ = App.$;

var TaskModel = Backbone.Model.extend({
  urlRoot : function() {
    return App.API.tasks.collection($.cookie('userID'));
  },

  url     : function() {
    return App.API.tasks.single(this.get('id'));
  },

  validate: function(attrs) {
    if (!attrs.title) {
      return 'Title is required';
    }
  }
});

module.exports = TaskModel;