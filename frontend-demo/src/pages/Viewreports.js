import React, { useState } from 'react';
import './Viewreports.css';

const Viewreports = () => {
  const [reports] = useState([
    { id: 1, title: 'Spam Detection Summary', date: '2025-01-14', file: 'spam_report.pdf' },
    { id: 2, title: 'Deepfake Analysis Report', date: '2025-01-15', file: 'deepfake_analysis.pdf' },
    { id: 3, title: 'Fraud Detection Insights', date: '2025-01-16', file: 'fraud_report.pdf' },
    { id: 4, title: 'vKYC Monitoring Overview', date: '2025-01-17', file: 'vkyc_overview.pdf' },
  ]);

  const downloadReport = (file) => {
    // Simulate file download
    alert(`Downloading ${file}`);
  };

  return (
    <div className="view-reports-wrapper">
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
            <li><a href="#account-settings">Account Settings</a></li>
          </ul>
        </div>
        <div className="sidebar-footer">
          <button>Logout</button>
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
              <button className="download-button" onClick={() => downloadReport(report.file)}>
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
