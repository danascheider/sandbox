global.jsdom = require(process.cwd() + '/spec/support/jsdom.js');
global.btoa  = function(string) {
  return new Buffer(string).toString('base64');
};