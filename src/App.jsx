import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UsersList from "./components/UsersList.jsx";
import Login from "./pages/Login.jsx";
import ReviewForm from './components/ReviewForm';
import Navbar from './components/Navbar.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from './AuthContext.jsx';
import HistoryPage from './pages/historypage.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 font-sans">
          
          {/* Header */}
          <header className="bg-white shadow-md py-4 mb-6">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 sm:mb-0">🚀 Code Reviewer App</h1>
              <Navbar />
            </div>
          </header>

          {/* Page Content */}
          <main className="max-w-5xl mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<UsersList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/review" element={<PrivateRoute><ReviewForm /></PrivateRoute>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/historypage" element={<HistoryPage />} />
            </Routes>
          </main>

        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
