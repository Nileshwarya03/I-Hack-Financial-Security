import React from 'react';
import './Setpassword.css'; // Importing CSS file

const SetPassword = () => {
  return (
    <div className="set-password-page">
      <div className="set-password-container">
        <h2>Set New Password</h2>
        <p>Create a strong and secure password for your account.</p>
        <form>
          <div className="input-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              placeholder="Enter your new password"
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
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

