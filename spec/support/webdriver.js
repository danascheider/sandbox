global.client = (global.client) || require('webdriverjs').remote({
  desiredCapabilities : {
    browserName       : 'phantomjs',
    javascriptEnabled : true
  },
  logLevel            : 'silent'
});

client.init();