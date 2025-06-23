import React, { useState } from 'react';
import axios from "axios";

const ReviewForm = () => {
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setReview('');
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:3000/api/review',
        { code },
        { withCredentials: true }
      );
      setReview(response.data.review);
    } catch (err) {
      console.error(err);
      setError('❌ Failed to get review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center py-10 px-4">
      <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">🤖 AI Code Reviewer</h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            rows="10"
            className="w-full p-4 text-sm font-mono border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition duration-200"
          >
            {loading ? 'Reviewing...' : 'Submit Code'}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-600 text-center font-medium">{error}</p>
        )}

        {review && (
          <div className="mt-10 bg-gray-100 p-6 rounded-xl shadow-inner">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">🧠 AI Review:</h3>
            <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-800">
              {review}
            </pre>
          </div>
        )}

        {/* Future history button placeholder */}
        <div className="mt-10 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Your History</h3>
          <button
            type="button"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl transition duration-200"
          >
            View History
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
