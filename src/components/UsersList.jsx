import { useEffect, useState } from "react";
import API_BASE_URL from "../config";

// Tips jo right side panel me rotate hongi
const tips = [
  {
    title: "Faster Code Reviews",
    text: "Invite more reviewers so that pull requests get merged 2x faster."
  },
  {
    title: "Smart Team Insights",
    text: "Track how many reviews each user completes every week."
  },
  {
    title: "Secure by Design",
    text: "Strong passwords and role-based access keep your codebase safe."
  },
  {
    title: "Clear Review History",
    text: "Use the History page to quickly see who reviewed which code."
  }
];

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Users fetch karne wala useEffect (jo pehle tha)
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Right side tips change karne ke liye interval
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 4000); // 4 sec me change
    return () => clearInterval(id);
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    const newUser = { name, email, password };

    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      const addedUser = await response.json();
      setUsers([...users, addedUser]);
      setName("");
      setEmail("");
      setPassword("");
    } else {
      console.error("Failed to add user");
    }
  };

  const currentTip = tips[currentTipIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add User Form Card */}
        <div className="bg-white shadow-md rounded-3xl p-6">
          <h2 className="text-2xl font-bold text-green-600 mb-6">
            ➕ Add New User
          </h2>
          <form onSubmit={handleAddUser} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition"
            >
              🚀 Add User
            </button>
          </form>
        </div>

        {/* Right Side: Dynamic Tips + Stats Panel */}
        <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-6 overflow-hidden shadow-md flex flex-col justify-between">
          {/* Gradient blob */}
          <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-tr from-purple-500 to-pink-500 opacity-30 rounded-full blur-3xl" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500 mb-2">
              Code Reviewer Insights
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {currentTip.title}
            </h3>
            <p className="text-sm text-gray-600 max-w-md">
              {currentTip.text}
            </p>

            {/* Dots indicator */}
            <div className="flex items-center gap-2 mt-4">
              {tips.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentTipIndex
                      ? "w-5 bg-indigo-500"
                      : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Small stats boxes */}
          {/*<div className="relative mt-6 grid grid-cols-3 gap-3 text-xs">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm">
              <span className="block text-sm font-bold text-gray-900">
                24
              </span>
              <span className="block text-[10px] uppercase tracking-wide text-gray-500">
                Active Users
              </span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm">
              <span className="block text-sm font-bold text-gray-900">
                87%
              </span>
              <span className="block text-[10px] uppercase tracking-wide text-gray-500">
                PRs Reviewed
              </span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm">
              <span className="block text-sm font-bold text-gray-900">
                3.4h
              </span>
              <span className="block text-[10px] uppercase tracking-wide text-gray-500">
                Avg Review Time
              </span>
            </div>
          </div>*/}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
