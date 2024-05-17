
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
  const modifiedName = `[some project name][Android] ${capitalizedFileName}`;
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
      platformName: 'Android',
      'appium:platformVersion': '',
      //'appium:deviceName': '',
      'appium:app': 'storage:filename=',
      'appium:appPackage': '',
      'appium:appActivity': '',
      'appium:automationName': 'UiAutomator2',
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
        sauceConnect: true
      },
    ],
  ],
  logLevel: 'debug',
  bail: 0,
  baseUrl: 'http://localhost',
  waitforTimeout: 20000,
  waitforInterval: 500,
  connectionRetryTimeout: 900000,
  connectionRetryCount: 1,
  framework: 'mocha',
  reporters: [
    [
      'allure',
      {
        outputDir: 'android/allure-results',
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
