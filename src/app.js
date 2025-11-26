require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require('./routes/authRoutes');

// Mount routes
app.use('/api/auth', authRoutes);

// Test database connection and sync
const PORT = process.env.PORT || 3030;

sequelize.authenticate()
    .then(() => {
        console.log('Database connected');
        return sequelize.sync(); // Creates tables if they don't exist
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });