window = require('jsdom').jsdom('<html><head></head><body></body></html').defaultView;
window.$ = window.jQuery = $ = jQuery = require('jquery');