const { MongoClient } = require('mongodb');

async function main(){
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri);

    try{
        await client.connect();
        //await listDatabases(client);
        //await createListing(client, {
        //    name: "yunrui",
        //    info: "this is info of yunrui",
        //    uri: "www.google.com"
        //});
        await findOneListingByName(client, "yunrui");
    }catch(e){
        console.error(e);
    }finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    });
}

async function createListing(client, newListing) {
    const result = await client.db("user").collection("newdatabase").insertOne(newListing);
    console.log(`new listing created with follow id: ${result.insertedId}`);
}

async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("user").collection("newdatabase").findOne({ name: nameOfListing });

    if (result) {
        console.log(`found a result with name: ${nameOfListing} `);
        console.log(result);
    } else {
        console.log(`No such name in database`);
    }


}