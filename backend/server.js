const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./dbconnect');
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser'); 
// Connects to the MongoDB
connectDB();

// Routes
const cardsRoutes = require('./routes/Cards'); // Adjust path as necessary
const usersRoutes = require('./routes/users'); // Adjust path as necessary
const searchRoutes = require('./routes/Search'); // Adjust path as necessary
const iconsRoutes = require('./routes/Icons'); // Adjust path as necessary
const AssSchemeRoutes = require('./routes/AssessmentScheme'); // Adjust path as necessary
const bulkUploadRoutes = require('./routes/Bulk'); // Adjust path as necessary
const ratingsRoutes = require('./routes/Ratings'); // Adjust path as necessary

// Middlewares
app.use(cookieParser());
const corsConfig = {
    credentials: true,
    origin: 'http://localhost:5173',
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
};

app.use(cors(corsConfig));
app.use(express.json());


// Debugging route
app.get('/', (req, res) => {
  console.log('Server is up and running');
  res.sendStatus(200);
});

// API routes
app.use('/api/cards', cardsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/icons', iconsRoutes);
app.use('/api/assscheme', AssSchemeRoutes);
app.use('/api/ratings', ratingsRoutes);
app.use('/api/cards', bulkUploadRoutes); // Mounting the bulk upload operations route

// Start the server
app.listen(port, () => console.log(`Express server listening on port ${port}...`));
