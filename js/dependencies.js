global.document  = window.document;
global.navigator = window.navigator;

global.Canto   = {
  API      : require('./api.js')
};

global.$ = global.jQuery = require('jquery');

global._        = require('underscore');
global.Backbone = require('backbone');
Backbone.$      = $;

global.JST      = {
  'tasks/model'    : _.template(require('../templates/modelTemplates/taskTemplates/modelTemplate.js')),
  'tasks/listItem' : _.template(require('../templates/modelTemplates/taskTemplates/listItemTemplate.js')),
};

require('jquery.cookie');
require('../vendor/jquery-ui-1.11.4.custom/jquery-ui.min.js');

module.exports = Canto;