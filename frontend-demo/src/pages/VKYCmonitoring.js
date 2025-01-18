import React, { useState, useEffect } from 'react';
import './VKYCmonitoring.css';
import Toast from './Toast'; // Assuming a reusable Toast component

const VKYCmonitoring = () => {
  const [videoStream, setVideoStream] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [toast, setToast] = useState(null); // Toast state

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
