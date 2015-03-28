Canto      = Canto || require('../../dependencies.js');
Canto.View = Canto.View || require('../appViews/cantoView.js');

var CollectionView = require('../collectionViews/taskCollectionView.js');

var TaskPanelView = Canto.View.extend({
  id         : 'task-panel',
  className  : 'panel panel-primary dash-widget',

  // --------------------- //
  // Canto View Properties // 
  // --------------------- //

  klass      : 'TaskPanelView',

  types      : function() {
    return Canto.View.prototype.types().concat(['TaskPanelView', 'TaskPanel', 'TaskView', 'PartialView']);
  },

  // ------------------- //
  // Core View Functions //
  // ------------------- //

  initialize : function(opts) {
    opts = opts || {};

    _.extend(this, opts);

    this.collectionView = new CollectionView({collection: opts.collection});
  }
});

module.exports = TaskPanelView;