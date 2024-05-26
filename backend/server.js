const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./dbconnect');
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser'); 
const swaggerDoc = require('swagger-ui-express');
const swaggerDocumentation = require('./documentation');

// Connects to the MongoDB
connectDB();

// Routes
const cardsRoutes = require('./routes/Cards'); 
const usersRoutes = require('./routes/users'); 
const searchRoutes = require('./routes/Search'); 
const iconsRoutes = require('./routes/Icons'); 
const AssSchemeRoutes = require('./routes/AssessmentScheme'); 
const bulkUploadRoutes = require('./routes/Bulk'); 
const ratingsRoutes = require('./routes/Ratings'); 

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
app.use('/documentation', swaggerDoc.serve);
app.use('/documentation', swaggerDoc.setup(swaggerDocumentation));

// Start the server
app.listen(port, () => console.log(`Express server listening on port ${port}...`));
