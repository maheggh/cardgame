const AssessmentSchemes = require('../schemas/assessmentSchemeSchema');

//CRUD: Create
const createScheme = async (req, res) => {
	const scheme = new AssessmentSchemes({
		'scheme-name': req.body['scheme-name'],
		'card-who-is': req.body['card-who-is'],
		'card-assessor': req.body['card-assessor'],
		'card-artefact': req.body['card-artefact'],
		'card-format': req.body['card-format'],
		'card-context': req.body['card-context'],
		'card-timing': req.body['card-timing'],
		'card-mission-one': req.body['card-mission-one'],
		'card-mission-two': req.body['card-mission-two'],
		'card-mission-three': req.body['card-mission-three'],
		'creator': req.body['scheme-creator']
	})

	try {
		const a1 = await scheme.save();
		// if successful, prints success message and the new scheme
		res.json({ message: 'Scheme created successfully', scheme: a1 }).status(201);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

//CRUD: Read
const getAllSchemes = async (req, res) => {
	console.log(req.body);
	try {
		const schemes = await AssessmentSchemes.find();
		// if successful, prints all schemes
		res.status(200).json(schemes);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

//CRUD: Read
const getSingleScheme = async (req, res) => {
	const _id = req.params.id;
	try {
		const scheme = await AssessmentSchemes.findById(_id);

		if (!scheme) {
			//Send 404 status if the updated scheme can't be found
			return res.status(404).json({ error: 'Could not find scheme. Scheme not found' });
		}
		// if successful, prints scheme and sends 200 status
		res.json(scheme);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

//CRUD: Update
const updateScheme = async (req, res) => {
	const _id = req.params.id;
	try {
		const scheme = await AssessmentSchemes.findByIdAndUpdate(_id, req.body); //updates scheme
		const updatedScheme = await AssessmentSchemes.findById(_id); //returns updated scheme

		if (!scheme) {
			//Send 404 status if the updated scheme can't be found
			return res.status(404).json({ error: 'Could not update scheme. Scheme not found' });
		}
		// if successful, prints updated scheme and sends 200 status
		res.json({ message: 'Scheme updated successfully', Scheme: updatedScheme }).status(200);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

//CRUD: Delete
const deleteScheme = async (req, res) => {
    const _id = req.params.id;
    try {
        const card = await AssessmentSchemes.findByIdAndDelete(_id);
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
module.exports = { createScheme, getAllSchemes, getSingleScheme, updateScheme, deleteScheme }