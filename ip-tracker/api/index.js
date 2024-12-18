const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:63174', // Replace with your frontend URL
  }));
  // app.use(cors()); // Allow requests from any origin

let visitorData = []; // Store visitor IPs

// Route to get the public IP address
app.get('/api/ip', (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const formattedIp = userIp.includes('::ffff:') ? userIp.split('::ffff:')[1] : userIp;

    // Log and store the visitor's IP address
    visitorData.push({ ip: formattedIp, timestamp: new Date().toISOString() });
    console.log(`Visitor IP: ${formattedIp}`);

    res.json({ ip: formattedIp });
});

// Route to get all logged visitor data
app.get('/api/visitors', (req, res) => {
    res.json(visitorData);
});
app.listen(9000, () => console.log('Server running on port 9000'));

module.exports = app;
