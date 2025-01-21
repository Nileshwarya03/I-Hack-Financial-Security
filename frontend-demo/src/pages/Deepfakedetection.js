import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for redirecting
import './Deepfakedetection.css';
import Toast from './Toast'; // Assuming a reusable Toast component

const Deepfakedetection = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [toast, setToast] = useState(null); // Toast state
  const navigate = useNavigate();  // Hook for navigation

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Auto-hide toast after 3 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      showToast("Please upload an image or video", "warning");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/deepfake-detection', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
        showToast("Deepfake analysis completed successfully!", "success");
      } else {
        showToast("Failed to analyze the file. Please try again.", "error");
      }
    } catch (error) {
      showToast("An error occurred. Please try again later.", "error");
      console.error("Error:", error); // Log the error for debugging
    }
  };

  const handleLogout = () => {
    // Clear authentication data (sessionStorage, localStorage, or your custom auth logic)
    localStorage.removeItem('authToken'); // Assuming you use localStorage for auth token

    // Redirect to Login page
    navigate('/Login');
  };

  return (
    <div className="deepfake-detection-wrapper">
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
            <li><Link to="/VKYCmonitoring">vKYC Monitoring</Link></li>
            <li><Link to="/Viewalerts">Alerts</Link></li>
            <li><Link to="/Viewreports">Reports</Link></li>
            <li><Link to="/Settings">Account Settings</Link></li>
          </ul>
        </div>
        <div className="sidebar-footer">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Content */}
      <div className="deepfake-detection-content">
        <div className="deepfake-detection-container">
          <div className="deepfake-detection-header">
            <h1>Deepfake Detection</h1>
          </div>

          <form onSubmit={handleSubmit} className="deepfake-detection-form">
            <div className="form-group">
              <label htmlFor="file">Upload Image or Video:</label>
              <input
                type="file"
                id="file"
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </div>
            <button type="submit">Check Deepfake</button>
          </form>

          {result && (
            <div className="result">
              <h2>Result:</h2>
              <p>{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deepfakedetection;
