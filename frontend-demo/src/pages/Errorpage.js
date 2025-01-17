import React from 'react';
import './Errorpage.css';

const Errorpage = () => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="error-wrapper">
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
            {/* <li><a href="#risk-assessment">Risk Assessment</a></li> */}
            <li><a href="#alerts">Alerts</a></li>
            <li><a href="#reports">Reports</a></li>
            <li><a href="#account-settings">Account Settings</a></li>
          </ul>
        </div>
        <div className="sidebar-footer">
          <button>Logout</button>
        </div>
      </div>

      <div className="error-container">
        <h1>Oops! Something went wrong.</h1>
        <p>We couldn't process your request. Please try again later or refresh the page.</p>
        <button className="reloadPage-button" onClick={reloadPage}>Reload Page</button>
        </div>
    </div>
  );
};

export default Errorpage;