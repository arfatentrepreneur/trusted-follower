import React, { useState } from 'react';
import axios from 'axios';

const FreeLikes = () => {
  const [postUrl, setPostUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postUrl) {
      setMessage('Please enter a valid Instagram post URL');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/free-likes', {
        postUrl,
        userIp: '127.0.0.1', // Mock IP
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Something went wrong');
    }
    setLoading(false);
    setPostUrl('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-md w-full p-6 rounded-lg bg-gray-800 shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-4">Free Instagram Likes</h2>
        <p className="text-center mb-6">Get 30 free likes every 10 hours!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Instagram Post URL"
            value={postUrl}
            onChange={(e) => setPostUrl(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black p-3 rounded-full hover:bg-yellow-500 transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Get Free Likes'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-400">{message}</p>}
      </div>
    </div>
  );
};

export default FreeLikes;
