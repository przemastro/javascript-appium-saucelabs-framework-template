
class LoginScreenElements {
  constructor() {
    this.platformName = browser.capabilities.platformName;
  }

  get loginButton() {
    switch (this.platformName) {
      case 'Android':
        return $("");
      case 'iOS':
        return $("");
    }
  }
}

module.exports = new LoginScreenElements();