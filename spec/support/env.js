var testEnv = {
  btoa      : function(string) {
    return new Buffer(string).toString('base64');
  }
};

module.exports = testEnv;