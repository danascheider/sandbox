Canto      = Canto || require('../../../dependencies.js');
Canto.View = Canto.View || require('../appViews/cantoView.js');

var DashboardTopWidgetView = Canto.View.extend({
  template   : JST['partials/topWidgets'],

  // ------------------- //
  // Core View Functions //
  // ------------------- //

  initialize : function(data) {
    this.data = data || {};

    // For convenience, make the data available as own properties
    // of the view.
    _.extend(this.data); 
  },

  render     : function() {
    this.$el.html(this.template(this.data));
  }
});

module.exports = DashboardTopWidgetView;