import React, { useState } from 'react';
import './Errorpage.css';
import Toast from './Toast'; // Assuming a reusable Toast component

const Errorpage = () => {
  const [toast, setToast] = useState(null); // Toast state

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Auto-hide toast after 3 seconds
  };

  const reloadPage = () => {
    showToast("Reloading the page...", "info"); // Show toast before reload
    setTimeout(() => window.location.reload(), 1000); // Delay reload for better UX
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
            <li><a href="/">Dashboard</a></li>
            <li><a href="/spam-detection">Spam Detection</a></li>
            <li><a href="/deepfake-detection">Deepfake Detection</a></li>
            <li><a href="/fraud-detection">Financial Fraud Detection</a></li>
            <li><a href="/vkyc-monitoring">vKYC Monitoring</a></li>
            <li><a href="#alerts">Alerts</a></li>
            <li><a href="#reports">Reports</a></li>
            <li><a href="#account-settings">Account Settings</a></li>
          </ul>
        </div>
        <div className="sidebar-footer">
          <button onClick={() => showToast("Logged out successfully!", "info")}>Logout</button>
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
