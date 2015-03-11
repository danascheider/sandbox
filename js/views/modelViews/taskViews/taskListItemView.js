var App       = require(process.cwd() + '/js/dependencies.js');
var TaskModel = require(process.cwd() + '/js/models/taskModel.js');
var ModelView = require(process.cwd() + '/js/views/modelViews/taskViews/taskListItemView.js');
var Template  = require(process.cwd() + '/templates/modelTemplates/taskTemplates/listItemTemplate.js');

var Backbone = App.Backbone, _ = App._, $ = Backbone.$ = App.$;

var ListItemView = Backbone.View.extend({
  //
});

module.exports = ListItemView;