const express = require('express');
const router = express.Router();

// In-memory store for tracking user requests
const userRequests = {};

router.post('/free-likes', (req, res) => {
  const { postUrl, userIp } = req.body;

  // Validation: Check if postUrl and userIp are provided
  if (!postUrl || !userIp) {
    return res.status(400).json({ error: 'postUrl and userIp are required' });
  }

  // Check if user has made a request before
  const lastRequest = userRequests[userIp];
  const currentTime = Date.now();
  const tenHoursInMs = 10 * 60 * 60 * 1000; // 10 hours in milliseconds

  if (lastRequest) {
    const timeDifference = currentTime - lastRequest.timestamp;
    if (timeDifference < tenHoursInMs) {
      const remainingTime = Math.ceil((tenHoursInMs - timeDifference) / (60 * 1000)); // Remaining time in minutes
      return res.status(429).json({
        error: `Please wait ${remainingTime} minutes before making another request.`
      });
    }
  }

  // If no request or 10 hours have passed, allow new request
  const likes = Math.floor(Math.random() * 30) + 1;
  userRequests[userIp] = { timestamp: currentTime }; // Store the current request time

  res.json({ message: `${likes} free likes sent to your post instantly! Next request in 10 hours.` });
});

module.exports = router;
