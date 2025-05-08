const express = require('express');
const instagramRoutes = require('./routes/instagram-routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', instagramRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
