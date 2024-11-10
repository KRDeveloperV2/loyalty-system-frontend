import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const Header = ({ title, openModal }) => {
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminId = localStorage.getItem('adminId'); // Retrieve adminId from localStorage
        if (!adminId) {
          console.error("No admin ID found in localStorage");
          return;
        }

        const response = await axios.get(`${baseURL}/api/admin/profile/${adminId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token if needed
          }
          //,
          //params: { adminId }
        });
        
        setAdminData(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('adminId');
    localStorage.removeItem('userId');
    localStorage.removeItem('customerName');
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <header className="mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-700">{title}</h1>
        <div className="flex items-center space-x-4">
          {/* ปุ่มเปิด QR Code Modal */}
          <button onClick={openModal} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md">
            {adminData ? adminData.store_name : 'ลิงค์ร้านค้า'}
          </button>
          <span className="text-sm font-medium text-gray-500">
            {adminData ? `${adminData.first_name} ${adminData.last_name}` : 'Admin'}
          </span>
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-200 cursor-pointer"
            onClick={handleLogout} // Add click event to trigger logout
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
