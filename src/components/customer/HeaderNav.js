// src/components/HeaderNav.js
import React, { useState } from 'react'; // Import useState from React
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { GiftIcon, ArrowRightOnRectangleIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid';

const HeaderNav = ({ customerName, points, onLogout }) => {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [transferPoints, setTransferPoints] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('userId')); // Initialize userId from localStorage
  const navigate = useNavigate();
  const [showQrPopup, setShowQrPopup] = useState(false);

  // Functions to open/close modals
  const openTransferModal = () => setIsTransferModalOpen(true);
  const closeTransferModal = () => {
    setIsTransferModalOpen(false);
    setPhoneNumber('');
    setTransferPoints('');
    setMessage('');
  };

  const openQRModal = () => setIsQRModalOpen(true);
  const closeQRModal = () => setIsQRModalOpen(false);

  // Handle transfer points
  const handleTransferPoints = () => {
    if (!userId) {
      setMessage('กรุณาเข้าสู่ระบบก่อนทำการโอนพอยต์');
      return;
    }

    if (parseInt(transferPoints, 10) > points) {
      setMessage('จำนวนพอยต์ที่ต้องการโอนต้องน้อยกว่าพอยด์ที่มี');
      return;
    }

   

    axios.get(`http://localhost:4000/api/users/phone/${phoneNumber}`)
      .then(response => {

        if(userId == response.data.userId)
            {
                setMessage('เบอร์โทรที่จะโอนต้องไม่ใช่เบอร์ตนเอง');
                return;
            }

        const toUserId = response.data.userId;
        return axios.post('http://localhost:4000/api/transfer-point', {
          fromUserId: userId,
          toUserId: toUserId,
          point: transferPoints
        });
      })
      .then(() => {
        setMessage('โอนพอยต์สำเร็จ');
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setMessage('ไม่พบเบอร์โทรศัพท์นี้ในระบบ');
        } else {
          setMessage('เกิดข้อผิดพลาดในการโอนพอยต์');
        }
      });
  };

  const onReceivePoints = () => {
    setShowQrPopup(true);
  };

  const handleScanQR = () => { 
    window.open(`http://localhost:3000/admin/add-point?userId=${userId}`, '_blank');
  }

  const handleCloseQrPopup = () => {
    setShowQrPopup(false);
    window.location.reload(); // This will refresh the page
  };

  
  const handleLogout = () => {
    localStorage.removeItem('token'); // Assuming you’re using a token for authentication
    localStorage.removeItem('userId');
    localStorage.removeItem('customerName');
    localStorage.removeItem('adminId');
    navigate('/loginCustomer');
  };


  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <span className="text-lg font-semibold text-gray-700">Customer : {customerName}</span>
        <span className="text-sm text-gray-500">{points} พอยต์</span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={onReceivePoints}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 space-x-2"
        >
          <GiftIcon className="h-5 w-5" />
          <span className="text-xs">รับพอยด์</span>
        </button>
        <button
          onClick={openTransferModal}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 space-x-2"
        >
          <ArrowPathRoundedSquareIcon className="h-5 w-5" />
          <span className="text-xs">โอนพอยด์</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 space-x-2"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
        </button>
      </div>

      
      {/* QR Code Popup */}
      {showQrPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
            <h2 className="text-xl font-bold mb-4">สแกน QR Code</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <QRCodeCanvas value={`http://localhost:3000/admin/add-point?userId=${userId}`} size={200} onClick={handleScanQR} />
            </div>
            <p className="text-sm text-gray-600 mt-4">กรุณานำ QR Code ให้กับพนักงานเพื่อรับพอยต์</p>
            <button
              onClick={handleCloseQrPopup}
              className="mt-2 px-4 py-2 font-semibold text-gray-600 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              ปิด
            </button>
          </div>
        </div>
      )}

      {/* Transfer Points Modal */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
            <h2 className="text-xl font-bold mb-4">โอนพอยด์ให้เพื่อน</h2>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="เบอร์โทรของเพื่อน"
              maxLength={10}
              className="w-full px-4 py-2 mb-4 border rounded-md"
            />
            <input
              type="number"
              value={transferPoints}
              onChange={(e) => setTransferPoints(e.target.value)}
              placeholder="จำนวนพอยด์"
              className="w-full px-4 py-2 mb-4 border rounded-md"
            />
            {message && <p className="text-red-500 mb-4">{message}</p>}
            <button
              onClick={handleTransferPoints}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              ยืนยันการโอน
            </button>
            &nbsp;
            &nbsp;
            &nbsp;
            <button
              onClick={closeTransferModal}
              className="mt-2 px-4 py-2 bg-gray-300 text-gray-600 rounded-md hover:bg-gray-400"
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderNav;
