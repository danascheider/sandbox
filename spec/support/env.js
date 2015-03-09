var testEnv = {
  jsdom       : require(process.cwd() + '/spec/support/jsdom.js'),
  btoa        : function(string) {
    return new Buffer(string).toString('base64');
  }
};

module.exports = testEnv;