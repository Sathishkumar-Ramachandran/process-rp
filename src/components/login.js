import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { setUserData, setIsAuthenticated } from '../redux/actions';
import axios from 'axios'; // Import axios for making HTTP requests
import Icon from '../assets/razorpay-icon.png';
import '../styles/login.css';

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      
      const response = await axios.post('http://localhost:5000/login', formData);
      
      const userID = response.data.userId;
      let payload = {
        userid: userID,
      }
      const userInfoResponse = await axios.get(`http://localhost:5000/userinfo/${userID}`, {
        params: { userid: userID },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (userInfoResponse.status === 200) {
         // Get dispatch function
        dispatch(setUserData(userInfoResponse.data)); 
        dispatch(setIsAuthenticated(true));
        window.location.href = '/dashboard'
      }
      console.log('Login successful:', response.data?.userId);
      // Add further logic here for successful login
    } catch (error) {
      console.error('Login failed:', error.response.data);
      // Add error handling logic here
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <img src={Icon} alt="Razorpay-Icon" />
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            <a href="#">Forgot password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
