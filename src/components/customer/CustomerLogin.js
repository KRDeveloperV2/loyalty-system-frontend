import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const CustomerLogin = () => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value.replace(/\D/g, ''); // Allow only digits
    setPhone(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the phone number is 10 digits
    if (phone.length !== 10) {
      setMessage("กรุณากรอกเบอร์โทรศัพท์ 10 หลัก");
      return;
    }

    try {
      const checkResponse = await axios.post(baseURL + '/api/check-phone', { phone });

      if (!checkResponse.data.exists) {
        const otpResponse = await axios.post(baseURL + '/api/send-otp', { phone });
        setMessage(`OTP sent successfully`);
        navigate('/verify-otp', { state: { phone } });
      } else {
        setMessage("เบอร์โทรนี้ลงทะเบียนในระบบไปแล้ว");
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
        <h2 className="text-2xl font-bold text-center text-gray-800">ยินดีต้อนรับ</h2>
        <p className="text-center text-gray-600 mb-6">เข้าสู่ระบบด้วยเบอร์โทรศัพท์</p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
   

            {/* Phone number input */}
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="กรุณากรอกเบอร์โทร 10 หลัก"
              maxLength="10"
              className="w-full px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring focus:ring-blue-200 text-lg"
              required
            />
          </div>
         
          {/* Buttons */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full max-w-xs px-6 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              OTP
            </button>
          </div>

          {message && <p className="text-center text-red-500 mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default CustomerLogin;
