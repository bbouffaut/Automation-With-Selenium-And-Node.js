const { describe, it, after, before } = require('mocha');
const Page = require('../lib/homePageIntermarche');
const conf = require('../utils/conf');


const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function example() {
    try {
        describe ('Intermarche look for new drive slots test', async function () {
            this.timeout(conf.waitPageTimeout);
            let driver, page;

            before (async () => {
                page = new Page();
                driver = page.driver;
                await page.visit('https://www.intermarche.com/');
            });

            after (async () => {
                await page.quit();
            });

            it ('find the "Se Connecter" Button', async () => {
                const result = await page.findSeConnecterButton();
                expect(result.buttonText).to.include('connecter');
            });

        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();
