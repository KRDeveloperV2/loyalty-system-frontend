import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import Modal from 'react-modal';
import MainLayout from './MainLayout';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';


Modal.setAppElement('#root');

const CouponPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [points, setPoints] = useState(0);
  const [activeTab, setActiveTab] = useState('available');
  const [showCouponPopup, setShowCouponPopup] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [userId, setUserId] = useState(null);
  const [customerName, setCustomerName] = useState("ลูกค้า");
  const navigate = useNavigate();

  useEffect(() => {

    const storedCustomerName = localStorage.getItem('customerName');
    if (storedCustomerName) {
      setCustomerName(storedCustomerName);
    }
    
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("User ID not found in localStorage");
    }
  }, []);

  const fetchCoupons = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`http://localhost:4000/api/coupons/available?userId=${userId}`);
      setCoupons(response.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm:ss');
  };
  

  const fetchUserPoints = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`http://localhost:4000/api/user-points/${userId}`);
      setPoints(response.data.userPoints.points);
    } catch (error) {
      console.error('Error fetching user points:', error);
    }
  };

  useEffect(() => {
    fetchCoupons();
    fetchUserPoints();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleUseCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setShowCouponPopup(true);
  };

  const closeCouponPopup = () => {
    setShowCouponPopup(false);
    setSelectedCoupon(null);
  };

  const handleConfirmUseCoupon = async () => {
    try {
      await axios.post(`http://localhost:4000/api/coupons/use`, { couponId: selectedCoupon.id });
      alert(`คูปอง ${selectedCoupon.name} ถูกใช้แล้ว!`);
      closeCouponPopup();
      fetchCoupons();
    } catch (error) {
      console.error('Error using coupon:', error);
      alert('การใช้คูปองล้มเหลว กรุณาลองใหม่');
    }
  };

  const availableCoupons = coupons.filter(coupon => !coupon.is_used);
  const usedCoupons = coupons.filter(coupon => coupon.is_used);

  return (
    <MainLayout points={points} onReceivePoints={() => setShowCouponPopup(true)} customerName={customerName} onLogout={handleLogout}>
      <div className="p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">คูปอง</h2>

        <div className="flex space-x-4 border-b">
          <button
            onClick={() => setActiveTab('available')}
            className={`pb-2 ${activeTab === 'available' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            คูปอง
          </button>
          <button
            onClick={() => setActiveTab('used')}
            className={`pb-2 ${activeTab === 'used' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            ใช้งานแล้ว
          </button>
        </div>

        <div className="mt-4">
          {activeTab === 'available' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {availableCoupons.length > 0 ? (
                availableCoupons.map((coupon) => (
                  <div key={coupon.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
                    <img src={coupon.image_url} alt={coupon.name} className="w-20 h-20 rounded-full" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">{coupon.name}</h3>
                      <p className="text-gray-500">{coupon.points_required} พอยท์</p>
                      <p className="text-gray-500">วันที่ : {formatDateTime(coupon.redeemed_at)}</p>
                    </div>
                    <button
                      onClick={() => handleUseCoupon(coupon)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      ใช้คูปอง
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">ไม่มีคูปองที่ยังไม่ได้ใช้</p>
              )}
            </div>
          )}

          {activeTab === 'used' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {usedCoupons.length > 0 ? (
                usedCoupons.map((coupon) => (
                  <div key={coupon.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4 opacity-50">
                    <img src={coupon.image_url} alt={coupon.name} className="w-20 h-20 rounded-full" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">{coupon.name}</h3>
                      <p className="text-gray-500">ใช้แล้ว</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">ไม่มีคูปองที่ใช้ไปแล้ว</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Coupon QR Code Popup */}
      {showCouponPopup && selectedCoupon && (
        <Modal
          isOpen={showCouponPopup}
          onRequestClose={closeCouponPopup}
          className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-xl font-bold mb-4">ใช้คูปอง</h2>
          <p>สแกน QR Code ด้านล่างเพื่อใช้คูปอง {selectedCoupon.name}</p>
          <div className="my-4 flex justify-center">
            <QRCodeCanvas value={`http://localhost:4000/api/coupons/use?couponId=${selectedCoupon.id}`} size={200} />
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={closeCouponPopup}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
            >
              ปิด
            </button>
            <button
              onClick={handleConfirmUseCoupon}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              ใช้คูปอง
            </button>
          </div>
        </Modal>
      )}
    </MainLayout>
  );
};

export default CouponPage;
