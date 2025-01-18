import React, { useState } from 'react';
import './Forgotpassword.css'; // Importing CSS file
import Toast from './Toast'; // Importing Toast Component

const ForgotPassword = () => {
  const [toast, setToast] = useState(null); // State for managing toast messages
  const [email, setEmail] = useState(''); // State for email input

  const handleChange = (e) => {
    setEmail(e.target.value); // Update email state as the user types
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setToast({ message: 'Email is required!', type: 'error' });
      setTimeout(() => setToast(null), 3000); // Hide toast after 3 seconds
      return;
    }

    try {
      // Simulate API call for now
      const response = { success: true }; // Replace with actual API call
      if (response.success) {
        setToast({ message: 'Password reset link sent to your email!', type: 'success' });
      } else {
        setToast({ message: 'Failed to send reset link. Try again.', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'An error occurred. Please try again later.', type: 'error' });
    }

    setTimeout(() => setToast(null), 3000); // Hide toast after 3 seconds
  };

  return (
    <div className="forgot-password-page">
      {toast && <Toast message={toast.message} type={toast.type} />} {/* Show toast */}
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <p>Please enter your email address to reset your password.</p>
        <form onSubmit={handleResetPassword}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
