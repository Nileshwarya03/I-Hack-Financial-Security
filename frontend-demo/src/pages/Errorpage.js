import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for redirecting
import './Errorpage.css';
import Toast from './Toast'; // Assuming a reusable Toast component

const Errorpage = () => {
  const [toast, setToast] = useState(null); // Toast state
  const navigate = useNavigate();  // Hook for navigation

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Auto-hide toast after 3 seconds
  };

  const reloadPage = () => {
    showToast("Reloading the page...", "info"); // Show toast before reload
    setTimeout(() => window.location.reload(), 1000); // Delay reload for better UX
  };

  
  const handleLogout = () => {
    // Clear authentication data (sessionStorage, localStorage, or your custom auth logic)
    localStorage.removeItem('authToken'); // Assuming you use localStorage for auth token

    // Redirect to Login page
    navigate('/Login');
  };

  return (
    <div className="error-wrapper">
      {toast && <Toast message={toast.message} type={toast.type} />} {/* Display toast */}

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Financial Security Hub</h2>
        </div>
        <div className="sidebar-nav">
        <ul>
            <li><Link to="/Dashboard">Dashboard</Link></li>  {/* Use Link instead of a */}
            <li><Link to="/Spamdetection">Spam Detection</Link></li>
            <li><Link to="/Deepfakedetection">Deepfake Detection</Link></li>  {/* Use Link here too */}
            <li><Link to="/Financialfrauddetection">Financial Fraud Detection</Link></li>
            <li><Link to="/VKYCmonitoring">vKYC Monitoring</Link></li>
            <li><Link to="/Viewalerts">Alerts</Link></li>
            <li><Link to="/Viewreports">Reports</Link></li>
            <li><Link to="/Settings">Account Settings</Link></li>
          </ul>
        </div>
        <div className="sidebar-footer">
        <button onClick={handleLogout}>Logout</button>  {/* On click, logout */}
        </div>
      </div>

      {/* Error Content */}
      <div className="error-container">
        <h1>Oops! Something went wrong.</h1>
        <p>We couldn't process your request. Please try again later or refresh the page.</p>
        <button className="reloadPage-button" onClick={reloadPage}>Reload Page</button>
      </div>
    </div>
  );
};

export default Errorpage;
