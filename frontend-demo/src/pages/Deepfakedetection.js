import React, { useState } from 'react';
import './Deepfakedetection.css';
import Toast from './Toast'; // Assuming a reusable Toast component

const Deepfakedetection = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [toast, setToast] = useState(null); // Toast state

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

    try {
      // Mocking a call to the backend (which would run the Python code)
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/check-deepfake', {
        method: 'POST',
        body: formData
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
    }
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
