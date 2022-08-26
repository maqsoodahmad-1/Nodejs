const express = require('express');
const sendEmail = require("./contact_us_route.js")
// const path = require('path');
const app =  express();

// app.set("view engine", "pug")
// app.set("views", path.join(__);dirname, "."))
const mongo = require("mongodb").MongoClient
const url = "mongodb+srv://maqsodahmad:sihuri@cluster0.04z4jnr.mongodb.net/?retryWrites=true&w=majority"
let db, schemesCollection, schemes;
mongo.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) {
        console.error(err)
        return
      }
      db = client.db("Schemes")
      schemesCollection= db.collection("Schemes")
      schemesCollection.find({}).toArray((err, data) => {
        if(err) {
            console.log(err);
        }
        schemes = data
        console.log(schemes)
      })
    }
  )
  
  app.get("/test", (req, res) => {
    const result = sendEmail("Aman", "maqsodmaxood75@gmail.com", "test message");
    res.send(result);
  })

   app.get("/api/schemes", (req, res) => {
       res.json(schemes);
    })
  
  app.listen(3000, () => console.log("Server ready"));