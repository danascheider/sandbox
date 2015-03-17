global.jsdom = require(process.cwd() + '/spec/support/jsdom.js');
global.btoa  = function(string) {
  return new Buffer(string).toString('base64');
};

require('jasmine-tagged');
var jasmineEnv = jasmine.getEnv();
jasmineEnv.setIncludedTags(['travis']);
jasmineEnv.includeSpecsWithoutTags(false);