const { join } = require('path')

exports.config = {
 port: 4724,
 path: '/',
 runner: 'local',
 specs: ['./appium/test/specs/*.e2e.js'],
 maxInstances: 1,
 capabilities: [
   {
        platformName: 'iOS',
        'appium:platformVersion': '',
        'appium:deviceName': '',
        'appium:automationName': 'XCUITest',
        'appium:udid': '',
        'appium:bundleId': '',
        'appium:clearAppData': true,
   }
 ],
 services:
 [
   [
     'appium',
     {
       args: {
         relaxedSecurity: true
        },
       command: 'appium'
     }
   ],
 ],
 logLevel: 'debug',
 bail: 0,
 baseUrl: 'http://localhost',
 waitforTimeout: 40000,
 waitforInterval: 200,
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
