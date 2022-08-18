const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.npmjs.com/package/puppeteer');
    await page.screenshot({path: 'example.png'});

    await browser.close();
}) ();