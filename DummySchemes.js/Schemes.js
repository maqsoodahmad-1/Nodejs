const mongo = require('mongodb').MongoClient
const express = require('express');
const app = express();
const url = "mongodb+srv://maqsodahmad:sihuri@cluster0.04z4jnr.mongodb.net/?retryWrites=true&w=majority"
let db, schemes, SchemeDetails;
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

    app.post('/schemes/register', (req, res) => {
    try {
        const {
      //  SchemeName,
       SchemeType,
       SchemeDescription,
       schemeTitle,
       SchemeCategory,
       DisabilityCriteria,
       DisabiltityType,
       TypeOfBenifits,
       LaunchDate,
        } = req.body;
    
    // res.send(SchemeName);
    SchemeDetails = {
      SchemeType,
      schemeTitle,
      DisabilityCriteria,
      SchemeDescription,
      DisabiltityType,
      TypeOfBenifits,
      LaunchDate,
      SchemeCategory,
    
    }
    res.send(SchemeDetails);
    console.log(SchemeDetails);
    if(SchemeDetails){
    schemes.insertMany( SchemeDetails )
    }
    }
 catch(err) {
    console.log(err);
}   
})

app.listen(3000,() => {
    console.log('Server listening on the port 3000');
})

})