const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    department: String,
    university: String,
    position: String
});

const User = mongoose.model('User', userSchema);

exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.json(user);
};

exports.createUser = async (req, res) => {

    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        department: req.body.department,
        university: req.body.university,
        position: req.body.position
    });
    await user.save();
    res.json(user);
};

exports.updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            department: req.body.department,
            university: req.body.university,
            position: req.body.position
        },
        { new: true } 
    );

    if (!user) return res.status(404).send('The user with the given ID was not found.');

    res.json(user);
};



exports.deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.json(user);
};


