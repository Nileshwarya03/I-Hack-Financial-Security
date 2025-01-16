import React from 'react';
import './Verifycode.css'; // Importing CSS file

const VerifyCode = () => {
  return (
    <div className="verify-code-page">
      <div className="verify-code-container">
        <h2>Verify Code</h2>
        <p>Enter the 6-digit verification code sent to your email.</p>
        <form>
          <div className="input-group">
            <label htmlFor="code">Verification Code</label>
            <input type="text" id="code" name="code" placeholder="Enter your code" maxLength="6" />
          </div>
          <button type="submit">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;

