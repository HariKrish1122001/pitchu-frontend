import React, { useEffect, useRef, useState,useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Home from "./Seperate/Home";
import Navbar from "./Seperate/Navbar";
import Footer from "./Seperate/Footer";
import Support from "./Seperate/Support";
import Domestic from "./Seperate/Domestic";
import International from "./Seperate/International";
import Login from "./Seperate/Login";
import Register from "./Seperate/Register";
import Dashboard2 from "./Seperate/pages/Dashboard-routes-2";
import Dashboard3 from "./Seperate/pages/Dashboard-routes-3";
import Dashboardnotification from "./Seperate/pages/Dashboard-notification";
import Transactionhistory from "./Seperate/pages/Transaction-history";
import Forgetpassord from "./Seperate/Forgetpassord";
import Passwordchange from "./Seperate/Passwordchange";
import ProtectedRoute from "./service/ProtectedRouter";
import Faq from "./Seperate/Faq";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import "./App.css";
import "../src/Assets/css/Style.css";
import "../src/Assets/css/Signin.css";
import "../src/Assets/css/Dashboard.css";

const AppContent = () => {
  const location = useLocation();
  const showNavbar = ["/", "/domestic", "/support", "/international","/faq"].includes(location.pathname);
  const [loginStatus, setLoginStatus] = useState();


  const loginIndication = (data)=>{
    try {
      setLoginStatus(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {showNavbar && <Navbar  loginIndication={loginIndication} />}
      <Routes>
        <Route path="/" element={<Home loginStatus={loginStatus} />} />
        <Route path="/support" element={<Support loginStatus={loginStatus}/>} />
        <Route path="/domestic" element={<Domestic loginStatus={loginStatus}/>} />
        <Route path="/international" element={<International loginStatus={loginStatus}/>} />
        <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
        <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
        <Route path="/route2" element={<Dashboard2 />} />
        <Route path="/route3" element={<Dashboard3 />} />
        <Route path="/dashboard-notification" element={<Dashboardnotification />} />
        <Route path="/transaction-history" element={<Transactionhistory />} />
        <Route path="/forgetpassord" element={<ProtectedRoute> <Forgetpassord /></ProtectedRoute>} />
        <Route path="/passwordchange/:token" element={<ProtectedRoute> <Passwordchange /> </ProtectedRoute>} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

export default App;
