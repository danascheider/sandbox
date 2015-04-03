/****************************************************************************
 *                                                                         *
 * HOMEPAGE VIEW                                                           *
 *                                                                         *
 * The homepage is the place where users who are not logged in land when   *
 * they visit the site. It is the place where they can get information     *  
 * about the product or log into their dashboard.                          *
 *                                                                         *
 * CONTENTS                                                          LINE  *
 * Requires ......................................................... 26   *
 * Suite ............................................................ 44   *
 *   Filters ........................................................ 50   *
 *   Authorization and Authentication ............................... 60   *
 *     token()                                                             *
 *   Core Functions ................................................. 69   *
 *     fetch()                                                             *
 *   Special Functions .............................................. 91   *
 *     updateAll() .................................................. 92   *
 *     isA() ....................................................... 140   *
 *                                                                         *
/****************************************************************************/

/* Core Requires
/****************************************************************************/

Canto      = Canto || require('../../dependencies.js');
Canto.View = Canto.View || require('./cantoView.js');

/****************************************************************************
 * BEGIN MODULE                                                             *
/****************************************************************************/

var HomepageView = Canto.View.extend({

  /* Backbone View Properties
  /**************************************************************************/

  template    : JST['homepage'],
  id          : 'homepage-wrapper',

  /* Canto View Properties
  /**************************************************************************/

  klass       : 'HomepageView',
  family      : 'Canto.View',
  superFamily : 'Backbone.View',
  types       : function() {
    return Canto.View.prototype.types().concat(['HomepageView', 'TopLevelView']);
  },

  /* Core View Functions
  /**************************************************************************/

  remove      : function() {
    Canto.View.prototype.remove.call(this);
  },

  render      : function() {
    Canto.View.prototype.render.call(this, this.template());
  }
});

module.exports = HomepageView;