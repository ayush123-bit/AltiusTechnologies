import React, { useState } from 'react';
import axios from 'axios';
import './OTPPage.css';
import { CircularProgress } from '@mui/material';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
function OTPPage({ email, onOTPVerified }) {
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('https://altios.onrender.com/verify-otp', { email, otp });
      setMessage(response.data.message);
      if (response.status === 200) {
        setIsVerified(true);
       navigate('/customer')
      }
    } catch (error) {
      setIsVerified(false);
      setMessage(error.response?.data?.error || 'Failed to verify OTP');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="otp-page">
      <div className="otp-container">
        <h2>
          <MdEmail className="email-icon" /> Verify Your Account
        </h2>
        <p className="otp-instruction">
          We’ve sent a 4-digit OTP to your email <strong>{email}</strong>. Please enter it below to verify your account.
        </p>

        <form onSubmit={handleOTPSubmit} className="otp-form">
          <div className="otp-input-container">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              maxLength="4"
              placeholder="Enter OTP"
              className="otp-input"
            />
            {isVerified ? (
              <FaCheckCircle className="input-icon success-icon" />
            ) : (
              <FaExclamationCircle className="input-icon error-icon" />
            )}
          </div>
          <button type="submit" className="otp-button" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={20} color="inherit" /> : 'Verify OTP'}
          </button>
        </form>

        {message && <p className={`otp-message ${isVerified ? 'success' : 'error'}`}>{message}</p>}
      </div>
    </div>
  );
}

export default OTPPage;
