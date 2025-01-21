import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './VKYCmonitoring.css';
import Toast from './Toast';

const VKYCmonitoring = () => {
  const [videoStream, setVideoStream] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [toast, setToast] = useState(null);
  const [frameInterval, setFrameInterval] = useState(null); // Interval for capturing frames
  const navigate = useNavigate();

  const showToast = (message, type, duration = 8000) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration); // Set the duration dynamically
  };
  

  useEffect(() => {
    if (isMonitoring) {
      startVideoStream();
    } else {
      stopVideoStream();
    }
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
        showToast('Video stream started successfully', 'success');

        // Start sending frames to the backend every 2 seconds
        const interval = setInterval(() => captureAndSendFrame(videoElement), 2000);
        setFrameInterval(interval);
      })
      .catch((err) => {
        console.error('Error accessing webcam: ', err);
        showToast('Error accessing webcam. Please check your device.', 'error');
      });
  };

  const stopVideoStream = () => {
    if (videoStream) {
      const tracks = videoStream.getTracks();
      tracks.forEach((track) => track.stop());
      setVideoStream(null);
      clearInterval(frameInterval); // Stop frame capture
      setFrameInterval(null);
      showToast('Video stream stopped', 'info');
    }
  };

  const captureAndSendFrame = (videoElement) => {
    try {
      // Create a canvas to capture the current video frame
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // Convert the canvas to a Base64-encoded image
      const frameData = canvas.toDataURL('image/jpeg');

      // Send the frame data to the backend
      sendFrameToBackend(frameData);
    } catch (error) {
      console.error('Error capturing or sending frame:', error);
    }
  };

  const sendFrameToBackend = async (frameData) => {
    try {
      const response = await fetch('http://localhost:5000/api/vkyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'process_frame', frameData }), // Added action to specify the task
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Backend response:', result);

        // Check the action in response and update toast message
        if (result.message === 'Frame processed') {
          const message = `Frame processed: ${result.data.result} (Confidence: ${result.data.confidence}%)`;
          showToast(message, 'success', 8000); 
        }
        else {
          showToast('Error processing frame. Check backend logs.', 'error');
        }
      } else {
        console.error('Error from backend:', response.statusText);
        showToast('Error processing frame. Check backend logs.', 'error');
      }
    } catch (error) {
      console.error('Error sending frame to backend:', error);
      showToast('Error connecting to backend.', 'error');
    }
  };

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/Login');
  };

  return (
    <div className="vkyc-monitoring-wrapper">
      {toast && <Toast message={toast.message} type={toast.type} />}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Financial Security Hub</h2>
        </div>
        <div className="sidebar-nav">
          <ul>
            <li><Link to="/Dashboard">Dashboard</Link></li>
            <li><Link to="/Spamdetection">Spam Detection</Link></li>
            <li><Link to="/Deepfakedetection">Deepfake Detection</Link></li>
            <li><Link to="/Financialfrauddetection">Financial Fraud Detection</Link></li>
            <li><Link to="/VKYCmonitoring">vKYC Monitoring</Link></li>
            <li><Link to="/Viewalerts">Alerts</Link></li>
            <li><Link to="/Viewreports">Reports</Link></li>
            <li><Link to="/Settings">Account Settings</Link></li>
          </ul>
        </div>
        <div className="sidebar-footer">
          <button onClick={handleLogout}>Logout</button>
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
