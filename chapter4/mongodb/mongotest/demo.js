const {MongoClient} = require('mongodb');
async function main() {
    const URI = "mongodb://localhost:27107"
    const client = new MongoClient(URI);
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
