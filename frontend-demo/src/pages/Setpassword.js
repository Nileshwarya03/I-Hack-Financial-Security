import React, { useState } from 'react';
import './Setpassword.css'; // Importing CSS file
import Toast from './Toast'; // Importing Toast Component
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for redirection

const SetPassword = () => {
  const [toast, setToast] = useState(null); // State for managing toast messages
  const [newPassword, setNewPassword] = useState(''); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleSetPassword = async (e) => {
    e.preventDefault();

    // Validate password fields
    if (!newPassword || !confirmPassword) {
      setToast({ message: 'Please fill in both fields.', type: 'error' });
      setTimeout(() => setToast(null), 3000); // Hide toast after 3 seconds
      return;
    }

    if (newPassword !== confirmPassword) {
      setToast({ message: 'Passwords do not match. Please try again.', type: 'error' });
      setTimeout(() => setToast(null), 3000); // Hide toast after 3 seconds
      return;
    }

    try {
      // Make API call to set the new password
      const response = await axios.post('http://localhost:5000/api/set-password', {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });

      if (response.data.success) {
        setToast({ message: 'Password updated successfully!', type: 'success' });
        setNewPassword('');
        setConfirmPassword('');

        // Redirect to login page after successful password update
        setTimeout(() => {
          navigate('/login'); // Adjust this based on your route
        }, 3000); // Wait for toast to hide before redirecting
      } else {
        setToast({ message: response.data.message, type: 'error' });
      }
    } catch (error) {
      console.error('Error occurred:', error);  // Log the error to console for debugging
      setToast({ message: 'An error occurred. Please try again later.', type: 'error' });
    }

    setTimeout(() => setToast(null), 3000); // Hide toast after 3 seconds
  };

  return (
    <div className="set-password-page">
      {toast && <Toast message={toast.message} type={toast.type} />} {/* Show toast */}
      <div className="set-password-container">
        <h2>Set New Password</h2>
        <p>Create a strong and secure password for your account.</p>
        <form onSubmit={handleSetPassword}>
          <div className="input-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
            />
          </div>
          <button type="submit">Set Password</button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;
