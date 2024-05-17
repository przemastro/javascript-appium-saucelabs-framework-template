
class CommonScreenElements {
  constructor() {
    this.platformName = browser.capabilities.platformName;
  }

  get someButton() {
    switch (this.platformName) {
        case 'iOS':
          return $("");
    }
  }
}

module.exports = new CommonScreenElements();