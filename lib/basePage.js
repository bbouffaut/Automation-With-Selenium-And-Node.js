require('chromedriver');
const {Builder, By, until, Capabilities} = require('selenium-webdriver');
const conf = require('../utils/conf');

const capabilities = Capabilities.chrome();
let user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36'
//setting chrome options to start the browser fully maximized
let chromeOptions = {
  'user-agent': user_agent,
  'args': ['--test-type', '--start-maximized', "--lang=en", "disable-infobars"]
}
capabilities.set('chromeOptions', chromeOptions);

var Page = function() {
    this.driver =  new Builder()
    .forBrowser('chrome')
    .withCapabilities(capabilities)
    .usingServer('http://localhost:4444/wd/hub')
    .build();

    // visit a webpage
    this.visit = async function(theUrl) {
        return await this.driver.get(theUrl);
    };

    // quit current session
    this.quit = async function() {
        return await this.driver.quit();
    };

    // wait and find a specific element with it's id
    this.findById = async function(id) {
        await this.driver.wait(until.elementLocated(By.id(id)), conf.waitElementTimeout, 'Looking for element');
        return await this.driver.findElement(By.id(id));
    };

    // wait and find a specific element with it's name
    this.findByName = async function(name) {
        await this.driver.wait(until.elementLocated(By.name(name)), conf.waitElementTimeout, 'Looking for element');
        return await this.driver.findElement(By.name(name));
    };

    // wait and find a specific element with it's name
    this.findByClassName = async function(name) {
        await this.driver.wait(until.elementLocated(By.className(name)), conf.waitElementTimeout, 'Looking for element');
        return await this.driver.findElement(By.className(name));
    };

    // fill input web elements
    this.write = async function (el, txt) {
        return await el.sendKeys(txt);
    };
};

module.exports = Page;
