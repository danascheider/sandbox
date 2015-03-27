Canto      = Canto || require('../../dependencies.js');
Canto.View = Canto.View || require('../appViews/cantoView.js');

var QuickAddForm = require('../modelViews/taskViews/quickAddFormView.js');
var ListItemView = require('../modelViews/taskViews/taskListItemView.js');

var TaskCollectionView = Canto.View.extend({
  tagName              : 'ul',
  className            : 'task-list',
  template             : JST['collections/task'],

  // --------------------- //
  // Canto View Properties //
  // --------------------- //

  klass                : 'TaskCollectionView',
  family               : 'Canto.View',
  superFamily          : 'Backbone.View',

  types                : function() {
    return Canto.View.prototype.types().concat(['TaskCollectionView', 'TaskView']);
  },

  // --------------- //
  // Event Callbacks //
  // --------------- //

  removeBacklog        : function() {
    var backlog = this.collection.where({backlog: 'true'});
    this.collection.remove(backlog);
  },

  // ----------------- //
  // Special Functions //
  // ----------------- //

  removeChildViews     : function() {
    _.each(this.childViews, function(view) {
      view.remove();
      view.unbind();
    });
  },

  renderCollection     : function() {
    var that = this;

    this.collection.each(function(task) {
      var view = that.retrieveViewForModel(task) || new ListItemView({model: task});

      if (that.childViews.indexOf(view) <= -1) {
        that.childViews.push(view);
      }

      view.render();
      that.$el.append(view.$el);
    });
  },

  retrieveViewForModel : function(model) {
    if(!this.childViews.length) { return null; }

    var view = _.filter(this.childViews, function(view) {
      return view.model === model;
    });

    return view[0];
  },

  // ------------------- //
  // Core View Functions //
  // ------------------- //

  initialize          : function(opts) {
    opts = opts || {};

    this.grouping     = opts.grouping;
    this.childViews   = [];
    this.quickAddForm = new QuickAddForm({collection: this.collection, grouping: this.grouping});
  },

  render              : function() {
    var view, that = this;

    this.$el.html(this.template());
    this.quickAddForm.render();
    this.$('li.quick-add-form').html(this.quickAddForm.$el);

    this.renderCollection();

    this.delegateEvents();

    return this;
  }
});

module.exports = TaskCollectionView;