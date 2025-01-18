import React, { useState } from 'react';
import './Verifycode.css'; // Importing CSS file
import Toast from './Toast'; // Importing Toast Component

const VerifyCode = () => {
  const [toast, setToast] = useState(null); // State for managing toast messages
  const [code, setCode] = useState(''); // State for verification code input

  const handleChange = (e) => {
    setCode(e.target.value); // Update code state as the user types
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (!code || code.length !== 6) {
      setToast({ message: 'Please enter a valid 6-digit code!', type: 'error' });
      setTimeout(() => setToast(null), 3000); // Hide toast after 3 seconds
      return;
    }

    try {
      // Simulate API call for now
      const response = { success: true }; // Replace with actual API call
      if (response.success) {
        setToast({ message: 'Verification successful!', type: 'success' });
      } else {
        setToast({ message: 'Invalid verification code. Please try again.', type: 'error' });
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
            <label htmlFor="code">Verification Code</label>
            <input
              type="text"
              id="code"
              name="code"
              value={code}
              onChange={handleChange}
              placeholder="Enter your code"
              maxLength="6"
            />
          </div>
          <button type="submit">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
