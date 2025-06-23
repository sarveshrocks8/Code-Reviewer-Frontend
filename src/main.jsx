//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
//import './index.css'
//import App from './App.jsx'

//createRoot(document.getElementById('root')).render(
  //<StrictMode>
    //<App />
  //</StrictMode>,
//)

import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom"; //updated code
import App from "./App";
//import "./index.css"; // ✅ (Agar CSS file hai to include kar sakte ho)
import { AuthProvider } from "./AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
//import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css'; // 👈 Global CSS import

const clientId = 
import.meta.env.GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  
    

    // <AuthProvider> <App /> </AuthProvider>
  <GoogleOAuthProvider clientId={clientId}>
    
      <AuthProvider>
        <App />
      </AuthProvider>
    
  </GoogleOAuthProvider>
      
);