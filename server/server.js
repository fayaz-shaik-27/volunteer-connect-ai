const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (to be added)
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/opportunities', require('./routes/opportunityRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));


// Basic route
app.get('/', (req, res) => {
    res.send('Volunteer Connect AI API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
