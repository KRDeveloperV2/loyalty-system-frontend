import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    storeName: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const back = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password meets the minimum length requirement
    if (formData.password.length < 8) {
      setMessage("รหัสผ่านจะต้องมีจำนวน 8 ตัวอักษร");
      return;
    }

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(baseURL + '/api/signup', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        storeName: formData.storeName
      });

      setMessage(response.data.message);
      navigate('/admin/index');
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <button className="text-gray-500 text-lg" onClick={back}>←</button>
          <p className="text-sm text-gray-500">
            Already a member? <a href="/login" className="text-blue-600 font-semibold">Sign In</a>
          </p>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">สมัครสมาชิกร้าน ฟรี !!!</h2>
        <p className="text-sm text-gray-500">เข้าสู่ระบบด้วยบัญชี APP POINT</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              placeholder="ชื่อร้านค้า"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 border-gray-300"
              required
            />
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 border-gray-300"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 border-gray-300"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 border-gray-300"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 border-gray-300"
              required
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p className="text-xs text-gray-400">รหัสผ่านจะต้องมีจำนวน 8 ตัวอักษร</p>
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 border-gray-300"
              required
            />
          </div>
          
          {message && <p className="text-center text-red-500">{message}</p>}

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
