const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

// Middleware to parse form data and log requests
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files from "public" directory
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Route for generating a random number
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Route for handling Mad Lib form submission
server.post('/ITC505/lab-7/', (req, res) => {
  const { adjective, noun, verb, pluralNoun, adverb, place, timeOfDay } = req.body;

  // Check if all fields are filled
  if (!adjective || !noun || !verb || !pluralNoun || !adverb || !place || !timeOfDay) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/ITC505/lab-7/">Go Back to Form</a>
    `);
    return;
  }

  // Generate the Marvel-themed Mad Lib
  const madLib = `In the heart of the Marvel Universe, a ${adjective} ${noun} stood tall, ready to ${verb} ${adverb} with the help of some mighty ${pluralNoun}. Together, they ventured into ${place}, where an epic battle was about to unfold at the break of ${timeOfDay}.`;

  // Send the response with the Mad Lib
  res.send(`
    <h1>Your Marvel Mad Lib</h1>
    <p>${madLib}</p>
    <a href="/ITC505/lab-7/">Create Another Marvel Mad Lib</a>
  `);
});

// Define port based on environment
let port = 80;
if (process.argv[2] === 'local') {
  port = 8080;
}

// Start the server
server.listen(port, () => console.log(`Ready on localhost:${port}`));
