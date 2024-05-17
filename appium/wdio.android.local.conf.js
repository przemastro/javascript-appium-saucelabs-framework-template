exports.config = {
 port: 4724,
 path: '/',
 runner: 'local',
 specs: ['./appium/test/specs/*.e2e.js'],
 maxInstances: 1,
 capabilities: [
   {
      platformName: 'Android',
      'appium:platformVersion': '',
      'appium:deviceName': '',
      'appium:appPackage': '',
      'appium:appActivity': '',
      'appium:automationName': 'UiAutomator2'
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
    ]
 ],
 logLevel: 'debug',
 bail: 0,
 baseUrl: 'http://localhost',
 waitforTimeout: 40000,
 waitforInterval: 5000,
 connectionRetryTimeout: 90000,
 connectionRetryCount: 1,
 framework: 'mocha',
 reporters: [
   [
     'allure',
     {
       outputDir: 'allure-results',
       disableWebdriverStepsReporting: true,
       disableWebdriverScreenshotsReporting: false
     }
   ]
 ],
 mochaOpts: {
   ui: 'bdd',
   timeout: 500000
 }
}
