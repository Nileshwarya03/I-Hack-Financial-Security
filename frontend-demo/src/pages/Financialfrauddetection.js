import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for redirecting
import './Financialfrauddetection.css';
import Toast from './Toast'; // Assuming a reusable Toast component

const Financialfrauddetection = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // Toast state
  const navigate = useNavigate();  // Hook for navigation
  

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Auto-hide toast after 3 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      showToast("Please upload a transaction dataset", "warning");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/financial-fraud-detection', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
        showToast("Fraud detection completed successfully!", "success");
      } else {
        showToast("Failed to process the dataset. Please try again.", "error");
      }
    } catch (error) {
      showToast("An error occurred. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  
  const handleLogout = () => {
    // Clear authentication data (sessionStorage, localStorage, or your custom auth logic)
    localStorage.removeItem('authToken'); // Assuming you use localStorage for auth token

    // Redirect to Login page
    navigate('/Login');
  };

  return (
    <div className="fraud-detection-wrapper">
      {toast && <Toast message={toast.message} type={toast.type} />} {/* Display toast */}

      {/* Sidebar */}
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

      {/* Content */}
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
