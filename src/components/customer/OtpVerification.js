import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || ''; // Get phone from state

  const handleOtpChange = (e) => {
    const otpCode = e.target.value.replace(/\D/g, ''); // Allow only numbers
    setOtp(otpCode);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/verify-otp`, {
        phone: phone,
        otp_code: otp
      });
      setMessage(response.data.message);
      if (response.data.success) {
        const userId = response.data.userId;
        navigate('/activity', { state: { userId } }); // Navigate to activity page with userId
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        {/* Logo */}
        <div className="flex justify-center bg-gray-300 p-4 rounded-t-lg mb-6">
          <img src={logo} alt="Logo" style={{ width: '100%', borderRadius: '8px' }} />
        </div>

        {/* Welcome message */}
        <h2 className="text-2xl font-bold text-center text-gray-800">ยินดีต้อนรับสู่ ร้าน xxxxx</h2>
        <p className="text-center text-gray-600 mb-6">กรุณาตรวจสอบรหัส OTP ที่เบอร์ {phone}</p>

        {/* Form */}
        <form onSubmit={handleVerify}>
          <div className="mb-4">
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="กรอกรหัส OTP"
              maxLength="6" // Assuming OTP is 6 digits
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-lg"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 font-semibold text-gray-600 bg-gray-300 rounded-md hover:bg-gray-400"
              onClick={() => navigate('/loginCustomer')} // Navigate back to login
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              ยืนยัน
            </button>
          </div>
          {message && <p className="text-center text-red-500 mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
