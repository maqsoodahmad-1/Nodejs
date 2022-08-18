const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.npmjs.com/package/puppeteer',{
        waitUntil: 'networkidle2',
    });
    await page.pdf({path:'exm.pdf', format: 'a4'});

    await browser.close();
})();