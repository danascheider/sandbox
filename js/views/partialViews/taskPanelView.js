Canto      = Canto || require('../../dependencies.js');
Canto.View = Canto.View || require('../appViews/cantoView.js');

var CollectionView = require('../collectionViews/taskCollectionView.js');

var TaskPanelView = Canto.View.extend({
  initialize : function(opts) {
    opts = opts || {};

    _.extend(this, opts);

    this.collectionView = new CollectionView({collection: opts.collection});
  }
});

module.exports = TaskPanelView;