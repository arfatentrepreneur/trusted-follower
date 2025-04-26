const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const { placeOrder } = require('../services/boostpanel');

router.post('/free-likes', async (req, res) => {
  const { postUrl, userIp } = req.body;
  if (!postUrl || !userIp) {
    return res.status(400).json({ error: 'Post URL and IP required' });
  }
  try {
    const tenHours = 10 * 60 * 60 * 1000;
    const lastRequest = await Request.findOne({ userIp });

    if (!lastRequest) {
      const randomLikes = Math.floor(Math.random() * 30) + 1; // Random 1-30 likes
      const smmResponse = await placeOrder(postUrl, randomLikes); // Mock
      await Request.findOneAndUpdate(
        { userIp },
        { lastRequest: new Date(), requestCount: 1 },
        { upsert: true }
      );
      return res.json({ message: `${randomLikes} free likes sent to your post instantly! Next request in 10 hours.` });
    } else {
      const timeSinceLast = Date.now() - new Date(lastRequest.lastRequest);
      if (timeSinceLast < tenHours) {
        const remainingTime = Math.ceil((tenHours - timeSinceLast) / (60 * 60 * 1000));
        return res.status(429).json({ error: `Wait ${remainingTime} hours for your next free likes.` });
      }
      const randomLikes = Math.floor(Math.random() * 30) + 1; // Random 1-30 likes
      const smmResponse = await placeOrder(postUrl, randomLikes); // Mock
      await Request.findOneAndUpdate(
        { userIp },
        { lastRequest: new Date(), requestCount: lastRequest.requestCount + 1 },
        { upsert: true }
      );
      res.json({ message: `${randomLikes} free likes sent to your post! No SMM panel charges.` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
