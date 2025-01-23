import React, { useState } from 'react';
import './Verifycode.css'; // Importing CSS file
import Toast from './Toast'; // Importing Toast Component
import axios from 'axios'; // Importing axios for making API calls
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for redirection

const VerifyCode = () => {
  const [toast, setToast] = useState(null); // State for managing toast messages
  const [code, setCode] = useState(''); // State for verification code input
  const [email, setEmail] = useState(''); // State for email input (Assumed user enters email)
  const navigate = useNavigate(); // Hook for redirection

  const handleChange = (e) => {
    setCode(e.target.value); // Update code state as the user types
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update email state as the user types
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (!code || !email) {
      setToast({ message: 'Please enter a valid email and 6-digit code!', type: 'error' });
      setTimeout(() => setToast(null), 3000); // Hide toast after 3 seconds
      return;
    }

    try {
      // Making the actual API call to verify the code
      const response = await axios.post('http://127.0.0.1:5000/api/verify-code', {
        email: email,
        code: code
      });

      if (response.data.success) {
        setToast({ message: 'Verification successful!', type: 'success' });

        // Redirect to Set Password page after successful verification
        setTimeout(() => {
          navigate('/Setpassword'); // Navigate to Set Password page
        }, 3000); // Delay to show the success toast message
      } else {
        setToast({ message: response.data.message || 'Invalid verification code. Please try again.', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'An error occurred. Please try again later.', type: 'error' });
    }

    setTimeout(() => setToast(null), 3000); // Hide toast after 3 seconds
  };

  return (
    <div className="verify-code-page">
      {toast && <Toast message={toast.message} type={toast.type} />} {/* Show toast */}
      <div className="verify-code-container">
        <h2>Verify Code</h2>
        <p>Enter the 6-digit verification code sent to your email.</p>
        <form onSubmit={handleVerifyCode}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="code">Verification Token</label>
            <input
              type="text"
              id="code"
              name="code"
              value={code}
              onChange={handleChange}
              placeholder="Enter the token"
              required
            />
          </div>
          <button type="submit">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
