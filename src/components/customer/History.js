import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import MainLayout from './MainLayout';
const baseURL = process.env.REACT_APP_API_BASE_URL;

const History = () => {
  const [showQrPopup, setShowQrPopup] = useState(false);
  const [points, setPoints] = useState(null);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("ลูกค้า");

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const storedCustomerName = localStorage.getItem('customerName');
    if (storedCustomerName) {
      setCustomerName(storedCustomerName);
    }

    const fetchUserPoints = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/user-points/${userId}`);
        setPoints(response.data.userPoints.points);
      } catch (error) {
        console.error('Error fetching user points:', error);
      }
    };

  
    const fetchUserHistory = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/user-point-history/${userId}`);
        setHistory(response.data.history);
      } catch (error) {
        console.error('Error fetching user history:', error);
      }
    };

    if (userId) {
      fetchUserPoints();
      fetchUserHistory();
    } else {
      alert('User not found, please log in.');
      navigate('/login');
    }
  }, [userId, navigate]);

  const handleShowQrPopup = () => {
    setShowQrPopup(true);
  };

  const openAddPointPage = () => {
    window.open(`http://localhost:3000/admin/add-point?userId=${userId}`, '_blank');
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Assuming you're using token-based auth
    navigate('/login');
  };

  return (
    <MainLayout       
    points={points}
    customerName={customerName}
    onLogout={handleLogout}>
      <div className="p-8 flex-1">
        <h2 className="text-2xl font-semibold mb-4">ประวัติการใช้พอยต์</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {history.length > 0 ? (
            <div className="grid gap-4">
              {history.map((item, index) => (
                <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                  {/* Image on the left */}
                  
                  {/* Details in the center */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.transactionType}</h3>
                    <h4> {(item.transactionType === 'TransferIn' || item.transactionType === 'TransferOut') && (
    <span className="text-sm text-gray-500"> (User ID: {item.userId})</span>
  )}</h4>
                    <p className="text-lg text-black-500">
                      {item.points} พอยท์
                    </p>
                    <p class="text-gray-500">
                      Hash : {item.txHash}
                    </p>
                    <p class="text-gray-500">
                      Method :  {item.method}
                    </p>
                    <p class="text-gray-500">
                     BlockNumber :  {item.blockNumber}
                    </p>
                    <p class="text-gray-500">
                     Balance :  {item.balanceAfterTransaction}
                    </p>
                    <p className="text-sm text-gray-400">
                      วันที่ : {new Date(item.timestamp).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">ไม่มีประวัติการใช้พอยต์</p>
          )}
        </div>
      </div>

      {showQrPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
            <h2 className="text-xl font-bold mb-4">สแกน QR Code</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <QRCodeCanvas
              value={`http://localhost:4000/admin/add-point?userId=${userId}`}
              size={200}
            />
            </div>
            <p className="text-sm text-gray-600 mt-4">กรุณานำ QR Code ให้กับพนักงานเพื่อรับพอยต์</p>
            <button
              onClick={openAddPointPage}
              className="mt-4 px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              ไปที่หน้า Add Point
            </button>
            <button
              onClick={() => setShowQrPopup(false)}
              className="mt-2 px-4 py-2 font-semibold text-gray-600 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default History;
