import React, { useState } from 'react';
import './Deepfakedetection.css';

const Deepfakedetection = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload an image or video");
      return;
    }

    // Mocking a call to the backend (which would run the Python code)
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/check-deepfake', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    setResult(data.result);
  };

  return (
    <div className="deepfake-detection-wrapper">
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
