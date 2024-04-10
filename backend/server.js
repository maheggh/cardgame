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
const usersRoutes = require('./routes/Users'); // Adjust path as necessary
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

// Your DELETE route
app.delete('/cards/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const result = await Cards.findByIdAndDelete(_id);
    if (!result) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json({ message: 'Card deleted successfully', card: result });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting card', error: error });
  }
});


// API routes
app.use('/cards', cardsRoutes);
app.use('/users', usersRoutes);
app.use('/search', searchRoutes);
app.use('/icons', iconsRoutes);
app.use('/api/cards', bulkUploadRoutes); // Mounting the bulk upload operations route

// Start the server
app.listen(port, () => console.log(`Express server listening on port ${port}...`));
