import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for redirecting
import './Viewalerts.css';
import Toast from './Toast'; // Assuming a reusable Toast component

const Viewalerts = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, message: 'Suspicious login attempt detected.', type: 'Security', time: '2025-01-15 10:00 AM' },
    { id: 2, message: 'Unusual transaction activity flagged.', type: 'Fraud', time: '2025-01-16 2:30 PM' },
    { id: 3, message: 'Deepfake content detected in video.', type: 'Content', time: '2025-01-16 5:45 PM' },
    { id: 4, message: 'Multiple failed vKYC attempts reported.', type: 'KYC', time: '2025-01-17 9:15 AM' },
  ]);

  const [filter, setFilter] = useState('All');
  const [toast, setToast] = useState(null); // Toast state
  const navigate = useNavigate();  // Hook for navigation

  // Show toast notifications
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Auto-hide toast after 3 seconds
  };

  // Handle dismissing an alert
  const dismissAlert = (id) => {
    const dismissedAlert = alerts.find((alert) => alert.id === id);
    setAlerts(alerts.filter((alert) => alert.id !== id));
    showToast(`Dismissed: ${dismissedAlert.message}`, 'success'); // Show dismissal toast
  };

  // Handle filtering alerts
  const filteredAlerts = filter === 'All' ? alerts : alerts.filter((alert) => alert.type === filter);

  
  const handleLogout = () => {
    // Clear authentication data (sessionStorage, localStorage, or your custom auth logic)
    localStorage.removeItem('authToken'); // Assuming you use localStorage for auth token

    // Redirect to Login page
    navigate('/Login');
  };

  return (
    <div className="view-alerts-wrapper">
      {toast && <Toast message={toast.message} type={toast.type} />} {/* Display toast */}

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

      <div className="view-alerts-content">
        <div className="view-alerts-header">
          <h1>View Alerts</h1>
          <p>Stay updated with the latest alerts regarding financial security.</p>
        </div>

        <div className="alerts-filter-buttons">
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
