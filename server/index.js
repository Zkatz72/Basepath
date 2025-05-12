const express = require('express');
const { MongoClient } = require('mongodb');
const fs = require('fs'); // Import the fs module

const app = express();
const url = 'mongodb://localhost:27017';
const dbName = 'pcreg';
const PORT = process.env.PORT || 3001;

async function main() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    console.log(`Connected to database ${dbName}`);

    app.get('/player/:id', async (req, res) => {
      console.log('getting request')
      const playerId = req.params.id;
      try {
        const player = await db.collection('players').findOne({ id: playerId });
        if (player) {
          console.log(player)
          res.json(player);
          
        } else {
          res.status(404).json({ error: 'Player not found' });
        }
      } catch (err) {
        console.error('Error fetching player:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });

  } catch (err) {
    console.error('Failed to connect to database:', err);
  }
}

main();
