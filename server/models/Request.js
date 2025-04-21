// Mock schema (no MongoDB)
const requests = [];

const findOne = (query) => {
  return requests.find((req) => req.userIp === query.userIp);
};

const findOneAndUpdate = (query, update, options) => {
  const index = requests.findIndex((req) => req.userIp === query.userIp);
  const newRequest = { userIp: query.userIp, lastRequest: update.lastRequest };
  if (index === -1) {
    requests.push(newRequest);
  } else {
    requests[index] = newRequest;
  }
  return newRequest;
};

module.exports = { findOne, findOneAndUpdate };
