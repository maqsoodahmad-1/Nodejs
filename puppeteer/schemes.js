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
        const list =[];
        const items =  document.querySelectorAll('.scheem-box')
        // const items =  document.querySelectorAll('.right-content.right-content_org')
        // console.log(items)
        // console.log(items[1]);
        //console.log(items.querySelector('h2').text);
         for ( const item of items ) {
             list.push({
             heading: item.querySelector('p').innerText,
             description: item.querySelector(':nth-child(3)').innerText,
                 //    // readmore: item.querySelector('div.abtSectionRight > ol').innerText,
             link: item.querySelector('a').href,
            // listOfCenters: item.querySelector('[title="Click to view the list of registered centers under this scheme"]').href
             })
        //     console.log(list['heading']);
        //     console.log(list['link']);

        }
        return list
    })
   console.log(data)
    schemes.deleteMany({})
    schemes.insertMany(data)
    await browser.close()
})()
}
)