"use client"; // Ensuring it's a Client Component

import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebaseConfig'; // Adjust the import paths if necessary
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import './Login.css'; // Ensure the CSS is properly linked

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Handle email/password login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login Successful!', { position: 'top-right' });
      router.push('/'); // Navigate to the home page or dashboard on success
    } catch {
      toast.error('Login Unsuccessful. Please check your credentials.', { position: 'top-right' });
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Login Successful!', { position: 'top-right' });
      router.push('/'); // Navigate to the home page or dashboard on success
    } catch {
      toast.error('Login Unsuccessful. Please try again.', { position: 'top-right' });
    }
  };

  return (
    <div className="login-content">
      <div className="login-box">
        {/* Logo and Welcome Text */}
        <div className="logo">
          <h2 className="login-header">Welcome User!</h2>
        </div>

        {/* Email/Password Login Form */}
        <form onSubmit={handleEmailLogin}>
          <div className="input-field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>

          {/* Remember Me and Forgot Password Section */}
          <div className="options">
            <div>
              <input type="checkbox" />
              <span className="remember-me">Remember me</span>
            </div>
            <div className="forgot-password">Forgot password?</div>
          </div>

          {/* Login Button */}
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        {/* Divider or Text */}
        <div className="or-text">OR</div>

        {/* Google Login Button */}
        <button className="social-btn" onClick={handleGoogleLogin}>
          Login with Google
        </button>

        {/* Sign-up Link */}
        <div className="create-account">
          Don’t have an account? <a href="/signup">Sign up</a> {/* Link to Sign-up page */}
        </div>
      </div>
    </div>
  );
};

export default Login;
