const { MongoClient } = require("mongodb");

 

// Replace the following with your Atlas connection string                                                                                                                                        

const url = "mongodb+srv://HappyUmlaut:9NqqdaB5vJqgdhqEi3F8oKGqyZFwiad9DcavNLf4@cluster0.8d0zg.mongodb.net/Cluster0?retryWrites=true&w=majority";

const client = new MongoClient(url);

async function run() {

    try {

        await client.connect();

        console.log("Connected correctly to server");

    } catch (err) {

        console.log(err.stack);

    }

    finally {

        await client.close();

    }

}

run().catch(console.dir);