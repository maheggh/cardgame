const Cards = require('../schemas/cardSchema');

const queryCards = async (req, res) => {
	try {
		//defines which queries to look fore
		const { 'card-type': cardType, 'card-category': cardCategory, random, exclude } = req.query;
		const query = {};

		//checks if query is specifying cardtype
	    if (cardType) {
	      query['card-type'] = cardType;
	    }

		//checks if query is specifying cardCategory
	    if (cardCategory) {
	      query['card-category'] = cardCategory;
	    }	

	    //checks if query is specifying any ids to exclude
	    if (exclude) {
	      query['card-id'] = { $nin: JSON.parse(exclude).map(num => parseInt(num)) };
	    }

	    //checks if query is specifying any ids to exclude
	    if (random) {
	      // Convert the 'random' parameter to a number
	      const randomNumber = parseInt(random);

	      // Retrieve specified ammount of random cards
	      cards = await Card.aggregate([
	        { $match: query }, // Match documents based on the query
	        { $sample: { size: randomNumber } } // Select 'randomNumber' ammount of random documents
	      ]);
	    } else {
	      // Execute a regular query if 'random' parameter is not provided
	      cards = await Card.find(query);
	    }

		res.json(cards);
	} catch (err) {
		res.send('Error: ' + err);
	}
}

module.exports = { queryCards }