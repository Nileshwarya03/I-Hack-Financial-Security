import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
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
            <li><a href="#risk-assessment">Risk Assessment</a></li>
            <li><a href="#alerts">Alerts</a></li>
            <li><a href="#reports">Reports</a></li>
            <li><a href="#account-settings">Account Settings</a></li>
          </ul>
        </div>
        <div className="sidebar-footer">
          <button>Logout</button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Welcome to Dashboard</h1>
          <p>Your one-stop solution for managing financial and security risks.</p>
        </header>

        <div className="dashboard-main">
          {/* Risk Assessment Widget */}
          <div className="main-widget large-widget">
            <h2>Risk Assessment</h2>
            <p>Analyze your financial data to identify potential risks and vulnerabilities.</p>
            <button>Start Assessment</button>
          </div>

          {/* Spam Detection Widget */}
          <div className="main-widget">
            <h2>Spam Detection</h2>
            <p>Latest Scan Results: 95% accuracy</p>
            <button onClick={() => window.location.href = '/spam-detection'}>View Details</button>
          </div>

          {/* Deepfake Detection Widget */}
          <div className="main-widget">
            <h2>Deepfake Detection</h2>
            <p>2 potential deepfakes detected today</p>
            <button onClick={() => window.location.href = '/deepfake-detection'}>Analyze Video</button>
          </div>

          {/* Financial Fraud Detection Widget */}
          <div className="main-widget">
            <h2>Financial Fraud Detection</h2>
            <p>Current Fraud Risk: High</p>
            <button onClick={() => window.location.href = '/fraud-detection'}>View Transactions</button>
          </div>

          {/* vKYC Monitoring Widget */}
          <div className="main-widget">
            <h2>vKYC Monitoring</h2>
            <p>5 users pending verification</p>
            <button onClick={() => window.location.href = '/vkyc-monitoring'}>Start Monitoring</button>
          </div>
        </div>

        <div className="dashboard-secondary">
          {/* Account Security Tips Widget */}
          <div className="secondary-widget">
            <h3>Account Security Tips</h3>
            <ul>
              <li>Use strong, unique passwords for each account.</li>
              <li>Enable two-factor authentication where possible.</li>
              <li>Beware of phishing scams and fraudulent links.</li>
            </ul>
          </div>

          {/* Recent Activities Widget */}
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
          {/* Alerts Widget */}
          <div className="secondary-widget">
            <h3>Alerts</h3>
            <p>Stay updated with the latest financial security alerts and notifications.</p>
            <button>View Alerts</button>
          </div>

          {/* Reports Widget */}
          <div className="secondary-widget">
            <h3>Reports</h3>
            <p>Generate and view detailed financial reports and insights.</p>
            <button>View Reports</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
