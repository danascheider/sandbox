var _ = require('underscore');

var JST = {
  'dashboard'        : _.template(require('./topLevelTemplates/dashboardTemplate.js')),
  'partials/sidebar' : _.template(require('./partialTemplates/dashboardSidebarTemplate.js')),
  'tasks/model'      : _.template(require('./modelTemplates/taskTemplates/modelTemplate.js')),
  'tasks/listItem'   : _.template(require('./modelTemplates/taskTemplates/listItemTemplate.js')),
  'tasks/quickAdd'   : _.template(require('./modelTemplates/taskTemplates/quickAddFormTemplate.js')),
  'spec/listItem'    : _.template(require('./specTemplates/taskListItemSpecTemplate.js')),
  'spec/dashboard'   : _.template(require('./specTemplates/dashboardSpecTemplate.js'))
};

module.exports = JST;