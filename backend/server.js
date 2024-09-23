const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const patientRoutes = require('./routes/patientRoutes');

dotenv.config();
connectDB();

const app = express();

// CORS setup - allowing only your frontend domain
const corsOptions = {
    origin: '*', // your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed methods
    credentials: true, // allow credentials if necessary
    optionsSuccessStatus: 200 // legacy browsers (IE11) support
};

app.use(cors(corsOptions)); // Use the CORS middleware with options

app.use(express.json());

app.use('/api', patientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
