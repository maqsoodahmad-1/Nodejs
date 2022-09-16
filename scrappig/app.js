require('dotenv').config();
const puppeteer = require('puppeteer');
const mongo = require('mongodb').MongoClient
const url = process.env.uri;
let db, jobs;
mongo.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,   
    },
   (err, client) => {
    if(err){
        console.error(err)
        return
    }

    db = client.db("Phones")
    jobs = db.collection('secondHandPhones')
   //scrapping code 
;( async () => {
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36")
    await page.goto('https://www.olx.in/delhi_g4058659/mobiles_c1411')

    /*Run javascript inside the page */
    const data = await page.evaluate(() => {
        const list = []
        const items = document.querySelectorAll('.EIR5N')
        for ( const item of items ) {
            list.push({
                itemPrice:item.querySelector('a > div > span._89yzn')[0].innerText,
                itemTitle:item.querySelector('a > div > span._2tW1I')[0].innerText,
                itemLocation:item.querySelector('a > div > div._1KOFM > span.tjgMj')[0].innerText,
                postedOn:item.querySelector('a > div > div._1KOFM > span.zLvFQ > span')[0].innerText
            })
        }
        return list
    })
    console.log(data)
    jobs.deleteMany({}) 
    jobs.insertMany(data)
    await browser.close()
})()
}
)