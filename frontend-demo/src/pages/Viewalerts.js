import React, { useState } from 'react';
import './Viewalerts.css';

const Viewalerts = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, message: 'Suspicious login attempt detected.', type: 'Security', time: '2025-01-15 10:00 AM' },
    { id: 2, message: 'Unusual transaction activity flagged.', type: 'Fraud', time: '2025-01-16 2:30 PM' },
    { id: 3, message: 'Deepfake content detected in video.', type: 'Content', time: '2025-01-16 5:45 PM' },
    { id: 4, message: 'Multiple failed vKYC attempts reported.', type: 'KYC', time: '2025-01-17 9:15 AM' },
  ]);

  const [filter, setFilter] = useState('All');

  // Handle dismissing an alert
  const dismissAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  // Handle filtering alerts
  const filteredAlerts = filter === 'All' ? alerts : alerts.filter((alert) => alert.type === filter);

  return (
    <div className="view-alerts-wrapper">
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
            <li><a href="/view-alerts">View Alerts</a></li>
            <li><a href="#reports">Reports</a></li>
            <li><a href="#account-settings">Account Settings</a></li>
          </ul>
        </div>
        <div className="sidebar-footer">
          <button>Logout</button>
        </div>
      </div>

      <div className="view-alerts-content">
        <div className="view-alerts-header">
          <h1>View Alerts</h1>
          <p>Stay updated with the latest alerts regarding financial security.</p>
        </div>

        <div className="filter-buttons">
          <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</button>
          <button className={filter === 'Security' ? 'active' : ''} onClick={() => setFilter('Security')}>Security</button>
          <button className={filter === 'Fraud' ? 'active' : ''} onClick={() => setFilter('Fraud')}>Fraud</button>
          <button className={filter === 'Content' ? 'active' : ''} onClick={() => setFilter('Content')}>Content</button>
          <button className={filter === 'KYC' ? 'active' : ''} onClick={() => setFilter('KYC')}>KYC</button>
        </div>

        <div className="alerts-container">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <div key={alert.id} className={`alert-item alert-${alert.type.toLowerCase()}`}>
                <h2>{alert.type} Alert</h2>
                <p>{alert.message}</p>
                <span>{alert.time}</span>
                <button className="dismiss-button" onClick={() => dismissAlert(alert.id)}>Dismiss</button>
              </div>
            ))
          ) : (
            <p className="no-alerts">No alerts to display for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Viewalerts;
