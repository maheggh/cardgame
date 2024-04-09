const express = require('express');
const router = express.Router();
const Card = require('../schemas/cardSchema'); 

router.post('/api/cards/bulk', async (req, res) => {
  try {
    const { cards } = req.body;
    await Card.insertMany(cards, { ordered: false }).catch(e => {
      console.error("Error during bulk insert: ", e);
    });
    res.status(200).send({ message: 'Cards uploaded successfully' });
  } catch (error) {
    console.error('Error inserting cards:', error);
    res.status(500).send({ message: 'Error uploading cards' });
  }
});

module.exports = router;