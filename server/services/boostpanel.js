const placeOrder = async (postUrl, quantity) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: `${quantity} likes ordered` });
    }, 1000);
  });
};

module.exports = { placeOrder };
