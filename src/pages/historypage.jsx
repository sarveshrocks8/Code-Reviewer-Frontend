import React, { useEffect, useState } from "react";

const HistoryPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/historypage", {
          method: "GET",
          credentials: "include", // for session cookies
        });

        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching review history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📜 Your Code Review History
        </h2>

        {loading ? (
          <div className="text-center text-gray-500">⏳ Loading...</div>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-600">No review history found.</p>
        ) : (
          <ul className="space-y-6">
            {reviews.map((r) => (
              <li
                key={r.id}
                className="bg-gray-50 hover:bg-white transition duration-200 border border-gray-200 p-6 rounded-xl shadow-sm"
              >
                <p className="text-sm text-gray-500 mb-2">
                  <strong>🗓 Date:</strong>{" "}
                  {new Date(r.reviewed_at).toLocaleString()}
                </p>

                <div className="mb-4">
                  <p className="font-semibold text-gray-700 mb-1">💻 Code:</p>
                  <pre className="bg-gray-100 text-sm font-mono p-4 rounded-md whitespace-pre-wrap break-words overflow-x-auto">
                    {r.code}
                  </pre>
                </div>

                <div>
                  <p className="font-semibold text-gray-700 mb-1">🧠 Review:</p>
                  <div className="bg-blue-50 p-4 rounded-md text-gray-800 text-sm whitespace-pre-wrap">
                    {r.feedback}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
