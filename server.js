const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/books', bookRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));