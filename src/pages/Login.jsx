import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import GoogleLoginButton from "./GoogleLoginButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Login Successful!");
        login();
        localStorage.setItem("isAuthenticated", "true");
        console.log("User Data:", data.user);
        navigate("/review");
      } else {
        setMessage("❌ Invalid Credentials!");
      }
    } catch (error) {
      setMessage("❌ Server Error");
    }
  };

  return (
   <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-300 via-indigo-200 to-purple-200">
  {/* Blurred circles for decoration */}
  <div className="absolute w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse top-0 left-0"></div>
  <div className="absolute w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse bottom-0 right-0"></div>

  {/* Card */}
  <div className="relative z-10 bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Login</h2>

    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-200 font-medium"
      >
        Login
      </button>
    </form>

    {message && (
      <p className="mt-4 text-sm font-medium text-gray-600">{message}</p>
    )}

    <div className="my-6 flex items-center justify-center">
      <div className="h-px bg-gray-300 w-1/4"></div>
      <span className="mx-4 text-gray-500 text-sm">or</span>
      <div className="h-px bg-gray-300 w-1/4"></div>
    </div>

    <GoogleLoginButton />

    <a href="http://localhost:3000/auth/google">
      <button className="mt-4 w-full bg-sky-500 hover:bg-sky-600 text-white py-3 px-6 rounded-xl transition duration-200 font-medium">
        Login with Google
      </button>
    </a>
  </div>
</div>

  );
};

export default Login;
