require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const client = new MongoClient(process.env.MONGODB_URI);
app.use(express.json());
app.use(express.static('public'));

app.get('/cards', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db('cards').collection('cards');
    const allCards = await collection.find({}).toArray();
    const { type } = req.query;
    const cards = type ? allCards.flatMap(doc => doc[type] || []) : allCards.flatMap(doc => [...(doc['Assessment cards'] || []), ...(doc.Missions || [])]);
    res.json(cards);
  } catch (error) {
    res.status(500).send('Error fetching cards');
  } finally {
    await client.close();
  }
});

app.get('/cards', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db('cards').collection('cards');
    const { type } = req.query;
    let cards = [];
    const allDocuments = await collection.find({}).toArray();

    if (type) {
      const typeKey = type === 'Missions' ? 'Missions' : 'Assessment cards'; 
      cards = allDocuments.flatMap(doc => doc[typeKey] || []);
    } else {
      cards = allDocuments.flatMap(doc => [...(doc['Assessment cards'] || []), ...(doc['Missions'] || [])]);
    }

    res.json(cards);
  } catch (error) {
    res.status(500).send('Error fetching cards');
  } finally {
    await client.close();
  }
});

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
