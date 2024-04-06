//mongodb+srv://vegardstamadsen:E5rr7z1KUH9BWRdI@game.hwn65gj.mongodb.net/?retryWrites=true&w=majority&appName=game
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const missionsRouter = require('./routes/mission');
const assessmentRouter = require('./routes/assessment');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use(express.json());


app.use((req, res, next) => {
    const authKey = req.header('Authentication');
    if (authKey !== 'authentication-key') {
        return res.status(401).send('Access denied. Invalid authorization key.');
    }
    next();
});

app.use('/users', usersRouter);
app.use('/missions', missionsRouter);
app.use('/assessment', assessmentRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
