require(process.cwd() + '/js/dependencies.js');

var TaskModel = require(process.cwd() + '/js/models/taskModel.js');
var ModelView = require(process.cwd() + '/js/views/modelViews/taskViews/taskModelView.js');
var Template  = require(process.cwd() + '/templates/modelTemplates/taskTemplates/listItemTemplate.js');

var ListItemView = Backbone.View.extend({
  tagName    : 'li',
  className  : 'task-list-item ui-widget-content ui-draggable',
  id         : function() { return 'task-' + this.model.get('id'); },
  template   : _.template(Template),

  // --------------- //
  // Event Callbacks //
  // --------------- //

  backlogTask: function() {
    this.model.save({backlog: true});
  },

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
  },

  render     : function() {
    this.$el.html(this.template());

    this.modelView.render();
    this.$('td.task-listing').html(this.modelView.el);
  }
});

module.exports = ListItemView;