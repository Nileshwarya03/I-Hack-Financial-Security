import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for redirecting
import './Settingspage.css';
import Toast from './Toast'; // Assuming a reusable Toast component

const Settingspage = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '9876543210',
  });
  const navigate = useNavigate();  // Hook for navigation

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
  });

  const [password, setPassword] = useState('');
  const [toast, setToast] = useState(null); // State for toast notifications

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  // Show toast notifications
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Auto-hide toast after 3 seconds
  };

  const updatePassword = () => {
    showToast('Password updated successfully.', 'success'); // Trigger toast on password update
    setPassword('');
  };

  const saveProfileChanges = () => {
    showToast('Profile information saved successfully.', 'success'); // Trigger toast on profile save
  };

  const updateNotificationPreferences = () => {
    showToast('Notification preferences updated.', 'success'); // Trigger toast on notification preferences update
  };

  
  const handleLogout = () => {
    // Clear authentication data (sessionStorage, localStorage, or your custom auth logic)
    localStorage.removeItem('authToken'); // Assuming you use localStorage for auth token

    // Redirect to Login page
    navigate('/Login');
  };

  return (
    <div className="settings-wrapper">
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

      <div className="settings-content">
        <div className="settings-header">
          <h1>Account Settings</h1>
          <p>Manage your account and notification preferences.</p>
        </div>

        <div className="settings-section">
          <h2>Profile Information</h2>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
          />
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleProfileChange}
          />
          <button className="save-button" onClick={saveProfileChanges}>Save Changes</button>
        </div>

        <div className="settings-section">
          <h2>Notification Preferences</h2>
          <label>
            <input
              type="checkbox"
              name="emailAlerts"
              checked={notifications.emailAlerts}
              onChange={handleNotificationChange}
            />
            Email Alerts
          </label>
          <label>
            <input
              type="checkbox"
              name="smsAlerts"
              checked={notifications.smsAlerts}
              onChange={handleNotificationChange}
            />
            SMS Alerts
          </label>
          <button className="save-button" onClick={updateNotificationPreferences}>Update Preferences</button>
        </div>
        <p>Note: This settings page is for display purposes only. Changes made here do not reflect actual updates.</p>

      </div>
    </div>
  );
};

export default Settingspage;
