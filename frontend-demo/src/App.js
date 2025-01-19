import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing all pages
import Dashboard from './pages/Dashboard';
import Deepfakedetection from './pages/Deepfakedetection';
import Errorpage from './pages/Errorpage';
import Financialfrauddetection from './pages/Financialfrauddetection';
import Forgotpassword from './pages/Forgotpassword';
import Login from './pages/Login';
import Setpassword from './pages/Setpassword';
import Settingspage from './pages/Settingspage';
import Signup from './pages/Signup';
import Spamdetection from './pages/Spamdetection';
import Toast from './pages/Toast'; // If used globally
import Verifycode from './pages/Verifycode';
import Viewalerts from './pages/Viewalerts';
import Viewreports from './pages/Viewreports';
import VKYCmonitoring from './pages/VKYCmonitoring';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          
          
          {/* Main routes */}
          <Route path="/" element={<Login/>} />
          <Route path="/Forgotpassword" element={<Forgotpassword />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Verifycode" element={<Verifycode />} />
          <Route path="/Setpassword" element={<Setpassword />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Deepfakedetection" element={<Deepfakedetection />} />
          <Route path="/Financialfrauddetection" element={<Financialfrauddetection />} />
          <Route path="/Settings" element={<Settingspage />} />
          <Route path="/Spamdetection" element={<Spamdetection />} />
          <Route path="/Viewalerts" element={<Viewalerts />} />
          <Route path="/Viewreports" element={<Viewreports />} />
          <Route path="/Vkycmonitoring" element={<VKYCmonitoring />} />

          <Route path="/" element={<Login />} />  // This is for the login page
          <Route path="/Dashboard" element={<Dashboard />} />  // This is for the Dashboard page


         
          
          {/* Catch-all for unknown routes */}
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
