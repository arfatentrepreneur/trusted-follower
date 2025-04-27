try {
  const instagramRoutes = require('./server/routes/instagram-routes');
  console.log('File loaded successfully:', instagramRoutes);
} catch (error) {
  console.error('Error loading file:', error);
}
