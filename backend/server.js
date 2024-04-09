const express 		= require('express');
const app 			= express();
const cors 			= require('cors'); // Import the cors package
const dotenv 		= require('dotenv').config();
const port 			= process.env.PORT || 3000;
const connectDB 	= require('./dbconnect');
const cardRoutes = require('./routes/BulkUpload'); 

//connects to the local mongoDB
connectDB();
dotenv.config();

//calls gets routes from their files
const cards 		= require('./routes/Cards');
const users 		= require('./routes/Users');
const search 		= require('./routes/Search');
const icons 		= require('./routes/Icons');

app.use(cors()); // Use cors as middleware
app.use(express.json());

//unescessary get that just sends a 200 status and console logs 'here'. just for debugging
app.get('/', (req, res) => {
	console.log('here')
	res.sendStatus(200)
});

//routes
app.use('/cards', cards);
app.use('/users', users);
app.use('/search', search);
app.use('/icons', icons);
app.use('/api/cards', cardRoutes);

app.listen(port, () => console.log(`express server listening on port ${port}...`));