// import React, { useEffect, useState } from 'react';
// import Sidebar from './Sidebar';
// import Header from './Header';
// import Footer from './Footer';
// import RewardCard from './RewardCard';
// import Modal from 'react-modal';
// import axios from 'axios';
// import { QRCodeCanvas } from 'qrcode.react';
// import { useNavigate } from 'react-router-dom';

// Modal.setAppElement('#root'); // ตั้งค่า root element สำหรับ Modal

// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const RewardListUser = () => {
//   const [rewards, setRewards] = useState([]);
//   const [points, setPoints] = useState(0);
//   const [showQrPopup, setShowQrPopup] = useState(false);
//   const navigate = useNavigate();

//   // ดึง userId จาก localStorage
//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     if (!userId) {
//       // ถ้าไม่มี userId ใน localStorage นำไปยังหน้าเข้าสู่ระบบ
//       navigate('/login');
//       return;
//     }

//     // ดึงคะแนนของผู้ใช้
//     const fetchUserPoints = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/api/user-points/${userId}`);
//         setPoints(response.data.userPoints.points);
//       } catch (error) {
//         console.error('Error fetching user points:', error);
//       }
//     };

//     // ดึงข้อมูลของรางวัลจาก API
//     const fetchRewards = async () => {
//       try {
//         const response = await fetch(baseURL + '/api/rewards');
//         const data = await response.json();

//         // กรองเฉพาะที่ status = 1
//         const filteredRewards = data.filter(reward => reward.status === 1);
//         setRewards(filteredRewards);
//       } catch (error) {
//         console.error('Error fetching rewards:', error);
//       }
//     };

//     fetchUserPoints();
//     fetchRewards();
//   }, [userId, navigate]);

//   // เปิด Popup แสดง QR Code
//   const handleShowQrPopup = () => {
//     setShowQrPopup(true);
//   };

//   // ฟังก์ชันสำหรับเปิดหน้า Add Point ในหน้าต่างใหม่
//   const openAddPointPage = () => {
//     window.open(`http://localhost:3000/admin/add-point?userId=${userId}`, '_blank');
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <Header onReceivePoints={handleShowQrPopup} points={points} />

//         {/* Content */}
//         <main className="flex-1 p-6 bg-gray-100">
//           <h2 className="text-2xl font-bold mb-6">ของรางวัล ({rewards.length})</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {rewards.map((reward) => (
//                <RewardCard key={reward.reward_id} reward={reward} userId={userId} userPoints={points} />
//             ))}
//           </div>
//         </main>

//         {/* Footer */}
//         <Footer />
//       </div>

//       {/* QR Code Popup */}
//       {showQrPopup && (
//         <Modal
//           isOpen={showQrPopup}
//           onRequestClose={() => setShowQrPopup(false)}
//           className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg"
//           overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//         >
//           <h2 className="text-xl font-bold mb-4">รับพอยต์</h2>
//           <p>สแกน QR Code ด้านล่างเพื่อรับพอยต์</p>
//           <div className="my-4 flex justify-center">
//             <QRCodeCanvas value={`http://localhost:4000/admin/add-point?userId=${userId}`} size={200} />
//           </div>
//           <div className="flex justify-center space-x-4">
//             <button
//               onClick={() => setShowQrPopup(false)}
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
//             >
//               ปิด
//             </button>
//             <button
//               onClick={openAddPointPage}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md"
//             >
//               ไปที่หน้า Add Point
//             </button>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default RewardListUser;

import React, { useEffect, useState } from 'react';
import MainLayout from './MainLayout';
import RewardCard from './RewardCard';
import Modal from 'react-modal';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root'); // Set root element for Modal

const baseURL = process.env.REACT_APP_API_BASE_URL;

const RewardListUser = () => {
  const [rewards, setRewards] = useState([]);
  const [points, setPoints] = useState(0);
  const [showQrPopup, setShowQrPopup] = useState(false);
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("ลูกค้า");

  // Get userId from localStorage
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Assuming you're using token-based auth
    navigate('/login');
  };


  useEffect(() => {
    if (!userId) {
      // If no userId in localStorage, redirect to login
      navigate('/login');
      return;
    }

    const storedCustomerName = localStorage.getItem('customerName');
    if (storedCustomerName) {
      setCustomerName(storedCustomerName);
    }

    // Fetch user points
    const fetchUserPoints = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/user-points/${userId}`);
        setPoints(response.data.userPoints.points);
      } catch (error) {
        console.error('Error fetching user points:', error);
      }
    };

    // Fetch rewards data from API
    const fetchRewards = async () => {
      try {
        const response = await fetch(baseURL + '/api/rewards');
        const data = await response.json();

        // Filter rewards with status = 1
        const filteredRewards = data.filter((reward) => reward.status === 1);
        setRewards(filteredRewards);
      } catch (error) {
        console.error('Error fetching rewards:', error);
      }
    };

    fetchUserPoints();
    fetchRewards();
  }, [userId, navigate]);

  // Show QR Code popup
  const handleShowQrPopup = () => {
    setShowQrPopup(true);
  };

  // Open Add Point page in a new window
  const openAddPointPage = () => {
    window.open(`http://localhost:3000/admin/add-point?userId=${userId}`, '_blank');
  };

  return (
    <MainLayout points={points} onReceivePoints={handleShowQrPopup}
    customerName={customerName}
    onLogout={handleLogout}
    >
      {/* Main content within MainLayout */}
      <main className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">ของรางวัล ({rewards.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <RewardCard key={reward.reward_id} reward={reward} userId={userId} userPoints={points} />
          ))}
        </div>
      </main>

      {/* QR Code Popup */}
      {showQrPopup && (
        <Modal
          isOpen={showQrPopup}
          onRequestClose={() => setShowQrPopup(false)}
          className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-xl font-bold mb-4">รับพอยต์</h2>
          <p>สแกน QR Code ด้านล่างเพื่อรับพอยต์</p>
          <div className="my-4 flex justify-center">
            <QRCodeCanvas value={`http://localhost:4000/admin/add-point?userId=${userId}`} size={200} />
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowQrPopup(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
            >
              ปิด
            </button>
            <button
              onClick={openAddPointPage}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              ไปที่หน้า Add Point
            </button>
          </div>
        </Modal>
      )}
    </MainLayout>
  );
};

export default RewardListUser;
