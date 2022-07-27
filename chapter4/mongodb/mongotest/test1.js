//require the mongoClient from mongodb module
var MongoClient = require('mongodb').MongoClient;
//mongodb configration
var connectionUrl = 'mongodb://localhost:27017/myproject';
var samplecollection = 'chapters';
//we need to insert these chapters into mongodb
var chapters = [{
   'title': 'Snow Crash',
   'Author': 'Maqsood Ahmad'
   }, {
   'title':  'Snow Crash',
   'Author': 'Maqsood Ahmad'
   }];

//inseting data into the mongodb

MongoClient.connect(connectionUrl, function(err,client) {
   console.log('Connected successfully to the server');
    //get some collections
  var db = client.db('TestingDatabase');
  var collection = db.collection('samplecollection');
  collection.insertOne(chapters, function (error, result) {
 //here result will contain an array of records
 if(!error) {
  console.log('Success: '+result.ops.length+' chapters inserted!');
  } else {
   console.log("some error was encountered!");
  }
 client.close();
});
}); 
