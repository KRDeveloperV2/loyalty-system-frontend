import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';

const RewardList = () => {
  const [rewards, setRewards] = useState([]);
  const navigate = useNavigate();

  // Function to fetch rewards data
  const fetchRewards = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/rewards');
      setRewards(response.data);
    } catch (error) {
      console.error('Error fetching rewards:', error);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  // Function to handle reward deletion
  const handleDelete = async (rewardId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this reward?');
    if (!confirmDelete) return;

    try {
      const response = await axios.post('http://localhost:4000/api/delete-rewards', {
        reward_id: rewardId,
      });

      if (response.status === 200) {
        alert('Reward deleted successfully.');
        fetchRewards(); // Re-fetch the rewards list
      } else {
        alert('Failed to delete reward.');
      }
    } catch (error) {
      console.error('Error deleting reward:', error);
      alert('Failed to delete reward. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <Header title="Reward List" />
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate('/admin/rewards/add')} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg">
            Add Reward
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rewards.map((reward) => (
            <div key={reward.reward_id} className="bg-white p-6 rounded-lg shadow-md text-center">
              <img src={reward.image_url} alt={reward.name} className="w-full h-48 object-cover rounded-full mb-4" />
              <h2 className="text-xl font-bold">{reward.name}</h2>
              <p className="text-gray-500 mb-4">{reward.points_required} พอยท์ที่ใช้</p>
              <p className="text-gray-500 mb-2">{reward.redeemed_count} ครั้งแลกไปแล้ว</p>
              <div className="flex justify-center space-x-2 mt-4">
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                  onClick={() => navigate(`/admin/rewards/edit/${reward.reward_id}`)}
                >
                  แก้ไข
                </button>
                {reward.status === 1 && (
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                    onClick={() => handleDelete(reward.reward_id)}
                  >
                    ลบ
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default RewardList;
