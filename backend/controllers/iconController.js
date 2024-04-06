const Icons = require('../schemas/iconSchema');

//CRUD: Create
const createIcon = async (req, res) => {
	console.log(req.body);
	const icon = new Icons({
		'iconURL': req.body['iconURL']
	})

	try {
		const a1 = await icon.save();
		// if successful, prints success message and the new icon
		res.json({ message: 'Icon created successfully', Icon: a1 }).status(201);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

//CRUD: Read
const getAllIcons = async (req, res) => {
	try {
		const icons = await Icons.find();
		// if successful, prints all icons
		res.status(200).json(icons);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

//CRUD: Read
const getSingleIcon = async (req, res) => {
	const _id = req.params.id;
	try {
		const icon = await Icons.findById(_id);

		if (!icon) {
			//Send 404 status if the updated icon can't be found
			return res.status(404).json({ error: 'Could not find icon. Icon not found' });
		}
		// if successful, prints icon and sends 200 status
		res.json(icon);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

//CRUD: Update
const updateIcon = async (req, res) => {
	const _id = req.params.id;
	try {
		const icon = await Icons.findByIdAndUpdate(_id, req.body); //updates icon
		const updatedIcon = await Icons.findById(_id); //returns updated icon

		if (!icon) {
			//Send 404 status if the updated icon can't be found
			return res.status(404).json({ error: 'Could not update icon. icon not found' });
		}
		// if successful, prints updated icon and sends 200 status
		res.json({ message: 'Icon updated successfully', Icon: updatedIcon }).status(200);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

//CRUD: Delete
const deleteIcon = async (req, res) => {
	const _id = req.params.id;
	try {
		const icon = await Icons.findByIdAndDelete(_id);
		if (!icon) {
			//Send 404 status if the icon can't be found
			return res.status(404).json({ error: 'Could not delete icon. icon not found' });
		}
		// if successful, prints success message, the deleted icon and sends a 200 status
		res.json({ message: 'Icon deleted successfully', Icon: icon }).status(200);
	} catch (err) {
		// if unsuccessful, prints error message and sends a 500 status
		res.status(500).send('Error: ' + err);
	}
}

module.exports = { createIcon, getAllIcons, getSingleIcon, updateIcon, deleteIcon }