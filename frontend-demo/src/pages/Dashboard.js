import React, { useState } from 'react';
import './Dashboard.css';
import Toast from './Toast'; // Assuming Toast component is already created

const Dashboard = () => {
  const [toast, setToast] = useState(null); // Toast state

  const handleAction = (actionMessage) => {
    setToast({ message: actionMessage, type: 'info' });
    setTimeout(() => setToast(null), 3000); // Hide toast after 3 seconds
  };

  return (
    <div className="dashboard-wrapper">
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
          <button onClick={() => handleAction('Logged out successfully.')}>Logout</button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Welcome to Dashboard</h1>
          <p>Your one-stop solution for managing financial and security risks.</p>
        </header>

        <div className="dashboard-main">
          <div className="main-widget">
            <h2>Spam Detection</h2>
            <p>Latest Scan Results: 95% accuracy</p>
            <button onClick={() => handleAction('Redirecting to Spam Detection...')}>
              View Details
            </button>
          </div>
          <div className="main-widget">
            <h2>Deepfake Detection</h2>
            <p>2 potential deepfakes detected today</p>
            <button onClick={() => handleAction('Redirecting to Deepfake Detection...')}>
              Analyze Video
            </button>
          </div>
          <div className="main-widget">
            <h2>Financial Fraud Detection</h2>
            <p>Current Fraud Risk: High</p>
            <button onClick={() => handleAction('Redirecting to Financial Fraud Detection...')}>
              View Transactions
            </button>
          </div>
          <div className="main-widget">
            <h2>vKYC Monitoring</h2>
            <p>5 users pending verification</p>
            <button onClick={() => handleAction('Redirecting to vKYC Monitoring...')}>
              Start Monitoring
            </button>
          </div>
        </div>

        <div className="dashboard-secondary">
          <div className="secondary-widget">
            <h3>Account Security Tips</h3>
            <ul>
              <li>Use strong, unique passwords for each account.</li>
              <li>Enable two-factor authentication where possible.</li>
              <li>Beware of phishing scams and fraudulent links.</li>
            </ul>
          </div>
          <div className="secondary-widget">
            <h3>Recent Activities</h3>
            <ul>
              <li>Logged in from a new device - Jan 16, 2025</li>
              <li>Generated a financial risk report - Jan 15, 2025</li>
              <li>Updated account settings - Jan 14, 2025</li>
            </ul>
          </div>
        </div>

        <div className="dashboard-additional">
          <div className="secondary-widget">
            <h3>Alerts</h3>
            <p>Stay updated with the latest financial security alerts and notifications.</p>
            <button onClick={() => handleAction('Redirecting to Alerts...')}>View Alerts</button>
          </div>
          <div className="secondary-widget">
            <h3>Reports</h3>
            <p>Generate and view detailed financial reports and insights.</p>
            <button onClick={() => handleAction('Redirecting to Reports...')}>View Reports</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
