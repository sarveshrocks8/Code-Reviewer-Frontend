
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const PrivateRoute = ({ children }) => {
  
    console.log("Auth check:", localStorage.getItem("isAuthenticated"));
    //console.log(isAuthenticated);

  const isAuthenticated = useContext(AuthContext);

  console.log(isAuthenticated);
  console.log("Auth check:", localStorage.getItem("isAuthenticated"));
  console.log("hello");

  return isAuthenticated ? children : <Navigate to="/login" replace/>;
};

export default PrivateRoute;
