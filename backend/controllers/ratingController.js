const Ratings = require('../schemas/ratingSchema');
const mongoose = require('mongoose');

//CRUD: Create
const createRating = async (req, res) => {
	const rating = new Ratings({
		'creator': req.user._id,
		'score': req.body['score'],
		'scheme': req.body['scheme']
	})

	try {
		const a1 = await rating.save();
		// if successful, prints success message and the new rating
		res.json({ message: 'Rating created successfully', Rating: a1 }).status(201);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

//CRUD: Read
const getAllRatings = async (req, res) => {
	try {
		const ratings = await Ratings.find();
		// if successful, prints all ratings
		res.status(200).json(ratings);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

//CRUD: Read
const getSingleRating = async (req, res) => {
	const _id = req.params.id;
	try {
		const rating = await Ratings.findById(_id);

		if (!rating) {
			//Send 404 status if the updated rating can't be found
			return res.status(404).json({ error: 'Could not find rating. Rating not found' });
		}
		// if successful, prints rating and sends 200 status
		res.json(rating);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

//CRUD: Update
const updateRating = async (req, res) => {
	const _id = req.params.id;
	try {
		const rating = await Ratings.findByIdAndUpdate(_id, req.body); //updates rating
		const updatedRating = await Ratings.findById(_id); //returns updated rating

		if (!rating) {
			//Send 404 status if the updated rating can't be found
			return res.status(404).json({ error: 'Could not update rating. rating not found' });
		}
		// if successful, prints updated rating and sends 200 status
		res.json({ message: 'Rating updated successfully', Rating: updatedRating }).status(200);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

//CRUD: Delete
const deleteRating = async (req, res) => {
	const _id = req.params.id;
	try {
		const rating = await Ratings.findByIdAndDelete(_id);
		if (!rating) {
			//Send 404 status if the rating can't be found
			return res.status(404).json({ error: 'Could not delete rating. Rating not found' });
		}
		// if successful, prints success message, the deleted rating and sends a 200 status
		res.json({ message: 'Rating deleted successfully', Rating: rating }).status(200);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

const calculateAverageRating = async (req, res) => {
  const _id = req.params.id;
  try {
    const schemeObjectId = new mongoose.Types.ObjectId(_id);

    const result = await Rating.aggregate([
    	//find ratings for the scheme
      { $match: { scheme: schemeObjectId } },
      {
      	//return avg ratings and the id of the scheme
        $group: {
          _id: '$scheme',
          averageRating: { $avg: '$score' }
        }
      }
    ]);

    // If there are no ratings return a 404 status with a message
    if (result.length === 0) {
      return res.status(404).json({ error: 'No ratings found for this scheme' });
    }

    // Return the average rating
    res.status(200).json({ _id, averageRating: result[0].averageRating });
  } catch (error) {
    console.error('Error calculating average rating:', error);
    res.status(500).send('Error: ' + error);
  }
};

//CRUD: Read
const findUserRating = async (req, res) => {
		const _id = req.params.id;
		const rating = await Ratings.findOne({creator:req.user._id,scheme:_id})
	try {
		if (!rating) {
			//Send 404 status if the updated rating can't be found
			return res.status(404).json({ error: 'Could not find rating. Rating not found' });
		}
		// if successful, prints rating and sends 200 status
		res.json(rating);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
		res.status(200);
}

module.exports = { createRating, getAllRatings, getSingleRating,  updateRating, deleteRating, calculateAverageRating, findUserRating }