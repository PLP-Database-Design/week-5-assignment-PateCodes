const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

// Create a MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test the database connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('Connected to the database.');
});

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// GET endpoint to retrieve all patients
app.get('/patients', (req, res) => {
    db.query('SELECT * FROM patients', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving patients');
        } else {
            res.render('patients', { results: results });
        }
    });
});

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// GET endpoint to retrieve all providers
app.get('/providers', (req, res) => {
    db.query('SELECT * FROM providers', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving providers');
        } else {
            console.log('Providers:', results); 
            res.render('providers', { providers: results });
        }
    });
});


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// Get Endpoint to Filter patients by First Name 
app.get('/patients/first_name/:name', (req, res) => {
    const name = req.params.name; // Retrieve the name from the URL parameter
    console.log('Filtering patients by first name:', name); // Log the name

    const sql = 'SELECT * FROM patients WHERE first_name = ?'; // SQL query to filter patients

    db.query(sql, [name], (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Log the error
            return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length === 0) {
            return res.status(404).send(`No patients found with the first name: ${name}`);
        }

        // Render the results using the filteredPatients.ejs view
        res.render('filteredPatients', { patients: results }); // Pass the results to the view
    });
});


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Get Endpoint to Retrieve Providers by Specialty
app.get('/providers/specialty/:specialty', (req, res) => {
    const specialty = req.params.specialty; // Retrieve the specialty from the URL parameter
    console.log('Filtering providers by specialty:', specialty); // Log the specialty

    const sql = 'SELECT * FROM providers WHERE provider_specialty = ?'; // Updated SQL query

    db.query(sql, [specialty], (err, results) => {
        if (err) {
            console.error('Database query error:', err.sqlMessage || err); // Log the error
            return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length === 0) {
            return res.status(404).send(`No providers found with the specialty: ${specialty}`);
        }

        // Render the results using the filteredProviders.ejs view
        res.render('filteredProviders', { providers: results }); // Pass the results to the view
    });
});


// 1. Retrieve all patients
app.get('/patients', (req, res) => {
    const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 2. Retrieve all providers
app.get('/providers', (req, res) => {
    const sql = 'SELECT first_name, last_name, provider_specialty FROM providers'; 
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 3. Filter patients by First Name
app.get('/patients/first_name/:name', (req, res) => {
    const name = req.params.name;
    const sql = 'SELECT * FROM patients WHERE first_name = ?';
    db.query(sql, [name], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 4. Retrieve all providers by their specialty
app.get('/providers/specialty/:specialty', (req, res) => {
    const specialty = req.params.specialty;
    const sql = 'SELECT * FROM providers WHERE provider_specialty = ?'; // Assuming you have a providers table
    db.query(sql, [specialty], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Listen to the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
