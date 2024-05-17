# javascript-appium-saucelabs

## Appium
### Install
If missing please install following on your machine (MacOS):

     > brew install node@(version number)
     > brew install appium@(version number)
     > brew install allure@(version number)
     > npm install @wdio/allure-reporter --save-dev
     > npm install sharp

My configuration: node(v14.21.3), npm(6.14.18), allure(2.24.1), appium(2.4.1)

### Update *.conf.js files with devices details
Example Capabilities for Android:

     {
        "platformName": "Android",
        "platformVersion": "10",
        "deviceName": "Xiaomi Redmi Note 8",
        "appPackage": "",
        "appActivity": "",
        "automationName": "UiAutomator2"
     }

### Update config.json with appropriate credentials

### Run Tests
In the main folder

     > npm run androidTests
     > npm run iosTests

If you don't want to run all test suite, then change in *.conf.js files following line e.g. specs: ['./appium/test/specs/loginTests.e2e.js'],

### Generate Allure Report

After tests are executed results should be generated in /allure-results folder. Run following command to open the report

     > allure serve
