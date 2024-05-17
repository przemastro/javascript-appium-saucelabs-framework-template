
const fs = require('fs');
const util = require('util');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');
const sharp = require('sharp');

class AppiumHelper {
  constructor() {
    this.platformName = browser.capabilities.platformName;
    this.baseUrl = browser.capabilities.baseUrl;
    this.screenshotsPath = './appium/screenshots/';
    this.appPackage = browser.capabilities.appPackage;
    this.appActivity = browser.capabilities.appActivity;
    this.bundleId = browser.capabilities.bundleId;
  }

  async sleep(milliseconds) {
    return sleep(milliseconds);
  }

  async minimizeApp() {
    switch (this.platformName) {
      case 'Android':
        await browser.pressKeyCode(4);
        break;
      case 'iOS':
        await browser.terminateApp(this.bundleId);
        break;
    }
  }

  async maximizeApp() {
    switch (this.platformName) {
      case 'Android':
        await browser.startActivity(
          this.appPackage,
          this.appActivity,
        );
        break;
      case 'iOS':
        await driver.executeScript('mobile: launchApp', [{ bundleId: this.bundleId }]);
        break;
    }
  }

  async scrollToElement(elementLocator, maxAttempts = 30) {
    let attempts = 0;
    const windowSize = await browser.getWindowSize();
    const viewportHeight = windowSize.height;
    var duration;
    var startYaxis = viewportHeight / 2
    var destinationYaxis = 50;

      switch (this.platformName) {
        case 'Android':
          duration = 1500
          break;
        case 'iOS':
          duration = 500
          break;
      }

    while (attempts < maxAttempts) {

      const element = await elementLocator;
      const isVisible = await element.isDisplayed();

      if (isVisible) {
        console.log('Element is visible!');
        this.centerElementOnTheScreen(element);
        await browser.pause(4000);
        return;
      }

      await browser.performActions([
        {
          type: 'pointer',
          id: 'finger1',
          parameters: { pointerType: 'touch' },
          actions: [
            { type: 'pointerMove', duration: 0, x: 300, y: startYaxis },
            { type: 'pointerDown', button: 0 },
            { type: 'pointerMove', duration: duration, x: 300, y: destinationYaxis },
            { type: 'pointerUp', button: 0 },
          ],
        },
      ]);

      attempts++;
    }
  }


  async swipeLeft(elementLocator, numIterations) {
    const element = await elementLocator;

    const location = await element.getLocation();
    const size = await element.getSize();

    const startX = location.x + size.width - 10;
    const startY = location.y + size.height / 2;
    const endX = location.x + 10;
    const endY = location.y + size.height / 2;

    for (let i = 0; i < numIterations; i++) {

      console.log("Iteration:", i);

      await browser.performActions([
        {
          type: 'pointer',
          id: 'finger1',
          parameters: { pointerType: 'touch' },
          actions: [
            { type: 'pointerMove', duration: 0, x: startX, y: startY },
            { type: 'pointerDown', button: 0 },
            { type: 'pointerMove', duration: 500, x: endX, y: endY },
            { type: 'pointerUp', button: 0 },
          ],
        },
      ]);

      if (i < numIterations - 1) {
        await browser.pause(2000);
      }
    }
  }

