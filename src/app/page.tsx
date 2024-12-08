'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import './styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in both fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
       
        const errorData = await response.json();
        setLoading(false);
        alert(errorData.message || 'Login failed!');
        return;
      }

      const data = await response.json();
      setLoading(false);

      alert('Login successful!');
      localStorage.setItem('token', data.token);

     
      router.push('/todolist'); 
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      alert('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h1 className="header">Login</h1>
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
        <p className="text">
          Don’t have an account yet?{' '}
          <Link href="/register" className="link">
            Signup
          </Link>
        </p>
        <button className="button" onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}

export default Login;
