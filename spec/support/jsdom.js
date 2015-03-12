var jsdom = require('jsdom');

document = jsdom.jsdom('<html><head><meta charset="utf8"></head><body></body></html>');

window   = document.defaultView;

var $ = jQuery = window.$ = window.jQuery = require('jquery');