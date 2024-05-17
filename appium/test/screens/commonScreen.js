const commonScreenElements = require('../elements/commonScreenElements');
const loginScreenElements = require('../elements/loginScreenElements');
const AppiumHelper = require('../utils/appiumHelper');

const config = require('../../config.json');
const email = config.email;
const password = config.password;

function isSauceConnectEnabled(config) {
  return config.services.some(
    (service) => Array.isArray(service) && service[0] === 'sauce' && service[1]?.sauceConnect === true
  );
}

class CommonScreen extends AppiumHelper {
  constructor() {
    super(); // Call the constructor of the parent class (AppiumHelper)
  }

  async clickButton(elementLocator) {
    await browser.pause(500)
    const element = await elementLocator;
    await element.waitForDisplayed();
    element.click();
  }

  async enterValue(elementLocator, value) {
    await browser.pause(500)
    const element = await elementLocator;
    await element.waitForDisplayed();
    element.setValue(value);
  }

  async verifyElementExists(elementLocator) {
    await browser.pause(500)
    const element = await elementLocator;
    element.waitForDisplayed();
  }

  async verifyElementNotExists(elementLocator) {
    await browser.pause(2000);
    try {
      const element = await elementLocator;
      element.waitForDisplayed({ timeout: 5000, reverse: true });
      console.error("Element is unexpectedly displayed");
    } catch (error) {
      console.log("Element is not displayed");
    }
  }

  async verifyElementVisibility(elementLocator, maxAttempts = 20, interval = 500) {
    await browser.pause(2000)
    let attempts = 0;
    while (attempts < maxAttempts) {
      const element = await elementLocator;
      const isDisplayed = element.isDisplayed();
      if (isDisplayed) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, interval));
      attempts++;
    }
    throw new Error("Element did not become visible within the expected time");
  }


  async verifyElementDoesNotExist(elementLocator) {
    const element = await elementLocator;
    element.waitForDisplayed({ reverse: true });
  }
}

module.exports = CommonScreen;
