import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Login.css';
import Toast from './Toast'; // Importing Toast Component

const Login = () => {
  const [toast, setToast] = useState(null); // Toast state for managing the messages
  const [formData, setFormData] = useState({ email: '', password: '' }); // Form data for email and password
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setToast({ message: 'Email and password are required!', type: 'error' });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToast({ message: 'Login Successful!', type: 'success' });
        setTimeout(() => {
          navigate('/Dashboard'); // Navigate to Dashboard after successful login
        }, 3000); // Wait for 3 seconds before redirecting
      } else {
        setToast({ message: data.message || 'Login Failed!', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'An error occurred. Please try again later.', type: 'error' });
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="additional-links">
          <a href="/forgotpassword" className="forgot-password-link">Forgot Password?</a>
          <p>
            Don't have an account?{' '}
            <a href="/signup" className="create-account-link">Create an Account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
