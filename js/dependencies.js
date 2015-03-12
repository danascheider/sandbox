require('jquery.cookie');
var templatePath = process.cwd() + '/templates';

global.Canto   = {
  API      : require(process.cwd() + '/js/api.js'),
  template : function(filename) {
    return _.template(require(process.cwd() + '/templates' + filename));
  }
};

global.$        = require('jquery');
global._        = require('underscore');
global.Backbone = require('backbone');

global.JST      = {
  'tasks/model'    : Canto.template('/modelTemplates/taskTemplates/modelTemplate.js'),
  'tasks/listItem' : Canto.template('/modelTemplates/taskTemplates/listItemTemplate.js')
};