const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to DonationPortal!');
});

// Replace with your secret key from Google reCAPTCHA
const RECAPTCHA_SECRET_KEY = '6LfJzF4qAAAAAH1usfRX4ceprJluNUJp2yNsR2mx';  // Replace with your reCAPTCHA secret key

// Endpoint to verify CAPTCHA
app.post('/verifyCaptcha', async (req, res) => {
    const { captchaResponse, prolificID } = req.body;

    if (!captchaResponse) {
        return res.status(400).json({ success: false, message: 'No CAPTCHA token provided' });
    }

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captchaResponse}`;

    try {
        const response = await fetch(verificationUrl, { method: 'POST' });
        const data = await response.json();

        if (data.success) {
            // Log or store the prolificID along with the success message
            console.log(`CAPTCHA success for Prolific ID: ${prolificID}`);

            // You can also store the prolificID in a database here

            res.json({ success: true, prolificID });
        } else {
            res.json({ success: false, message: 'CAPTCHA verification failed' });
        }
    } catch (error) {
        console.error('Error verifying CAPTCHA:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
