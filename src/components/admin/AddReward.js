import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';

const AddReward = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [pointsRequired, setPointsRequired] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/add-rewards', {
        name,
        description,
        image_url: imageUrl,
        points_required: parseInt(pointsRequired, 10),
      });
      setMessage('Reward added successfully!');
      setName('');
      setDescription('');
      setImageUrl('');
      setPointsRequired('');
    } catch (error) {
      console.error('Error adding reward:', error);
      setMessage('Failed to add reward');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
    
      <main className="flex-1 flex flex-col p-8 bg-gray-100">
      <Header title="Add Reward" />
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto">

            {message && <p className="text-center text-green-500 mb-4">{message}</p>}

            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block font-semibold mb-1">ชื่อของรางวัล *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-1">รายละเอียด</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows="4"
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-1">URL รูปภาพของรางวัล</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-1">พอยท์ที่ต้องใช้ *</label>
                <input
                  type="number"
                  value={pointsRequired}
                  onChange={(e) => setPointsRequired(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                  onClick={() => {
                    setName('');
                    setDescription('');
                    setImageUrl('');
                    setPointsRequired('');
                    setMessage('');
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
          <Footer />
        </main>

     
      </div>
  );
};

export default AddReward;
