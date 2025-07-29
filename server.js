const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');
const db = require("./data/db");
const authorsRoutes = require("./routes/authors");
const booksRoutes = require("./routes/books");
const authRoutes = require("./routes/authRoutes");
const setupSwagger = require("./swagger");
require('./config/passport'); // Include the passport setup

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(session({ secret: 'mySuperSecretKey123!', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Initialize database connection
db.initializeDb((err) => {
    if (err) {
        console.error("Failed to initialize database:", err);
        process.exit(1);
    } else {
        console.log("Database initialized successfully");
    }
});

// Setup Swagger
setupSwagger(app);

// Use routes
app.use('/api/authors', authorsRoutes);
app.use('/api/books', booksRoutes);
app.use('/auth', authRoutes); 

// Start the server
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
