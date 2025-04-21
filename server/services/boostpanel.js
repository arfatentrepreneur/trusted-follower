const axios = require('axios');

// Mock BoostPanel API
const boostPanel = {
  url: '/boostpanel/mock-api', // Simulated endpoint
  key: 'mock_key',
  serviceId: 'instagram_likes_30',
};

const placeOrder = async (postUrl, quantity) => {
  try {
    const response = await axios.post(boostPanel.url, {
      key: boostPanel.key,
      action: 'add',
      service: boostPanel.serviceId,
      link: postUrl,
      quantity,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'BoostPanel error');
  }
};

module.exports = { placeOrder };
