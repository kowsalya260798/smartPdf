import React, { useState } from 'react';
import { useSiteContext } from '../../contexts/SiteProvider';
import { post } from '../../services/smartApiService';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const { setLoading, setUser, startSessionAct } = useSiteContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      const response = await post('/signup', { email, password });
      setLoading(false);
      setUser(response.user); 
      startSessionAct(); 
      navigate('/dashboard'); 
    } catch (error) {
      if (error.response) {
       
        setError(`Request failed with status code ${error.response.status}`);
      } else if (error.request) {
       
        setError('No response received from the server');
      } else {
     
        setError('Request failed to reach the server');
      }
    }
  };

  return (
    <div className="signup-container mt-6">
      <h1 className="signup-title">Sign Up</h1>
      <div className="signup-field">
        <label htmlFor="email" className="signup-label">
          Email Address
        </label>
        <div className="signup-control">
          <input
            id="email"
            className="signup-input"
            type="text"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="signup-field">
        <label htmlFor="password" className="signup-label">
          Password
        </label>
        <div className="signup-control">
          <input
            id="password"
            className="signup-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="signup-field">
        <button onClick={handleSignup} className="signup-button" type="button">
          Sign Up
        </button>
        {error && <p className="signup-help">{error}</p>}
      </div>
      <p>
        Already have an account?{' '}
        <Link to="/login" className="signup-sign">
          <u>Login here</u>
        </Link>
      </p>
    </div>
  );
};

export default Signup;
