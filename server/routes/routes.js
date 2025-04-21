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
    // Check rate limit (10 hours cooldown)
    const tenHours = 10 * 60 * 60 * 1000;
    const lastRequest = await Request.findOne({ userIp });

    if (lastRequest && Date.now() - new Date(lastRequest.lastRequest) < tenHours) {
      return res.status(429).json({ error: 'You can only get free likes every 10 hours' });
    }

    // Place order via BoostPanel
    const smmResponse = await placeOrder(postUrl, 30);

    // Update request time
    await Request.findOneAndUpdate(
      { userIp },
      { userIp, lastRequest: new Date() },
      { upsert: true }
    );

    res.json({ message: '30 likes sent to your post!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
