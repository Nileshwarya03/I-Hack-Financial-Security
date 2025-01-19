import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for redirecting
import './Dashboard.css';
import Toast from './Toast'; // Assuming Toast component is already created

const Dashboard = () => {
  const [toast, setToast] = useState(null); // Toast state
  const navigate = useNavigate();  // Hook for navigation
  
  const handleAction = (actionMessage) => {
    setToast({ message: actionMessage, type: 'info' });
    setTimeout(() => setToast(null), 3000); // Hide toast after 3 seconds
  };

  
  const handleLogout = () => {
    // Clear authentication data (sessionStorage, localStorage, or your custom auth logic)
    localStorage.removeItem('authToken'); // Assuming you use localStorage for auth token

    // Redirect to Login page
    navigate('/Login');
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
            <li><Link to="/Dashboard">Dashboard</Link></li>
            <li><Link to="/Spamdetection">Spam Detection</Link></li>
            <li><Link to="/Deepfakedetection">Deepfake Detection</Link></li>
            <li><Link to="/Financialfrauddetection">Financial Fraud Detection</Link></li>
            <li><Link to="/VKYCmonitoring">VKYC Monitoring</Link></li>
            <li><Link to="/Viewalerts">View Alerts</Link></li>
            <li><Link to="/Viewreports">View Reports</Link></li>
            <li><Link to="/Settings">Account Settings</Link></li>
          </ul>
        </div>
        <div className="sidebar-footer">
        <button onClick={handleLogout}>Logout</button>  {/* On click, logout */}
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
            <Link to="/Spamdetection">
              <button onClick={() => handleAction('Redirecting to Spam Detection...')}>View Details</button>
            </Link>
          </div>
          <div className="main-widget">
            <h2>Deepfake Detection</h2>
            <p>2 potential deepfakes detected today</p>
            <Link to="/Deepfakedetection">
              <button onClick={() => handleAction('Redirecting to Deepfake Detection...')}>Analyze Video</button>
            </Link>
          </div>
          <div className="main-widget">
            <h2>Financial Fraud Detection</h2>
            <p>Current Fraud Risk: High</p>
            <Link to="/Financialfrauddetection">
              <button onClick={() => handleAction('Redirecting to Financial Fraud Detection...')}>View Transactions</button>
            </Link>
          </div>
          <div className="main-widget">
            <h2>VKYC Monitoring</h2>
            <p>5 users pending verification</p>
            <Link to="/VKYCmonitoring">
              <button onClick={() => handleAction('Redirecting to VKYC Monitoring...')}>Start Monitoring</button>
            </Link>
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
            <Link to="/Viewalerts">
              <button onClick={() => handleAction('Redirecting to Alerts...')}>View Alerts</button>
            </Link>
          </div>
          <div className="secondary-widget">
            <h3>Reports</h3>
            <p>Generate and view detailed financial reports and insights.</p>
            <Link to="/Viewreports">
              <button onClick={() => handleAction('Redirecting to Reports...')}>View Reports</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
