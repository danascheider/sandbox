/****************************************************************************
 *                                                                         *
 * KANBAN COLUMN VIEW                                                      *
 *                                                                         *
 * The Kanban column view displays information about the user's tasks,     *
 * sorted by status. Each column has tasks of one status: In Progress,     *  
 * New, Blocking, or Backlogged. In the future, users may be able to       *
 * access their completed tasks as well.                                   *
 *                                                                         *
 * CONTENTS                                                          LINE  *
 * Core Requires .................................................... 33   *
 * Module-Specific Requires ......................................... 39   *
 * Module ........................................................... 47   *
 *   Backbone View Properties ....................................... 52   *
 *   Canto View Properties .......... ............................... 59   *
 *     klass                                                               *
 *     family                                                              *
 *     superFamily                                                         *
 *     types                                                               *
 *   Special Functions .............................................. 69   *
 *     renderTaskPanelView() ........................................ 69   *
 *     renderTopWidgetView() ........................................ 74   *
 *     setUser() .................................................... 85   *
 *   Core Functions ................................................. 97   *
 *     initialize() ................................................. 97   *
 *     remove() .................................................... 105   * 
 *     render() .................................................... 111   *
 *                                                                         *
/***************************************************************************/

/* Core Requires
/****************************************************************************/

Canto      = Canto || require('../../dependencies.js');
Canto.View = Canto.View || require('../appViews/cantoView.js');

/* Module-Specific Requires
/****************************************************************************/

var CollectionView = require('../collectionViews/taskCollectionView.js');

/****************************************************************************
 * BEGIN MODULE                                                             *
/****************************************************************************/

var KanbanColumnView = Canto.View.extend({

  /* Backbone View Properties
  /**************************************************************************/

  template    : JST['partials/kanbanCol'],

  /* Canto View Properties
  /**************************************************************************/

  klass       : 'KanbanColumnView',
  family      : 'Canto.View',
  superFamily : 'Backbone.View',

  types       : function() {
    return Canto.View.prototype.types().concat(['KanbanColumnView', 'KanbanColumn', 'PartialView']);
  },

  /* Core View Functions
  /**************************************************************************/

  initialize  : function(data) {
    this.data = data;
    this.collectionView = new CollectionView({collection: this.collection});
  },

  render      : function() {
    var that = this;

    Canto.View.prototype.render.call(this, this.template({data: that.data}), function() {
      that.collectionView.render();
      that.$('.panel-body').html(that.collectionView.$el);
    });
  }
});

module.exports = KanbanColumnView;