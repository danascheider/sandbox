require('jquery.cookie');

global.$        = require('jquery');
global._        = require('underscore');
global.Backbone = require('backbone');
global.Canto    = {};

Canto.API = require(process.cwd() + '/js/api.js');