var App       = require(process.cwd() + '/js/dependencies.js');
var TaskModel = require(process.cwd() + '/js/models/taskModel.js');
var Template  = require(process.cwd() + '/templates/modelTemplates/taskTemplates/modelTemplate.js');

var Backbone = App.Backbone, _ = App._, $ = Backbone.$ = App.$;

var TaskModelView = Backbone.View.extend({
  tagName      : 'div',
  className    : 'task-model',
  template     : _.template(Template),

  // --------------- //
  // Event Callbacks //
  // --------------- //

  renderOnSync : function() {
    this.render();
  },

  // ----------------- //
  // Special Functions //
  // ----------------- //

  isA          : function(type) {
    return ['TaskModelView', 'Backbone.View'].indexOf(type) > -1 ? true : false;
  },

  // ------------------- //
  // Core View Functions //
  // ------------------- //

  render       : function() {
    this.$el.html(this.template({model: this.model}));
  }
});

module.exports = TaskModelView;