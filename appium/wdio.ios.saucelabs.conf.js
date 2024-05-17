
function getEnvironmentName() {
  const isCI = process.env.CI || false;
  if (isCI === "true" || isCI === true) {
    return "Gitlab CI [" + process.env.CI_PIPELINE_URL + "]";
  } else {
    return "Local Environment [" + require("os").hostname() + "]";
  }
}

function generateDynamicTestName(specFile) {
  const fileNameWithoutExtension = specFile.split('/').pop().split('.').shift();
  const capitalizedFileName = fileNameWithoutExtension.charAt(0).toUpperCase() + fileNameWithoutExtension.slice(1);
  const modifiedName = `[some project name][iOS] ${capitalizedFileName}`;
  return modifiedName;
}

function generateDynamicBuildName() {
  const modifiedName = `${getEnvironmentName()}`;
  return modifiedName;
}

exports.config = {
  beforeSession: function (config, capabilities, specs) {
    if (capabilities['sauce:options']) {
      capabilities['sauce:options'].build = generateDynamicBuildName();
      capabilities['sauce:options'].name = generateDynamicTestName(specs[0]);
    }
  },

  user: '',
  key: '',
  hostname: '',
  port: 443,
  path: '/wd/hub/',
  specs: ['./appium/test/specs/*.e2e.js'],
  maxInstances: 1,
  capabilities: [
   {
        platformName: 'iOS',
        'appium:platformVersion': '',
        //'appium:deviceName': '',
        'appium:automationName': 'XCUITest',
        'appium:app': 'storage:filename=',
        'appium:udid': '*',
        'appium:bundleId': '',
        'appium:clearAppData': true,
        'sauce:options': {
          appiumVersion: 'latest',
        },
   }
  ],
  services: [
    [
       'appium',
       {
          args: {
             relaxedSecurity: true,
             w3c: true,
          },
          command: 'appium',
       },
    ],
    [
      'sauce',
      {
        sauceConnect: true, // Set to true if you want to use Sauce Connect
      },
    ],
  ],
  logLevel: 'debug',
  bail: 0,
  baseUrl: 'http://localhost',
  waitforTimeout: 20000,
  connectionRetryTimeout: 190000,
  connectionRetryCount: 1,
  framework: 'mocha',
  reporters: [
    [
      'allure',
      {
        outputDir: 'ios/allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 160000,
  }
};
