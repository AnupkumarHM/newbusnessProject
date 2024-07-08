import React, { useState } from 'react';
import Register from './auth/Register';
import Login from './auth/Login';
import { Banner } from './Banner';
import '../App.css';

const AuthPage = () => {
  const [currentForm, setCurrentForm] = useState(null);

  const handleShowRegister = () => {
    setCurrentForm('register');
  };

  const handleShowLogin = () => {
    setCurrentForm('login');
  };

  return (
    <div className="auth-page">
      <Banner />
      <div className="auth-container">
        <div className="button-container">
          <button className="auth-button" onClick={handleShowRegister}>Register</button>
          <button className="auth-button" onClick={handleShowLogin}>Login</button>
        </div>
        <div className="form-container">
          {currentForm === 'register' && <Register />}
          {currentForm === 'login' && <Login />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
