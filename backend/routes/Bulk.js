const express = require('express');
const router = express.Router();
const Card = require('../models/Card'); // Make sure this path is correct

// Route to fetch all cards
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find(); // Fetch all cards from the database
    res.json(cards);
  } catch (err) {
    console.error('Error fetching cards:', err);
    res.status(500).send({ message: 'Failed to fetch cards', error: err.message });
  }
});

// Route for bulk upload to update existing cards or insert new ones
router.post('/bulk', async (req, res) => { 
  try {
    // Check if req.body.cards exists and is an array
    if (!Array.isArray(req.body.cards)) {
      return res.status(400).send('Expected an array of cards.');
    }
    
    const cardsArray = req.body.cards;
    const filteredCards = cardsArray.filter(card => card['card-id'] != null);
    
    if (filteredCards.length === 0) {
      return res.status(400).send('No valid cards to upload.');
    }

    // Prepare bulk operations
    const bulkOps = filteredCards.map(card => ({
      updateOne: {
        filter: { 'card-id': card['card-id'] },
        update: { $set: card },
        upsert: true
      }
    }));

    // Execute bulk operations
    const result = await Card.bulkWrite(bulkOps, { ordered: false });

    // Confirm success
    const cardIds = filteredCards.map(card => card['card-id']);
    const updatedCards = await Card.find({ 'card-id': { $in: cardIds } });

    res.status(201).json(updatedCards);
  } catch (error) {
    console.error('Failed to process bulk upload:', error);
    res.status(500).json({ message: 'Failed to process bulk upload', error: error.message });
  }
});

module.exports = router;
