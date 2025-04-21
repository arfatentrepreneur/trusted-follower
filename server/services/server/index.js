const express = require('express');
const cors = require('cors');
const instagramRoutes = require('./routes/instagram-routes');
const mockApi = require('../boostpanel/mock-api');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock BoostPanel API
app.use('/boostpanel', mockApi);

// Routes
app.use('/api', instagramRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
