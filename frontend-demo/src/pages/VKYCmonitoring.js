import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for redirecting
import './VKYCmonitoring.css';
import Toast from './Toast'; // Assuming a reusable Toast component

const VKYCmonitoring = () => {
  const [videoStream, setVideoStream] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [toast, setToast] = useState(null); // Toast state
  const navigate = useNavigate();  // Hook for navigation

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Auto-hide toast after 3 seconds
  };

  useEffect(() => {
    if (isMonitoring) {
      startVideoStream();
    } else {
      stopVideoStream();
    }
    // Clean up the video stream on component unmount
    return () => {
      stopVideoStream();
    };
  }, [isMonitoring]);

  const startVideoStream = () => {
    const videoElement = document.getElementById('video-feed');
    const constraints = { video: { facingMode: 'user' } };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        setVideoStream(stream);
        videoElement.srcObject = stream;
        showToast("Video stream started successfully", "success");
      })
      .catch((err) => {
        console.error('Error accessing webcam: ', err);
        showToast("Error accessing webcam. Please check your device.", "error");
      });
  };

  const stopVideoStream = () => {
    if (videoStream) {
      const tracks = videoStream.getTracks();
      tracks.forEach((track) => track.stop());
      setVideoStream(null);
      showToast("Video stream stopped", "info");
    }
  };

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
  };

  
  const handleLogout = () => {
    // Clear authentication data (sessionStorage, localStorage, or your custom auth logic)
    localStorage.removeItem('authToken'); // Assuming you use localStorage for auth token

    // Redirect to Login page
    navigate('/Login');
  };

  return (
    <div className="vkyc-monitoring-wrapper">
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
      <div className="vkyc-monitoring-content">
        <div className="vkyc-monitoring-container">
          <div className="vkyc-monitoring-header">
            <h1>vKYC Monitoring</h1>
          </div>

          <div className="video-container">
            <video id="video-feed" width="100%" height="auto" autoPlay></video>
          </div>

          <div className="monitoring-controls">
            <button onClick={toggleMonitoring}>
              {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VKYCmonitoring;
