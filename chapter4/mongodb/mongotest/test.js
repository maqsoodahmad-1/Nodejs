var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/mongotest',
function(err, client) {
   console.log('Connected to MongoDB');
//using the db conneciton object, save the collection 'testing' to a seperate variable:
let db = client.db('TestingDatabase');
var collection = db.collection('testing');
//insert a new item using the collection's insert function:
collection.insertOne({
	'title': 'Snowcrash',
	'Author': 'Maqsood'
      },{
         'title': 'Snowcrash',
         'Author': 'Maqsood'
      }
    function(err,docs) {
   //on successful insertion log to the screen the new collectio's details:
	console.log('record inserted.');	
	console.log(docs[0]._id + ' - ' + docs[0]._title);

        collection.findOne({
	    title: 'Snowcrash'
	}, function(err, doc) {
	console.log(doc._title + ' - ' + doc.title);
	//finally close the connection
	db.close();
       });
    });
 });
