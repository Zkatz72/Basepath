const {MongoClient} = require('mongodb')
const fs = require('fs');
const path = require('path');
const localPath = process.env.PLAYER_INDEX_LOCAL_PATH
const uri = 'mongodb://localhost:27017';
const dbName = 'pcreg'; //PlayerConnect Register
const collectionName = 'players';

async function insertData() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Loop through each letter's JSON file and insert data
        for (let letter = 97; letter <= 122; letter++) {
            const letterChar = String.fromCharCode(letter);
            const filePath = `${localPath}/players-${letterChar}.json`;

            if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath, 'utf8');
                const players = JSON.parse(data);

                for (const id in players) {
                    await collection.insertOne({id: id, ...players[id]});
                }
                console.log(`Inserted data from ${letterChar}.json`);
            }
        }
    } catch (err) {
        console.error('Error inserting data:', err);
    } finally {
        // Close the MongoDB connection
        await client.close();
        console.log('MongoDB connection closed');
    }
}

// Run the insertData function
insertData();