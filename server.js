const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS library

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Use body-parser to parse JSON request bodies
app.use(bodyParser.json());

// Your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzZVWkeai2aSxEYKMII4KXYF3xxbmzldLTucqdugzAsDkRuOUinxp2wm_KQFxI32uB4NQ/exec';

// Endpoint for the frontend to communicate with
app.post('/submit-data', async (req, res) => {
  try {
    const { email, responses } = req.body;

    // Make the request to Google Apps Script
    const googleResponse = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, responses }),
    });

    const googleData = await googleResponse.json();

    // Send the response back to the client
    res.json({
      status: 'success',
      data: googleData,
    });
  } catch (error) {
    console.error('Error submitting data to Google Apps Script:', error);
    res.status(500).json({ status: 'failed', message: 'Failed to submit data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
