global.document  = window.document;
global.navigator = window.navigator;

global.Canto   = {
  API      : require('./api.js'),
  Utils    : require('./utils.js')
};

global.$ = global.jQuery = require('jquery');

global._        = require('underscore');
global.Backbone = require('backbone');
Backbone.$      = $;

global.JST      = {
  'dashboard'      : _.template(require('../templates/app/dashboardTemplate.js')),
  'tasks/model'    : _.template(require('../templates/modelTemplates/taskTemplates/modelTemplate.js')),
  'tasks/listItem' : _.template(require('../templates/modelTemplates/taskTemplates/listItemTemplate.js')),
  'tasks/quickAdd' : _.template(require('../templates/modelTemplates/taskTemplates/quickAddFormTemplate.js')),
  'spec/listItem'  : _.template(require('../templates/specTemplates/taskListItemSpecTemplate.js'))
};

require('jquery.cookie');
require('../vendor/jquery-ui-1.11.4.custom/jquery-ui.min.js');

module.exports = Canto;