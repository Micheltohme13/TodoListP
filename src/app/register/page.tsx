
'use client';
import React, { useState } from 'react';
import './styles.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Registration successful!');
      } else {
        alert(data.message || 'Registration failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className="container">
      <h1 className="header">Register</h1>
      <div className="form">
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <p className="text">
          Already have an account?{' '}
          <a href="../" className="link">
            Login
          </a>
        </p>
        <button className="button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
