# Database Interacation in Web Applications

This demonstrates the cconnection of MySQL database and Node.js to create a simple API

## Requirements
- [Node.js](https://nodejs.org/) installed
-  MySQL installed and running
-  A code editor, like [Visual Studio Code](https://code.visualstudio.com/download)

## Setup
1. Clone the repository
2. Initialize the node.js environment
   ```
   npm init -y
   ```
3. Install the necessary dependancies
   ```
   npm install express mysql2 dotenv nodemon
   ```
4. Create a ``` server.js ``` and ```.env``` files
5. Basic ```server.js``` setup
   <br>
   
   ```js
   const express = require('express')
   const app = express()

   
   // Question 1 goes here
   ## 1. Retrieve all patients

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


   // Question 2 goes here
   
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



   // Question 3 goes here
##Create a ```GET``` endpoint that retrieves all patients by their first name
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


   // Question 4 goes here
##Create a ```GET``` endpoint that retrieves all providers by their specialty

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

   

   // listen to the server
   const PORT = 3000
   app.listen(PORT, () => {
     console.log(`server is runnig on http://localhost:${PORT}`)
   })
   ```
<br><br>

## Run the server
   ```
   nodemon server.js
   ```
<br><br>

## Setup the ```.env``` file
```.env
DB_USERNAME=root
DB_HOST=localhost
DB_PASSWORD=your_password
DB_NAME=hospital_db
```

<br><br>

## Configure the database connection and test the connection
Configure the ```server.js``` file to access the credentials in the ```.env``` to use them in the database connection

<br>

## 1. Retrieve all patients
Create a ```GET``` endpoint that retrieves all patients and displays their:
- ```patient_id```
- ```first_name```
- ```last_name```
- ```date_of_birth```

<br>

## 2. Retrieve all providers
Create a ```GET``` endpoint that displays all providers with their:
- ```first_name```
- ```last_name```
- ```provider_specialty```

<br>

## 3. Filter patients by First Name
Create a ```GET``` endpoint that retrieves all patients by their first name

<br>

## 4. Retrieve all providers by their specialty
Create a ```GET``` endpoint that retrieves all providers by their specialty

<br>


## NOTE: Do not fork this repository
