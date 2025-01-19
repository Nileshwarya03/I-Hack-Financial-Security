import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for redirecting
import './Spamdetection.css';
import Toast from './Toast'; // Assuming a reusable Toast component is available

const Spamdetection = () => {
  const [callMetadata, setCallMetadata] = useState({
    callerId: '',
    callDuration: '',
    callFrequency: ''
  });
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState('');
  const [toast, setToast] = useState(null); // Toast state
  const navigate = useNavigate();  // Hook for navigation


  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Hide toast after 3 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Mocking a call to the backend (which would run the Python code)
      const response = await fetch('/api/check-spam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callMetadata, transcript })
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
        showToast('Spam check completed successfully!', 'success');
      } else {
        showToast('Failed to perform spam check. Try again.', 'error');
      }
    } catch (error) {
      showToast('An error occurred. Please try again later.', 'error');
    }
  };

  
  const handleLogout = () => {
    // Clear authentication data (sessionStorage, localStorage, or your custom auth logic)
    localStorage.removeItem('authToken'); // Assuming you use localStorage for auth token

    // Redirect to Login page
    navigate('/Login');
  };

  return (
    <div className="spam-detection-wrapper">
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
