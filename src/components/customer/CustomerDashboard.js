// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Sidebar from './Sidebar';
// import Header from './Header';
// import Content from './Content';
// import Footer from './Footer';
// import { QRCodeCanvas } from 'qrcode.react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const CustomerDashboard = () => {
//   const [points, setPoints] = useState(null);
//   const [showPinSetup, setShowPinSetup] = useState(false);
//   const [showQrPopup, setShowQrPopup] = useState(false);
//   const [pin, setPin] = useState('');
//   const [message, setMessage] = useState('');
//   const location = useLocation();
//   const navigate = useNavigate();

//   // ดึง userId จาก location.state หรือ localStorage
//   const userId = location.state?.userId || localStorage.getItem('userId');

//   useEffect(() => {
//     // เก็บ userId ลงใน localStorage ถ้าได้จาก location.state
//     if (location.state?.userId) {
//       localStorage.setItem('userId', location.state.userId);
//     }

//     const checkPin = async () => {
//       try {
//         const response = await axios.post('http://localhost:4000/api/check-pin', { userId });
//         if (!response.data.hasPin) {
//           setShowPinSetup(true);
//         }
//       } catch (error) {
//         console.error('Error checking PIN:', error);
//       }
//     };

//     const fetchUserPoints = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/user-points/${userId}`);
//         setPoints(response.data.userPoints.points);
//       } catch (error) {
//         console.error('Error fetching user points:', error);
//       }
//     };

//     if (userId) {
//       checkPin();
//       fetchUserPoints();
//     } else {
//       navigate('/login');
//     }
//   }, [userId, navigate, location.state]);

//   const handleSetPin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:4000/api/set-pin', { userId, pin });
//       setMessage(response.data.message);
//       setShowPinSetup(false);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "An error occurred");
//     }
//   };

//   const handleShowQrPopup = () => {
//     setShowQrPopup(true);
//   };

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
//         <Content />

//         {/* Footer */}
//         <Footer />

//         {/* QR Code Popup */}
//         {showQrPopup && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
//               <h2 className="text-xl font-bold mb-4">สแกน QR Code</h2>
//               <QRCodeCanvas
//                 value={`http://localhost:4000/admin/add-point?userId=${userId}`}
//                 size={200}
//               />
//               <p className="text-sm text-gray-600 mt-4">กรุณานำ QR Code ให้กับพนักงานเพื่อรับพอยต์</p>
//               <button
//                 onClick={openAddPointPage}
//                 className="mt-4 px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
//               >
//                 ไปที่หน้า Add Point
//               </button>
//               <button
//                 onClick={() => setShowQrPopup(false)}
//                 className="mt-2 px-4 py-2 font-semibold text-gray-600 bg-gray-300 rounded-md hover:bg-gray-400"
//               >
//                 ปิด
//               </button>
//             </div>
//           </div>
//         )}

//         {/* PIN Setup Popup */}
//         {showPinSetup && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-md w-80">
//               <h2 className="text-2xl font-bold text-center">ตั้งค่า PIN</h2>
//               <p className="text-center text-gray-600 mb-4">กรุณาตั้งรหัส PIN 4 หลัก</p>
//               <form onSubmit={handleSetPin}>
//                 <div className="mb-4">
//                   <input
//                     type="password"
//                     value={pin}
//                     onChange={(e) => setPin(e.target.value)}
//                     placeholder="Enter 4-digit PIN"
//                     maxLength="4"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
//                 >
//                   ตั้งค่า PIN
//                 </button>
//                 {message && <p className="text-center text-green-500 mt-4">{message}</p>}
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;

// src/components/customer/CustomerDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from './MainLayout';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const CustomerDashboard = () => {
  const [points, setPoints] = useState(null);
  const [showPinSetup, setShowPinSetup] = useState(false);
  const [showQrPopup, setShowQrPopup] = useState(false);
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');
  const [customerName, setCustomerName] = useState("ลูกค้า");

  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId || localStorage.getItem('userId');

  useEffect(() => {
    const storedCustomerName = localStorage.getItem('customerName');
    if (storedCustomerName) {
      setCustomerName(storedCustomerName);
    }

    if (location.state?.userId) {
      localStorage.setItem('userId', location.state.userId);
    }

    const checkPin = async () => {
      try {
        const response = await axios.post( baseURL + '/api/check-pin', { userId });
        if (!response.data.hasPin) {
          setShowPinSetup(true);
        }
      } catch (error) {
        console.error('Error checking PIN:', error);
      }
    };

    const fetchUserPoints = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/user-points/${userId}`);
        setPoints(response.data.userPoints.points);
        
      } catch (error) {
        console.error('Error fetching user points:', error);
      }
    };

    if (userId) {
      checkPin();
      fetchUserPoints();
    } else {
      navigate('/login');
    }
  }, [userId, navigate, location.state]);

  const handleSetPin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseURL + '/api/set-pin', { userId, pin });
      setMessage(response.data.message);
      setShowPinSetup(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  const handleShowQrPopup = () => {
    setShowQrPopup(true);
  };
  const handleLogout = () => {
    localStorage.removeItem('token'); // Assuming you're using token-based auth
    navigate('/login');
  };

  const handleScanQR = () => { 
    window.open(`http://localhost:3000/admin/add-point?userId=${userId}`, '_blank');
  }

  const handleCloseQrPopup = () => {
    setShowQrPopup(false);
    window.location.reload(); // This will refresh the page
  };

  return (
    <MainLayout
      points={points}
      customerName={customerName}
      onLogout={handleLogout}
    >
      {/* Content within MainLayout */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4 text-gray-500">
          <span>06 April 2021</span> | <span>Announcements</span> | <span>24 Comments</span>
        </div>
        <h2 className="text-2xl font-semibold mb-2">มีร้านเปิดใหม่</h2>
        <p className="text-gray-500 mb-4">5 mins read</p>
        <img src="/path/to/now-open-image.png" alt="Now Open" className="w-full h-auto rounded-lg mb-4" />
        <p className="text-lg">สุดยอด! ร้านอร่อยสุดล้ำ ใจกลางสยามเซ็นเตอร์</p>
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

      {/* PIN Setup Popup */}
      {showPinSetup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h2 className="text-2xl font-bold text-center">ตั้งค่า PIN</h2>
            <p className="text-center text-gray-600 mb-4">กรุณาตั้งรหัส PIN 4 หลัก</p>
            <form onSubmit={handleSetPin}>
              <div className="mb-4">
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter 4-digit PIN"
                  maxLength="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
                ตั้งค่า PIN
              </button>
              {message && <p className="text-center text-green-500 mt-4">{message}</p>}
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default CustomerDashboard;

