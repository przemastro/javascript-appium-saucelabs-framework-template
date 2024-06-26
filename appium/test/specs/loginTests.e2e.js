const loginScreen = require('../screens/loginScreen');
const loginScreenElements = require('../elements/loginScreenElements');
const commonScreen = require('../screens/commonScreen');
const commonScreenElements = require('../elements/commonScreenElements');

const LoginScreen = new loginScreen();
const CommonScreen = new commonScreen();

describe('Login to the app', () => {
  it('user should be able to navigate via [Login] button', async () => {
    await LoginScreen.clickButton(loginScreenElements.loginButton);
  });
  it('user should be able to validate login screen', async () => {
    await LoginScreen.takeScreenshot("loginScreen_actual.png", loginScreenElements.loginScreenScreenshot)
    await LoginScreen.compareScreenshots("../expected/"+platformName+"/loginScreen_expected.png", "loginScreen_actual.png", "lessThan", 2000)
  });
  after(async function () {
    await CommonScreen.minimizeApp();
  });
});
