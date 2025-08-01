// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import './LoginPage.css'; // Create this file for basic styling

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // This is a "dummy" handler. It doesn't send data to a backend yet.
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the browser from refreshing
    console.log('Logging in with:', { email, password });
    alert('Login form submitted! Check the console.');
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;