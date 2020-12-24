// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

const server = app.listen(port, () => console.log(`server running on port: ${port}`));


// GET route that returns the projectDat object
app.get('/', (req, res) => {
    res.send('root');
    res.send(JSON.stringify(projectData));
});

app.get('/all', (req, res) => {
    res.send(projectData);
    console.log(projectData);
});

// POST route to add temperature, date, user response
app.post('/otro', addEntry);

function addEntry(req, res) {
    const newEntry = {
        date: req.body.date,
        temp: req.body.temp,
        feelings: req.body.feelings,
    };

    projectData = newEntry;
    res.send(projectData);
    console.log(projectData);
}
