import React, { useState } from 'react';
import './Signup.css'; // Importing CSS file
import Toast from './Toast'; // Importing Toast Component

const Signup = () => {
  const [toast, setToast] = useState(null); // Toast state for managing messages
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setToast({ message: 'Passwords do not match!', type: 'error' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToast({ message: 'Signup Successful!', type: 'success' });
      } else {
        setToast({ message: data.message || 'Signup failed. Try again.', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'An error occurred. Please try again later.', type: 'error' });
    }

    setTimeout(() => setToast(null), 3000); // Hide toast after 3 seconds
  };

  return (
    <div className="signup-page">
      {toast && <Toast message={toast.message} type={toast.type} />} {/* Show the toast */}
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <div className="back-to-login">
          <p>
            Already have an account?{' '}
            <a href="/login" className="login-link">Back to Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
