import { useEffect, useState } from "react";
import API_BASE_URL from "../config";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* User List Card */}
        <div className="bg-white shadow-md rounded-3xl p-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">👥 Users List</h2>
          <ul className="space-y-3">
            {users.map((user) => (
              <li key={user.id} className="flex justify-between items-center p-3 rounded-xl bg-gray-50 hover:bg-purple-50 transition">
                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <span className="text-xs text-gray-500">ID: {user.id}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Add User Form Card */}
        <div className="bg-white shadow-md rounded-3xl p-6">
          <h2 className="text-2xl font-bold text-green-600 mb-6">➕ Add New User</h2>
          <form onSubmit={handleAddUser} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
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
              <label className="block text-gray-700 font-medium mb-1">Email</label>
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
              <label className="block text-gray-700 font-medium mb-1">Password</label>
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
      </div>
    </div>
  );
};

export default UsersList;
