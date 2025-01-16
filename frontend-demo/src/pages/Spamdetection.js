import React, { useState } from 'react';
import './Spamdetection.css';

const Spamdetection = () => {
  const [callMetadata, setCallMetadata] = useState({
    callerId: '',
    callDuration: '',
    callFrequency: ''
  });
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mocking a call to the backend (which would run the Python code)
    const response = await fetch('/api/check-spam', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ callMetadata, transcript })
    });

    const data = await response.json();
    setResult(data.result);
  };

  return (
    <div className="spam-detection-wrapper">
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

      <div className="spam-detection-content">
        <div className="spam-detection-container">
          <div className="spam-detection-header">
            <h1>Spam Detection</h1>
          </div>

          <form onSubmit={handleSubmit} className="spam-detection-form">
            <div className="form-group">
              <label htmlFor="callerId">Caller ID:</label>
              <input
                type="text"
                id="callerId"
                value={callMetadata.callerId}
                onChange={(e) => setCallMetadata({ ...callMetadata, callerId: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="callDuration">Call Duration (seconds):</label>
              <input
                type="number"
                id="callDuration"
                value={callMetadata.callDuration}
                onChange={(e) => setCallMetadata({ ...callMetadata, callDuration: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="callFrequency">Call Frequency (calls per day):</label>
              <input
                type="number"
                id="callFrequency"
                value={callMetadata.callFrequency}
                onChange={(e) => setCallMetadata({ ...callMetadata, callFrequency: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="transcript">Transcript:</label>
              <textarea
                id="transcript"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                required
              />
            </div>
            <button type="submit">Check Spam</button>
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

export default Spamdetection;
