const express = require('express');
const app = express();
const port = 3000; // Ya jo port chahiye

// Middleware
app.use(express.json());

// Routes
const instagramRoutes = require('../routes/instagram-routes');
app.use('/api', instagramRoutes);

// Server Start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
