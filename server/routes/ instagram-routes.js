const express = require('express');
const router = express.Router();

const ipRequests = new Map();

router.post('/free-likes', (req, res) => {
  const { postUrl, userIp } = req.body;

  if (!postUrl || !userIp) {
    return res.status(400).json({ error: 'Missing postUrl or userIp' });
  }

  const now = Date.now();
  const lastRequest = ipRequests.get(userIp);

  if (lastRequest && now - lastRequest < 10 * 60 * 60 * 1000) {
    return res.status(429).json({ error: 'Please wait 10 hours before making another request' });
  }

  ipRequests.set(userIp, now);

  const likes = Math.floor(Math.random() * (100 - 50 + 1)) + 50;

  res.json({ message: `${likes} free likes sent to your post instantly! Next request in 10 hours.` });
});

module.exports = router;
