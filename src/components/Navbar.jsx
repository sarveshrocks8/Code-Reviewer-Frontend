import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../pages/LogoutButton';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold text-white">Code Reviewer</h2>
          </div>

          <ul className="flex space-x-6 items-center">
            <li>
              <Link to="/" className="text-white hover:text-blue-400 transition duration-200 font-medium">
                Users
              </Link>
            </li>
            {/* <li>
              <Link to="/review" className="text-white hover:text-blue-400 transition duration-200 font-medium">
                Review Code
              </Link>
            </li> */}
            <li>
              <Link to="/login" className="text-white hover:text-blue-400 transition duration-200 font-medium">
                Login
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-white hover:text-blue-400 transition duration-200 font-medium">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/historypage" className="text-white hover:text-blue-400 transition duration-200 font-medium">
                History
              </Link>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