  async swipeLeftAndClick(elementLocator, numIterations) {
    const element = await elementLocator;

    const location = await element.getLocation();
    const size = await element.getSize();

    const startX = location.x + size.width - 10;
    const startY = location.y + size.height / 2;
    const endX = location.x + 10;
    const endY = location.y + size.height / 2;

    for (let i = 0; i < numIterations; i++) {

      console.log("Iteration:", i);

      await browser.performActions([
        {
          type: 'pointer',
          id: 'finger1',
          parameters: { pointerType: 'touch' },
          actions: [
            { type: 'pointerMove', duration: 0, x: startX, y: startY },
            { type: 'pointerDown', button: 0 },
            { type: 'pointerMove', duration: 500, x: endX, y: endY },
            { type: 'pointerUp', button: 0 },
          ],
        },
      ]);

      if (i < numIterations - 1) {
        await browser.pause(2000);
      }
    }

    await browser.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: startX, y: startY },
          { type: 'pointerDown', button: 0 },
          { type: 'pointerMove', duration: 500, x: startX, y: startY },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);
  }

  async centerElementOnTheScreen(elementLocator) {

    const location = await elementLocator.getLocation();
    const size = await elementLocator.getSize();
    const centerY = location.y + size.height / 2;

    const windowSize = await browser.getWindowSize();
    const viewportHeight = windowSize.height;
    const viewportWidth = windowSize.width;

    let scrollOffsetY = centerY - viewportHeight / 2;

    await browser.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: viewportWidth / 2, y: viewportHeight / 2 },
          { type: 'pointerDown', button: 0 },
          { type: 'pointerMove', duration: 2000, x: viewportWidth / 2, y: (viewportHeight / 2) - scrollOffsetY },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);
  }

  async doubleClickElementUsingCoordinates(x_coordinate, y_coordinate) {
    await browser.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: startX, y: startY },
          { type: 'pointerDown', button: 0 },
          { type: 'pointerMove', duration: 500, x: startX, y: startY },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);

    await browser.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: startX, y: startY },
          { type: 'pointerDown', button: 0 },
          { type: 'pointerMove', duration: 500, x: startX, y: startY },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);
  }

  async getElementLocation(elementLocator) {
    const element = await $(elementLocator);

    const location = await element.getLocation();
    const size = await element.getSize();
    console.log(location)
    console.log(size)
  }

  async takeScreenshots(screenName1, screenName2, delay) {
    if (arguments.length === 3) {
        await browser.saveScreenshot(this.screenshotsPath + screenName1);
        await browser.pause(delay);
        await browser.saveScreenshot(this.screenshotsPath + screenName2);
    } else {
        console.error('Invalid number of arguments');
    }
  }

  async takeScreenshot(screenName, elementLocator) {
    if (arguments.length === 1) {
        await browser.saveScreenshot(this.screenshotsPath + screenName);
        await this.waitForFileToExist(this.screenshotsPath + screenName);
        await this.resizeScreenshot(screenName, "temp.png", 200, 300);
    } else if (arguments.length === 2) {
        const element = await elementLocator;
        element.saveScreenshot(this.screenshotsPath + screenName);
        await this.waitForFileToExist(this.screenshotsPath + screenName);
        await this.resizeScreenshot(screenName, "temp.png", 200, 300);
    } else {
        console.error('Invalid number of arguments');
    }
  }

  async resizeScreenshot(screenName, screenName2, width, height) {
    await sharp(this.screenshotsPath + screenName).resize(width, height).toFile(this.screenshotsPath + screenName2);
    await fs.promises.unlink(this.screenshotsPath + screenName);
    await fs.promises.rename(this.screenshotsPath + screenName2, this.screenshotsPath + screenName);
  }

  async compareScreenshots(screenName1, screenName2, sign, thresholdValue1, thresholdValue2 = 0) {
    const img1 = PNG.sync.read(fs.readFileSync(this.screenshotsPath + screenName1));
    const img2 = PNG.sync.read(fs.readFileSync(this.screenshotsPath + screenName2));
    console.log(this.screenshotsPath + screenName1);
    console.log(this.screenshotsPath + screenName2);
    const { width, height } = img1;
    const diff = new PNG({ width, height });

    const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

    fs.writeFileSync(this.screenshotsPath + 'diff.png', PNG.sync.write(diff));
    console.log("differences: ", numDiffPixels);

    switch (sign) {
      case 'moreThan':
        if (numDiffPixels < thresholdValue1) {
          console.log('Image comparison failed: Too little differences.');
        } else {
          console.log('Image comparison passed: Acceptable differences.');
        }
        expect(numDiffPixels).toBeGreaterThanOrEqual(thresholdValue1);
        break;
      case 'lessThan':
        if (numDiffPixels > thresholdValue1) {
          console.log('Image comparison failed: Too many differences.');
        } else {
          console.log('Image comparison passed: Acceptable differences.');
        }
        expect(numDiffPixels).toBeLessThan(thresholdValue1);
        break;
      case 'between':
        if (numDiffPixels > thresholdValue2 || numDiffPixels < thresholdValue) {
          console.log('Image comparison failed: Outside the acceptable range.');
        } else {
          console.log('Image comparison passed: Acceptable differences.');
        }
        expect(numDiffPixels).toBeGreaterThanOrEqual(thresholdValue1);
        expect(numDiffPixels).toBeLessThanOrEqual(thresholdValue2);
        break;
    }
  }

  async waitForFileToExist(filePath, timeout = 10000, interval = 500) {
    const startTime = Date.now();

    return new Promise(async (resolve, reject) => {
      const checkFile = async () => {
        if (fs.existsSync(filePath)) {
          resolve();
        } else if (Date.now() - startTime >= timeout) {
          reject(new Error(`File not found within the specified timeout: ${filePath}`));
        } else {
          setTimeout(checkFile, interval);
        }
      };

      checkFile();
    });
  }

  async clickElementUsingElementLocator(elementLocator) {
    const element = await elementLocator;
    const elementLocation = await element.getLocation();
    await browser.performActions([
      {
        type: 'pointer',
        id: 'pointer1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: elementLocation.x+2, y: elementLocation.y+2 },
          { type: 'pointerDown', button: 0 },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);
  }

  async clickElementUsingCoordinates(x_coordinate, y_coordinate) {
    await browser.performActions([
      {
        type: 'pointer',
        id: 'pointer1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: x_coordinate, y: y_coordinate },
          { type: 'pointerDown', button: 0 },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);
  }

}

module.exports = AppiumHelper;
