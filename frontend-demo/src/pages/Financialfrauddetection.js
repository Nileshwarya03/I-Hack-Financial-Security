import React, { useState } from 'react';
import './Financialfrauddetection.css';

const Financialfrauddetection = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a transaction dataset");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    // Send the file to the backend for processing
    const response = await fetch('/api/financial-fraud-detection', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <div className="fraud-detection-wrapper">
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
            {/* <li><a href="#risk-assessment">Risk Assessment</a></li> */}
            <li><a href="#alerts">Alerts</a></li>
            <li><a href="#reports">Reports</a></li>
            <li><a href="#account-settings">Account Settings</a></li>
          </ul>
        </div>
        <div className="sidebar-footer">
          <button>Logout</button>
        </div>
      </div>

      <div className="fraud-detection-content">
        <div className="fraud-detection-container">
          <div className="fraud-detection-header">
            <h1>Financial Fraud Detection</h1>
          </div>

          <form onSubmit={handleSubmit} className="fraud-detection-form">
            <div className="form-group">
              <label htmlFor="file">Upload Transaction Dataset (CSV/JSON):</label>
              <input
                type="file"
                id="file"
                accept=".csv, .json"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Detect Fraud"}
            </button>
          </form>

          {result.length > 0 && (
            <div className="result">
              <h2>Fraud Detection Results:</h2>
              <table>
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Account ID</th>
                    <th>Transaction Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.transaction_id}</td>
                      <td>{transaction.account_id}</td>
                      <td>{transaction.transaction_amount}</td>
                      <td>{transaction.anomaly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Financialfrauddetection;
