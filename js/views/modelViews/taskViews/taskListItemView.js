var App       = require(process.cwd() + '/js/dependencies.js');
var TaskModel = require(process.cwd() + '/js/models/taskModel.js');
var ModelView = require(process.cwd() + '/js/views/modelViews/taskViews/taskModelView.js');
var Template  = require(process.cwd() + '/templates/modelTemplates/taskTemplates/listItemTemplate.js');

var Backbone = App.Backbone, _ = App._, $ = Backbone.$ = App.$;

var ListItemView = Backbone.View.extend({

  // ----------------- //
  // Special Functions //
  // ----------------- //

  isA        : function(type) {
    var trueValues = ['TaskListItemView', 'ListItemView', 'Backbone.View'];
    return trueValues.indexOf(type) > -1 ? true : false;
  },

  // ------------------- //
  // Core View Functions //
  // ------------------- //

  initialize : function() {
    this.modelView = new ModelView({model: this.model});
  }
});

module.exports = ListItemView;