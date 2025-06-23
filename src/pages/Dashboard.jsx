
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/review/my-submissions", {
      withCredentials: true,
    })
    .then(res => setReviews(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Code Reviews</h2>
      {reviews.map((rev, index) => (
        <div key={index} className="border p-2 my-2 rounded">
          <pre className="bg-gray-100 p-2">{rev.code}</pre>
          <p className="text-green-700 mt-2">Review: {rev.review}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
