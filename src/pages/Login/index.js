import React, { useState, useEffect } from 'react';
import { useSiteContext } from '../../contexts/SiteProvider';
import { post } from '../../services/smartApiService';
import { Link, useNavigate } from 'react-router-dom';
import Captures from '../../assets/images/Capture.PNG';
//import back from '../../assets/images/background.avif';
import './Login.css'; // You can remove this if not needed

const Login = () => {
  const { setLoading, setUser, openModal, closeModal, startSessionAct } = useSiteContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    let data = { username: 'kminchelle', password: '0lelplR' };
    setLoading(true, 'Logging in Please Wait....');
    const subscription = post('auth/login', data).subscribe((response) => {
      setUser(response.data);
      setLoading(false);
      startSessionAct();
      navigate('/');
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  const handleRememberMe = () => {
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const MyFooterContent = () => {
    return (
      <div>
        <button className="button is-success is-small">Save changes</button>
        <button className="button is-small" onClick={closeModal}>Cancel</button>
      </div>
    );
  };

  const MyModalContent = () => {
    return (
      <div>
        <p> This is everything ever </p>
      </div>
    );
  };

  const openMyModal = () => {
    let modalObject = { title: 'login password', body: <MyModalContent />, footer: <MyFooterContent /> };
    openModal(modalObject);
  };
  const handleForgetPassword = () => {
    const modalContent = (
      <div>
        <p>
          <b>Forgot your password? Enter your email to reset it:</b>
        </p>
        <input
          className="input is-primary"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button onClick={sendPasswordResetEmail} className="button is-primary">
          Send Reset Email
        </button>
      </div>
    );
    const modalFooter = (
      <div>
        <button onClick={closeModal} className="button is-small">
          Cancel
        </button>
      </div>
    );
    const modalObject = { title: 'Forgot Password', body: modalContent, footer: modalFooter };
    openModal(modalObject);
  };
  const sendPasswordResetEmail = () => {
    closeModal();

  };
  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-column pt-6 pb-6 is-6">
        <div className="login-box">
          <h1 className="login-title is-4">Login</h1>
          <div className="login-field">
            <p className="login-acc">
              Doesn't have an account yet?{' '}
              <Link to="/signup" className="login-sign">
                <u onClick={handleSignup}>Sign up</u>
              </Link>
            </p>
          </div>
          <div className="login-field">
            <label htmlFor="email" className="login-label">
              Email Address
            </label>
            <div className="login-control">
              <input
                id="email"
                className="login-input"
                type="text"
                placeholder="You@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="login-field">
            <div className="login-control is-expanded">
              <label htmlFor="password" className="login-label">
                Password
              </label>
              <Link to="/forget" className="login-sign">
                <u onClick={handleForgetPassword}>forgot password?</u>
              </Link>
              <input
                id="password"
                className="login-input"
                type="password"
                placeholder="Enter 6 Characters or more"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="login-field">
            <label className="login-checkbox">
              <input
                className="login-checkbox"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => {
                  setRememberMe(e.target.checked);
                  handleRememberMe();
                }}
              />
              Remember Me
            </label>
          </div>
          <div className="login-field">
            <button onClick={handleLogin} className="login-button" type="button">
              Login
            </button>
            {error && <p className="login-help">{error}</p>}
          </div>

        </div>
      </div>
      <div className="login-column pt-6 pb-6 is-6">
        <div className="login-box">
          <figure className="login-image">
            <img src={Captures} alt="captures" />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Login;
/*<div className="social-button">
<ul className="is-flex">
  <li className="mr-2">
    <button className="google button" type="button">
      <i class="fa fa-google-plus-square" aria-hidden="true"></i> Google
    </button>
  </li>
  <li>
    <button className="facebook button" type="button">
      <i class="fa fa-facebook-square" aria-hidden="true"></i> Facebook
    </button>
  </li>
</ul>
</div>*/