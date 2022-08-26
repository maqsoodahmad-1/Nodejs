const puppeteer = require('puppeteer');
const mongo = require('mongodb').MongoClient
const url = "mongodb://localhost:27017"
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
    await page.goto('https://thenationaltrust.gov.in/content/innerpage/schemes.php')

    /*Run javascript inside the page */
    const data = await page.evaluate(() => {
        // const list =[];
        const items =  document.querySelectorAll('.about')
        //  for ( const item of items ) {
        //      list.push({
        //      heading: item.querySelector('#medicalCamp > thead > tr > th:nth-child(1)').innerText,
        // //      description: item.querySelector(':nth-child(3)').innerText,
        // //      link: item.querySelector('a').href,
        // //      //    // readmore: item.querySelector('div.abtSectionRight > ol').innerText,
        // //     // listOfCenters: item.querySelector('[title="Click to view the list of registered centers under this scheme"]').href
        //      })
        //     console.log(list['heading']);
        //     console.log(list['link']);

        // }
        return items
    })
   console.log(data)
    // schemes.deleteMany({})
    // schemes.insertMany(data)
    await browser.close()
})()
}
)