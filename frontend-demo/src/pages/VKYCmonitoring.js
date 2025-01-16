import React, { useState, useEffect } from 'react';
import './VKYCmonitoring.css';

const VKYCmonitoring = () => {
  const [videoStream, setVideoStream] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

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
      })
      .catch((err) => {
        console.error('Error accessing webcam: ', err);
      });
  };

  const stopVideoStream = () => {
    if (videoStream) {
      const tracks = videoStream.getTracks();
      tracks.forEach((track) => track.stop());
      setVideoStream(null);
    }
  };

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
  };

  return (
    <div className="vkyc-monitoring-wrapper">
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
