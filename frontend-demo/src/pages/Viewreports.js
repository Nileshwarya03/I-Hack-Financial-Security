import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for redirecting
import './Viewreports.css';
import Toast from './Toast'; // Assuming a reusable Toast component

const Viewreports = () => {
  const [reports] = useState([
    { id: 1, title: 'Spam Detection Summary', date: '2025-01-14', file: 'spam_report.pdf' },
    { id: 2, title: 'Deepfake Analysis Report', date: '2025-01-15', file: 'deepfake_analysis.pdf' },
    { id: 3, title: 'Fraud Detection Insights', date: '2025-01-16', file: 'fraud_report.pdf' },
    { id: 4, title: 'vKYC Monitoring Overview', date: '2025-01-17', file: 'vkyc_overview.pdf' },
  ]);

  const [toast, setToast] = useState(null); // Toast state
  const navigate = useNavigate();  // Hook for navigation

  // Show toast notifications
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Auto-hide toast after 3 seconds
  };

  const downloadReport = (file) => {
    showToast(`Downloading ${file}`, 'success'); // Trigger toast on download
  };

  
  const handleLogout = () => {
    // Clear authentication data (sessionStorage, localStorage, or your custom auth logic)
    localStorage.removeItem('authToken'); // Assuming you use localStorage for auth token

    // Redirect to Login page
    navigate('/Login');
  };

  return (
    <div className="view-reports-wrapper">
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

      <div className="view-reports-content">
        <div className="view-reports-header">
          <h1>View Reports</h1>
          <p>Access detailed reports on financial security activities.</p>
        </div>

        <div className="reports-container">
          {reports.map((report) => (
            <div key={report.id} className="report-item">
              <h2>{report.title}</h2>
              <p>Generated on: {report.date}</p>
              <button
                className="download-button"
                onClick={() => downloadReport(report.file)}
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Viewreports;
