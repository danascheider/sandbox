Canto      = Canto || require('../../dependencies.js');
Canto.View = Canto.View || require('../appViews/cantoView.js');

var DashboardTopWidgetView = Canto.View.extend({
  template            : JST['partials/topWidgets'],

  events              : {
    'mouseenter .dash-widget' : 'changeLinkColor',
    'mouseleave .dash-widget' : 'changeLinkColorBack',
    'click .dash-widget'      : 'followLink'
  },

  // --------------- //
  // Event Callbacks //
  // --------------- //

  changeLinkColor     : function(e) {
    //
  },

  changeLinkColorBack : function(e) {
    //
  },

  followLink          : function(e) {
    var widget = $(e.target).hasClass('dash-widget') ? $(e.target) : $(e.target).closest('.dash-widget');
    this.trigger('redirect', {destination: widget.attr('data-target')});
  },

  // ----------------- //
  // Special Functions //
  // ----------------- //

  klass               : 'DashboardTopWidgetView',
  family              : 'Canto.View',
  superFamily         : 'Backbone.View',

  types               : function() {
    return Canto.View.prototype.types().concat(['DashboardTopWidgetView', 'PartialView']);
  },

  // ------------------- //
  // Core View Functions //
  // ------------------- //

  initialize          : function(data) {
    this.data = data || {};

    // For convenience, make the data available as own properties
    // of the view.

    _.extend(this, this.data); 

    this.listenTo(this.taskCollection, 'add remove', this.render);
  },

  render              : function() {
    Canto.View.prototype.render.call(this, this.template(this.data));
  }
});

module.exports = DashboardTopWidgetView;