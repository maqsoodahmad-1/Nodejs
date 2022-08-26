const puppeteer = require('puppeteer');
const mongo = require('mongodb').MongoClient
const url = "mongodb+srv://maqsodahmad:sihuri@cluster0.04z4jnr.mongodb.net/?retryWrites=true&w=majority"
let db, schemes;
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

    db = client.db("Schemes")
    schemes = db.collection('Schemes')
   //scrapping code 
;( async () => {
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage();
    await page.goto('https://disabilityaffairs.gov.in/content/')

    /*Run javascript inside the page */
    const data = await page.evaluate(() => {
        const list = []
        const items = document.querySelectorAll('#scroll_news > span:nth-child(2) > h4 > img')
        for ( const item of items ) {
            list.push({
                  link: item.src ,
                // link:item.querySelector('a').href
                // description: item.href,
                // link: 'http://www.nhfdc.nic.in/schemes'
            })
        }
        return list
    })
    console.log(data)
    // schemes.deleteMany({})
    // schemes.insertMany(data)
    await browser.close()
})()
}
)