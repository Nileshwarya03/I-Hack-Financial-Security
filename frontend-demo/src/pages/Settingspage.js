import React, { useState } from 'react';
import './Settingspage.css';

const Settingspage = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '9876543210',
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
  });

  const [password, setPassword] = useState('');

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const updatePassword = () => {
    alert('Password updated successfully.');
    setPassword('');
  };

  return (
    <div className="settings-wrapper">
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
            <li><a href="/view-reports">View Reports</a></li>
            <li><a href="/settings">Account Settings</a></li>
          </ul>
        </div>
        <div className="sidebar-footer">
          <button>Logout</button>
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
          <button className="save-button">Save Changes</button>
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
          <button className="save-button">Update Preferences</button>
        </div>

        
      </div>
    </div>
  );
};

export default Settingspage;
