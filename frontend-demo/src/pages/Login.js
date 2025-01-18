import React, { useState } from 'react';
import './Login.css';
import Toast from './Toast';  // Importing Toast Component

const Login = () => {
  const [toast, setToast] = useState(null); // Toast state for managing the messages

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login action
    const isSuccess = true; // Replace with your login logic (e.g., API call)

    if (isSuccess) {
      setToast({ message: 'Login Successful!', type: 'success' });
    } else {
      setToast({ message: 'Login Failed!', type: 'error' });
    }

    setTimeout(() => setToast(null), 3000); // Hide the toast after 3 seconds
  };

  return (
    <div className="login-page">
      {toast && <Toast message={toast.message} type={toast.type} />} {/* Show the toast */}
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
