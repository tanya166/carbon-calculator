import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import signup from '../assets/signup.png'; // Ensure the correct path

function SignUp() {
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        username,
       
        password
      });
      
      if (response.status === 201) {
        setSuccess(true);
        setError(null);
        console.log("Success:", response.data);
      } else {
        setError('Unexpected response from server');
        setSuccess(false);
        console.log("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error details:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.msg || 'An error occurred during sign up');
        console.log("Error response:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please try again.');
        console.log("No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Error setting up the request. Please try again.');
        console.log("Error:", error.message);
      }
      setSuccess(false);
    }
  };

  return (
    <div className="signup-form" style={{ backgroundImage: `url(${signup})` }}>
      <div className='leftt'>
        <h2>Sign up</h2>
        <form onSubmit={handleSignUp}>
          <div>
            <label htmlFor="username">Email:</label>
            <input 
              type="email" 
              className='emaill' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required />
          </div>
          
          <div>
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              className='pass' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className='signupp'>Sign up</button>
        </form>
        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>Sign up successful! Please log in.</p>}
        <div className='wh'>
          <div className='lines'></div>
          <span className='okk'>or</span>
          <div className='lines'></div>
        </div>
        <p className='ok'>Already have an account?
          <Link to="/Login" className="Loginn">
            <button className="button">Log in</button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;


