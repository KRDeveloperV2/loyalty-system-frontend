import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

// ตั้งค่าเริ่มต้นให้กับ Modal
Modal.setAppElement('#root');

const Header = ({ onReceivePoints, points }) => {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [transferPoints, setTransferPoints] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [id , SetUserId] = useState('');

  // เปิด/ปิด Modal สำหรับการโอนพอยต์
  const openTransferModal = () => setIsTransferModalOpen(true);
  const closeTransferModal = () => {
    setIsTransferModalOpen(false);
    setPhoneNumber('');
    setTransferPoints('');
    setMessage('');
  };

  // เปิด/ปิด Modal สำหรับ QR Code
  const openQRModal = () => setIsQRModalOpen(true);
  const closeQRModal = () => setIsQRModalOpen(false);

  const handleTransferPoints = () => {
    const fromUserId = localStorage.getItem('userId');
    SetUserId(fromUserId);
    
    if (!fromUserId) {
      setMessage('กรุณาเข้าสู่ระบบก่อนทำการโอนพอยต์');
      return;
    }

    console.log(parseInt(transferPoints, 10));
    console.log(points);

    if (parseInt(transferPoints, 10) > points) {
      setMessage('จำนวนพอยต์ที่ต้องการโอนต้องน้อยกว่าพอยด์ที่มี');
      return;
    }

    axios.get(`http://localhost:4000/api/users/phone/${phoneNumber}`)
      .then(response => {
        const toUserId = response.data.userId;
        return axios.post('http://localhost:4000/api/transfer-point', {
          fromUserId: fromUserId,
          toUserId: toUserId,
          point: transferPoints
        });
      })
      .then(response => {
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

  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold">Activity</h1>
      <div className="flex items-center space-x-4">
        <button 
          onClick={onReceivePoints} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          รับพอยต์
        </button>
        <button 
          onClick={openTransferModal} 
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          โอนให้เพื่อน
        </button>
        <span className="text-gray-700">{points} พอยต์</span>
        <img 
          src="https://via.placeholder.com/40" 
          alt="User" 
          className="w-10 h-10 rounded-full border-2 border-gray-200"
        />
      </div>

      {/* Modal สำหรับ QR Code */}
      <Modal
        isOpen={isQRModalOpen}
        onRequestClose={closeQRModal}
        className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">รับพอยต์</h2>
        <div className="flex justify-center mb-4">
        <QRCodeCanvas value="https://example.com/store" size={200} />
        </div>
        <p className="mb-4 text-gray-700">สแกน QR Code เพื่อรับพอยต์</p>
        <button 
          onClick={() => navigate(`/admin/add-point?userId=${id}`)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md w-full"
        >
          ไปยังหน้า Add Point
        </button>
      </Modal>

      {/* Modal สำหรับการโอนพอยต์ */}
      <Modal
        isOpen={isTransferModalOpen}
        onRequestClose={closeTransferModal}
        className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">โอนพอยต์ให้เพื่อน</h2>
        <p className="mb-4 text-gray-700">พอยต์ของคุณ: {points} พอยต์</p>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">เบอร์โทรของเพื่อน:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="กรอกเบอร์โทร"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">จำนวนพอยต์ที่ต้องการโอน:</label>
          <input
            type="number"
            value={transferPoints}
            onChange={(e) => setTransferPoints(e.target.value)}
            placeholder="กรอกจำนวนพอยต์"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        {message && <p className="mb-4 text-center text-red-500">{message}</p>}
        <div className="flex justify-end space-x-4">
          <button 
            onClick={closeTransferModal} 
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            ยกเลิก
          </button>
          <button 
            onClick={handleTransferPoints} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            ยืนยันการโอน
          </button>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
