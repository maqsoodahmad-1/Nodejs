const {MongoClient} = require('mongodb');
async function main() {
    const uri = "mongodb+srv://maqsodahmad:shabnamjaan%401@cluster0.04z4jnr.mongodb.net/test?retryWrites=true&w=majority"
    const client = new MongoClient(uri);
   try {
        await client.connect();
        await listDataBase(client);
   } catch(e) {
    console.error(e);
   } finally {
    await client.close();
   }
}

main().catch(console.error);

async function listDataBase(client) {
    const databasesList = await client.db().admin().listDataBase();

console.log("Databases");
databasesList.databas.forEach(db => {
    console.log(`--> ${db.name}`);
});
}