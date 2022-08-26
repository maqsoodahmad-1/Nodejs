const puppeteer = require('puppeteer');
const mongo = require('mongodb').MongoClient
const url = "mongodb+srv://maqsodahmad:sihuri@cluster0.04z4jnr.mongodb.net/?retryWrites=true&w=majority/NewSchemes"
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
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage();
    await page.goto('http://www.nhfdc.nic.in/schemes', { waitUntil:'load', timeout:0})

    /*Run javascript inside the page */
    const data = await page.evaluate(() => {
        const list = []
        const items = document.querySelectorAll('#textContent > table > tbody > tr > td:nth-child(2) > a:nth-child(1)')
        for ( const item of items ) {
            list.push({
                heading: item.innerText,
                description: item.href,
                SchemeType:'N.A',
                source:'www.nhfdc.nic.in',
                link: 'http://www.nhfdc.nic.in/schemes'
            })
        }
        return list
    })
    console.log(data)
    schemes.deleteMany({"source":"www.nhfdc.nic.in"})
    schemes.insertMany(data)
    await browser.close()
})()
}
)