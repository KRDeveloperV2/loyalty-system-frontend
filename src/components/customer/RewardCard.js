import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

// ตั้งค่าเริ่มต้นให้กับ Modal
Modal.setAppElement('#root');

const RewardCard = ({ reward, userId }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userPoints, setUserPoints] = useState(0);

  // เปิด Dialog ยืนยัน
  const openConfirmDialog = () => {
    // ดึงคะแนนล่าสุดของผู้ใช้เมื่อเปิด Dialog
    axios.get(`http://localhost:4000/api/user-points/${userId}`)
      .then(response => {
        setUserPoints(parseInt(response.data.userPoints.points, 10));
        setIsConfirmOpen(true);
      })
      .catch(error => {
        console.error('Error fetching user points:', error);
        alert('ไม่สามารถดึงคะแนนของคุณได้ กรุณาลองใหม่อีกครั้ง');
      });
  };

  // ปิด Dialog ยืนยัน
  const closeConfirmDialog = () => setIsConfirmOpen(false);

  // ฟังก์ชันที่เรียกใช้เมื่อกดยืนยัน
  const handleConfirmRedeem = async () => {
    try {
      // ตรวจสอบว่าผู้ใช้มีคะแนนเพียงพอ
      if (userPoints < reward.points_required) {
        alert('คะแนนของคุณไม่เพียงพอในการแลกรางวัลนี้');
        closeConfirmDialog();
        return;
      }

      // คำนวณคะแนนใหม่หลังจากหักคะแนนที่ใช้ในการแลกรางวัล
      //const updatedPoints = userPoints - reward.points_required;

      // อัปเดตคะแนนใหม่และบันทึกการแลกรางวัล
      await axios.post('http://localhost:4000/api/redeem-reward', {
        userId: userId,
        rewardId: reward.reward_id,
        userPoints: reward.points_required
      });

      alert(`คุณได้แลกรางวัล ${reward.name} สำเร็จ!`);
      setUserPoints(reward.points_required); // อัปเดตคะแนนใน UI
    } catch (error) {
      console.error('Error redeeming reward:', error);
      alert('การแลกรางวัลล้มเหลว กรุณาลองใหม่อีกครั้ง');
    }
    closeConfirmDialog();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 max-w-md mx-auto">
      {/* Image Section */}
      <div className="w-24 h-24 rounded-full overflow-hidden">
        <img
          src={reward.image_url}
          alt={reward.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{reward.name}</h3>
        <div className="text-gray-500 mt-1">
          <p className="text-lg">{reward.points_required} พอยท์</p>
          <p className="text-sm">{reward.redeemed_count} ครั้ง แลกไปแล้ว</p>
        </div>
      </div>

      {/* Button Section */}
      <button
        onClick={openConfirmDialog}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        แลกรางวัล
      </button>
    
      {/* Modal สำหรับการยืนยัน */}
      <Modal
        isOpen={isConfirmOpen}
        onRequestClose={closeConfirmDialog}
        className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">แลกรางวัล</h2>
        <p>คุณแน่ใจหรือไม่ว่าต้องการแลกรางวัลนี้?</p>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={closeConfirmDialog}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleConfirmRedeem}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            ยืนยัน
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RewardCard;
