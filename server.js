// server.js

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const jobRoutes = require('./routes/jobRoutes');
const applicantRoutes = require('./routes/applicantRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/jobs', jobRoutes);
app.use('/applicants', applicantRoutes);

let dbClient;
let database;

// Initialize DB connection
const initDb = async () => {
    if (database) {
        console.log('Database already initialized');
        return database;
    }

    try {
        const client = await MongoClient.connect(process.env.MONGODB_URL, {
            useUnifiedTopology: true,
        });

        dbClient = client;
        database = client.db(process.env.DB_NAME); // Make sure DB_NAME is set in .env
        console.log('Connected to MongoDB');
        return database;
    } catch (err) {
        console.error('MongoDB connection failed:', err);
        throw err;
    }
};

// Get the DB instance
const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized');
    }
    return database;
};

// Start the server after DB is connected
const PORT = process.env.PORT || 3000;

initDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to initialize server:', err);
        process.exit(1);
    });

// Handle graceful shutdown
process.on('SIGINT', () => {
    if (dbClient) {
        dbClient.close(() => {
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        });
    } else {
        process.exit(0);
    }
});

// Export getDatabase if needed by other modules
module.exports = { getDatabase };

