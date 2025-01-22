import React, { useState } from 'react';
import './Forgotpassword.css'; // Importing CSS file
import Toast from './Toast'; // Importing Toast Component
import axios from 'axios'; // Importing Axios for API requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const ForgotPassword = () => {
  const [toast, setToast] = useState(null); // State for managing toast messages
  const [email, setEmail] = useState(''); // State for email input
  const navigate = useNavigate(); // Hook for redirection

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
      // API call to the backend Forgot Password endpoint
      const response = await axios.post('http://localhost:5000/api/forgot-password', { email });
      
      if (response.data.success) {
        setToast({ message: 'Password reset code sent to your email!', type: 'success' });

        // Redirect to Verify Code page after successful password reset request
        setTimeout(() => {
          navigate('/Verifycode'); // Navigate to the Verifycode page
        }, 3000); // Delay to show the success toast message
      } else {
        setToast({ message: response.data.message || 'Failed to send reset code. Try again.', type: 'error' });
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
          <button type="submit">Submit</button>
        </form>
        <div className="back-to-login">
          <p>
            Remember your password?{' '}
            <a href="/login" className="login-link">Back to Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
