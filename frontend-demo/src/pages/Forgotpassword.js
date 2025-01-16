import React from 'react';
import './Forgotpassword.css'; // Importing CSS file

const ForgotPassword = () => {
  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <p>Please enter your email address to reset your password.</p>
        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
