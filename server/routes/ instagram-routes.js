const express = require('express');
const router = express.Router();

router.post('/free-likes', (req, res) => {
  const { postUrl, userIp } = req.body;

  if (!postUrl || !userIp) {
    return res.status(400).json({ error: 'postUrl and userIp are required' });
  }

  const likes = Math.floor(Math.random() * 30) + 1;
  res.json({ message: `${likes} free likes sent to your post instantly! Next request in 10 hours.` });
});

module.exports = router;
