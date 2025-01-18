import React from 'react';
import './Toast.css';

const Toast = ({ message, type }) => {
  return (
    <div className={`toast ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
