const express = require('express');
const app = express();

app.use(express.json());

app.post('/mock-api', (req, res) => {
  const { key, action, service, link, quantity } = req.body;

  if (key !== 'mock_key' || action !== 'add') {
    return res.status(400).json({ error: 'Invalid request' });
  }

  console.log(`Mock BoostPanel: Sending ${quantity} likes to ${link}`);
  res.json({ orderId: 'mock_123', status: 'Success' });
});

module.exports = app;
