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
    var tasks = collection.models.filter(function(task) {
      return task.get('status') !== 'Blocking' && !task.get('backlog');
    });

    var slice = tasks.slice(0, 10);
    return slice;
  },

  hideWidget       : function() {
    this.$('span.pull-right').removeClass('hide-widget').addClass('show-widget');
    this.$('i.fa-minus').removeClass('fa-minus').addClass('fa-plus');
  },

  removeBacklogged : function() {
    var that = this;
    var backlogged = this.collection.where({backlog: true});
   _.each(backlogged, function(task) { that.collection.remove(task); });
  },

  showWidget       : function() {
    this.$('span.pull-right').first().removeClass('show-widget').addClass('hide-widget');
    this.$('i.fa-plus').removeClass('fa-plus').addClass('fa-minus');
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

    this.$el.sortable({
      items : '>*:not(.not-sortable)'
    })

    return this;
  }
});

module.exports = TaskPanelView;