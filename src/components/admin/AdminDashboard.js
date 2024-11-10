import React, { useState } from 'react';
import Modal from 'react-modal';
import { QRCodeCanvas } from 'qrcode.react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header'; // นำเข้า Header
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // ฟังก์ชันเปิดและปิด Modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleScanQR = () => { 
    navigate('/customer/login');
  }

  const handleCloseQrPopup = () => { 
    setIsModalOpen(false);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* ส่ง openModal เป็น prop ให้ Header */}
        <Header title="Dashboard" openModal={openModal} />

        {/* Dashboard Content */}
        <DashboardContent />
        
        {/* QR Code Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="QR Code Modal"
          className="max-w-lg mx-auto bg-white rounded-lg p-6 shadow-lg"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
            <h2 className="text-xl font-bold mb-4">สแกน QR Code</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <QRCodeCanvas value={`http://localhost:3000/customer/login`} size={200} onClick={handleScanQR} />
            </div>
            <p className="text-sm text-gray-600 mt-4">Scan QR Code เพื่อสมัครสมาชิก</p>
            <button
              onClick={handleCloseQrPopup}
              className="mt-2 px-4 py-2 font-semibold text-gray-600 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              ปิด
            </button>
          </div>
        </div>
        </Modal>
        <Footer />
      </main>

    </div>
  );
};

const DashboardContent = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
    <div className="flex items-center space-x-4">
      <span className="text-3xl font-bold">6.3k</span>
      <span className="text-gray-500">สมาชิก</span>
    </div>
    <div className="flex mt-4 space-x-2">
      <Avatar icon="A" />
      <Avatar icon="S" />
      <Avatar icon="P" />
      <Avatar icon="G" />
      <span className="text-gray-500">+42</span>
    </div>
  </div>
);

const Avatar = ({ icon }) => (
  <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold text-lg">
    {icon}
  </div>
);

export default AdminDashboard;
