/* Core Requires
/*****************************************************************************************/

Canto       = Canto || require('../dependencies.js');
Canto.Model = Canto.Model || require('../models/cantoModel.js');

/* Module-Specific Requires
/*****************************************************************************************/

var HomepageView = require('../views/appViews/homepageView.js');

/*****************************************************************************************
/* APP PRESENTER                                                                         *
/*****************************************************************************************/

var AppPresenter = Canto.Model.extend({

  /* Canto Model Properties
  /***************************************************************************************/

  klass : 'AppPresenter',

  types : function() {
    return Canto.Model.prototype.types().concat(['AppPresenter', 'Presenter']);
  },

  isAn  : function(type) {
    return this.isA(type);
  },

  /* Core Model Functions
  /***************************************************************************************/

  initialize : function() {
    this.homepageView = new HomepageView();
  }
});

module.exports = AppPresenter;