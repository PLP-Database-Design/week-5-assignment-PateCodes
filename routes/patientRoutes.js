const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient'); // Adjust the path based on your structure

// Route to get all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find(); // Replace with your database logic
        res.render('patients', { patients }); // Render the patients.ejs file
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Add any other patient-related routes here, e.g., for creating or updating patients

module.exports = router;
