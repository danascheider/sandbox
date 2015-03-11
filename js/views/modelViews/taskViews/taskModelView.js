var App       = require(process.cwd() + '/js/dependencies.js');
var TaskModel = require(process.cwd() + '/js/models/taskModel.js');

var Backbone = App.Backbone, _ = App._, $ = Backbone.$ = App.$;

var TaskModelView = Backbone.View.extend({

  // ----------------- //
  // Special Functions //
  // ----------------- //

  isA : function(type) {
    return ['TaskModelView', 'Backbone.View'].indexOf(type) > -1 ? true : false;
  }
});

module.exports = TaskModelView;