const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./dbconnect');
const app = express();
const port = process.env.PORT || 3000;

// Connects to the MongoDB
connectDB();

// Routes
const cardsRoutes = require('./routes/Cards'); // Adjust path as necessary
const usersRoutes = require('./routes/users'); // Adjust path as necessary
const searchRoutes = require('./routes/Search'); // Adjust path as necessary
const iconsRoutes = require('./routes/Icons'); // Adjust path as necessary
const bulkUploadRoutes = require('./routes/Bulk'); // Adjust path as necessary

// Middlewares
app.use(cors());
app.use(express.json());

// Debugging route
app.get('/', (req, res) => {
  console.log('Server is up and running');
  res.sendStatus(200);
});

// API routes
app.use('/cards', cardsRoutes);
app.use('/users', usersRoutes);
app.use('/search', searchRoutes);
app.use('/icons', iconsRoutes);
app.use('/api/cards', bulkUploadRoutes); // Mounting the bulk upload operations route

// Start the server
app.listen(port, () => console.log(`Express server listening on port ${port}...`));
