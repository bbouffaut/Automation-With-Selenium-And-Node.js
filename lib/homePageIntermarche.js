let Page = require('./basePage');
const locator = require('../utils/locator');
const fake = require('../utils/fakeData');
const conf = require('../utils/conf');

const seConnecterButtonClassName = locator.seConnecterButtonClassName;

const fakeNameKeyword = fake.nameKeyword;

let seConnecterButton;

Page.prototype.findSeConnecterButton = async function () {
    seConnecterButton = await this.findByClassName(seConnecterButtonClassName);

    const result = await this.driver.wait(async function () {
        const searchButtonText = await seConnecterButton.getText();

        return {
            buttonText: searchButtonText
        }
    }, conf.waitComponentsTimeout);
    return result;
};

module.exports = Page;
