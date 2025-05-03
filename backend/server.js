const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const notesRoutes = require('./routes/notes');

const app = express();

app.get('/', (req, res) => {
    res.send('Notes App Backend is Running');
  });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notes', notesRoutes);

// MongoDB + Server Startup
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`)))
  .catch((error) => console.error('❌ MongoDB connection error:', error));
