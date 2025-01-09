import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import login from '../assets/login.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username: username,
        password: password
      });
      if (response.data && response.data.msg) {
        setSuccessMessage("Log in successful !!"); // Show the success message from the response
        if (response.status === 200) {
          setTimeout(() => {
            navigate('/');
          }, 5000); // Redirect to home after 1 second
        }
      }
    } catch (error) {
      console.error('Error:', error); // Log the error for debugging
      if (error.response && error.response.data && error.response.data.msg) {
        setErrorMessage(error.response.data.msg);
        setSuccessMessage('');
      } else {
        setErrorMessage('An unexpected error occurred');
        setSuccessMessage('');
        console.log('err');
      }
    }
  };

  return (
    <div className="login-form" style={{ backgroundImage: `url(${login})` }}>
      <div className='leftt'>
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="Username">Email:</label>
            <input
              type="email"
              className='email1'
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className='pass'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className='logg'>Log in</button>
        </form>
        {successMessage && <p className="success">{successMessage}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}
        <div className='wh'>
          <div className='lines'></div>
          <span className='okk'>or</span>
          <div className='lines'></div>
        </div>
        <p className='ok'>
          Have an account?
          <Link to="/Signup" className="sign">
            <button className="button">Signup</button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
