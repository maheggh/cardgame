// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import the express module to create an HTTP server
const express = require('express');

// Import the MongoClient and ObjectId utilities from the mongodb package
const { MongoClient, ObjectId } = require('mongodb');

// Create an instance of an Express application
const app = express();

// Create a new MongoClient instance and connect to the MongoDB URI from the environment variables
const client = new MongoClient(process.env.MONGODB_URI);

// Use the express.json() middleware to parse JSON payloads in incoming requests
app.use(express.json());

// Serve static files (like HTML, CSS, JS) from the 'public' directory
app.use(express.static('public'));

// Route to get cards. Supports filtering by card type through query parameters
app.get('/cards', async (req, res) => {
  try {
    await client.connect(); // Connect to the MongoDB database
    const collection = client.db('cards').collection('cards'); // Access the cards collection
    const { type } = req.query; // Extract the type from query parameters

    let query = {}; // Start with an empty query that will return all documents
    if (type) {
      // If a type is specified, adjust the query to filter documents by type
      query[type] = { $exists: true }; 
    }

    // Execute the query and get the documents
    const documents = await collection.find(query).toArray();
    let cards = [];

    if (type) {
      // If a type is specified, flatten the specific type array from each document
      cards = documents.flatMap(doc => doc[type]);
    } else {
      // If no type is specified, flatten both 'Assessment cards' and 'Missions' arrays from each document
      cards = documents.flatMap(doc => [...(doc['Assessment cards'] || []), ...(doc['Missions'] || [])]);
    }

    res.json(cards); // Send the cards as a JSON response
  } catch (error) {
    res.status(500).send('Error fetching cards'); // Handle errors
  } finally {
    await client.close(); // Ensure the database connection is closed after the operation
  }
});

// Route to add a new card to the database
app.post('/cards', async (req, res) => {
  const { "card-id": cardId, "card-type": cardType, "card-name": cardName, "card-category": cardCategory, "card-description": cardDescription, "card-details": cardDetails } = req.body;

  // Validate the provided data (for example, ensure cardType is either 'Assessment' or 'Mission')
  if (!cardType || !(cardType === 'Assessment' || cardType === 'Mission')) {
    return res.status(400).send('Invalid card type');
  }

  // Create the card object based on the type
  const newCard = {
    "card-id": cardId, 
    "card-name": cardName,
    "card-category": cardCategory,
    "card-description": cardDescription,
    "card-details": cardDetails
  };

  try {
    await client.connect();
    const collection = client.db('cards').collection('cards');

    const updateResult = await collection.updateOne(
      {},
      { $push: { [cardType === 'Assessment' ? 'Assessment cards' : 'Missions']: newCard } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).send('Document to update not found.');
    }

    res.status(201).send('Card added successfully');
  } catch (error) {
    console.error('Error adding new card:', error);
    res.status(500).send('Error adding new card');
  } finally {
    await client.close();
  }
});

// route to update cards
app.put('/cards/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    await client.connect();
    const collection = client.db('cards').collection('cards');
    const query = updateData['card-type'] === 'Assessment' ? { 'Assessment cards.card-id': id } : { 'Missions.card-id': id };
    const update = { $set: updateData['card-type'] === 'Assessment' ? { 'Assessment cards.$': updateData } : { 'Missions.$': updateData } };
    const result = await collection.updateOne(query, update);
    result.modifiedCount ? res.json({ success: true, updated: result.modifiedCount }) : res.status(404).send('No card with the specified ID was found or no changes were made.');
  } catch (error) {
    res.status(500).send('Error updating card');
  } finally {
    await client.close();
  }
});

// route to delete cards
app.delete('/cards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await client.connect();
    const collection = client.db('cards').collection('cards');
    const assessmentResult = await collection.updateOne({ 'Assessment cards.card-id': id }, { $pull: { 'Assessment cards': { 'card-id': id } } });
    const missionResult = await collection.updateOne({ 'Missions.card-id': id }, { $pull: { 'Missions': { 'card-id': id } } });
    (assessmentResult.modifiedCount || missionResult.modifiedCount) ? res.status(204).end() : res.status(404).send('No card with the specified ID was found.');
  } catch (error) {
    res.status(500).send('Error deleting card');
  } finally {
    await client.close();
  }
});

// listen to port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
