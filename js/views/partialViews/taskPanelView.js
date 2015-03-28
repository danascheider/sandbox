Canto      = Canto || require('../../dependencies.js');
Canto.View = Canto.View || require('../appViews/cantoView.js');

var CollectionView = require('../collectionViews/taskCollectionView.js');

var TaskPanelView = Canto.View.extend({
  id               : 'task-panel',
  className        : 'panel panel-primary dash-widget',
  template         : JST['partials/taskPanel'],

  // --------------------- //
  // Canto View Properties // 
  // --------------------- //

  klass            : 'TaskPanelView',

  types            : function() {
    return Canto.View.prototype.types().concat(['TaskPanelView', 'TaskPanel', 'TaskView', 'PartialView']);
  },

  // --------------- //
  // Event Callbacks //
  // --------------- //

  crossOffComplete : function() {
    var that = this;

    var complete = this.collection.where({status: 'Complete'});
    _.each(complete, function(task) {
      that.collectionView.crossOff(task);
    });
  },

  filterCollection : function(collection) {
    return collection.models.slice(0, 10);
  },

  // ------------------- //
  // Core View Functions //
  // ------------------- //

  initialize       : function(opts) {
    opts = opts || {};

    _.extend(this, opts);

    this.collectionView = new CollectionView({collection: opts.collection});
  },

  render           : function() {
    this.$el.html(this.template());
    this.delegateEvents();

    this.collectionView.render();
    this.$('.panel-body').html(this.collectionView.$el);

    return this;
  }
});

module.exports = TaskPanelView;