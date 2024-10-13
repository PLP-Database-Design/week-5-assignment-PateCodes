const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust if your DB file path is different

// GET endpoint to retrieve all providers
app.get('/providers', (req, res) => {
    db.query('SELECT * FROM providers', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving providers');
        } else {
            console.log('Providers:', results); // Debug: Ensure data is being retrieved
            res.render('providers', { providers: results }); // <-- Correctly pass providers
        }
    });
});

module.exports = router;
