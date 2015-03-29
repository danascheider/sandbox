Canto      = Canto || require('../../../dependencies.js');
Canto.View = Canto.View || require('../appViews/cantoView.js');

var DashboardTopWidgetView = Canto.View.extend({
  initialize : function(data) {
    data = data || {};
    _.extend(this, data);
  }
});

module.exports = DashboardTopWidgetView;