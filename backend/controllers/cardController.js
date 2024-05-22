const Cards = require('../schemas/cardSchema');

//CRUD: Create
const createCard = async (req, res) => {
	const card = new Cards({
		'card-id': req.body['card-id'],
		'card-type': req.body['card-type'],
		'card-name': req.body['card-name'],
		'card-description': req.body['card-description'],
		'card-details': req.body['card-details'],
		'card-category': req.body['card-category'],
		'card-icon': req.body['card-icon']
	})

	try {
		const a1 = await card.save();
		// if successful, prints success message and the new card
		res.json({ message: 'Card created successfully', Card: a1 }).status(201);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

//CRUD: Read
const getAllCards = async (req, res) => {
	try {
		const cards = await Cards.find();
		// if successful, prints all cards
		res.status(200).json(cards);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

//CRUD: Read
const getTotalCards = async (req, res) => {
    try {
        const count = await Cards.countDocuments();
        // if successful, prints total number of users
        res.status(200).json(count);
    } catch (err) {
        // if unsuccessful, prints error message and sends a 500 status
        res.status(500).send('Error: ' + err);
    }
}

//CRUD: Read
const getTotalCardTypes = async (req, res) => {
    try {
        const count = await Cards.distinct('card-category');
        // if successful, prints total number of users
        res.status(200).json(count.length);
    } catch (err) {
        // if unsuccessful, prints error message and sends a 500 status
        res.status(500).send('Error: ' + err);
    }
}

//CRUD: Read
const getSingleCard = async (req, res) => {
	const _id = req.params.id;
	try {
		const card = await Cards.findById(_id);

		if (!card) {
			//Send 404 status if the updated card can't be found
			return res.status(404).json({ error: 'Could not find card. Card not found' });
		}
		// if successful, prints card and sends 200 status
		res.json(card);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

//CRUD: Update
const updateCard = async (req, res) => {
	const _id = req.params.id;
	try {
		const card = await Cards.findByIdAndUpdate(_id, req.body); //updates card
		const updatedCard = await Cards.findById(_id); //returns updated card

		if (!card) {
			//Send 404 status if the updated card can't be found
			return res.status(404).json({ error: 'Could not update card. Card not found' });
		}
		// if successful, prints updated card and sends 200 status
		res.json({ message: 'Card updated successfully', Card: updatedCard }).status(200);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

//CRUD: Delete
const deleteCard = async (req, res) => {
    const _id = req.params.id;
    try {
        const card = await Cards.findByIdAndDelete(_id);
        if (!card) {
            console.log(`Could not find card with ID: ${_id}`);
            return res.status(404).json({ message: 'Card not found' });
        }
        
        console.log('Deleted card:', card);
        res.json({ message: 'Card deleted successfully', Card: card });
    } catch (err) {
        console.error('Errors deleting card:', err);
        res.status(500).json({ message: 'Error deleting card', error: err.message || err });
    }
};
module.exports = { createCard, getAllCards, getSingleCard, updateCard, deleteCard, getTotalCards, getTotalCardTypes }