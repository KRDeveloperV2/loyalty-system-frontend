import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const LoginCust = () => {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/customer-login`, {
        phone: phone,
        pin_code: pin
      });

      if (response.data.success) {
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('customerName',response.data.customerName)
        navigate('/CustomerDashboard', { state: { userId: response.data.userId } });
      } else {
        setMessage(response.data.message);
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
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center bg-gray-300 p-4 rounded-t-lg mb-6">
          <img src={logo} alt="Logo"  style={{ width: '100%', borderRadius: '8px' }}  />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-700">เข้าสู่ระบบลูกค้า</h2>
        <p className="text-center text-gray-500 mb-6">กรุณาเข้าสู่ระบบด้วยเบอร์โทรศัพท์และ PIN</p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="กรุณากรอกเบอร์โทร 10 หลัก"
              maxLength="10"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={pin}
              onChange={handlePinChange}
              placeholder="PIN"
              maxLength="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700"
          >
            เข้าสู่ระบบ
          </button>
          {message && <p className="text-center text-red-500 mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginCust;
