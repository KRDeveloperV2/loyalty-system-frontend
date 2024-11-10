import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';

const EditReward = () => {
  const { reward_id } = useParams(); // Get `id` from the route parameters directly
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [pointsRequired, setPointsRequired] = useState('');
  const [status, setStatus] = useState(1); // 1 for active, 0 for inactive
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRewardDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/rewards/${reward_id}`);
        const reward = response.data;

        setName(reward.name);
        setDescription(reward.description);
        setImageUrl(reward.image_url);
        setPointsRequired(reward.points_required);
        setStatus(reward.status);
      } catch (error) {
        console.error('Error fetching reward details:', error);
      }
    };

    if (reward_id) {
      fetchRewardDetails();
    } else {
      navigate('/'); // Redirect to the homepage if `id` is missing
    }
  }, [reward_id, navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
        console.log(reward_id);
      await axios.put(`http://localhost:4000/api/update-reward/${reward_id}`, {
        name,
        description,
        image_url: imageUrl,
        points_required: parseInt(pointsRequired, 10),
        status: parseInt(status, 10), // Ensure status is a number
      });
      setMessage('Reward updated successfully!');
      navigate('/admin/rewards'); // Navigate back to rewards list after successful update
    } catch (error) {
      console.error('Error updating reward:', error);
      setMessage('Failed to update reward');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <Header title="Edit Reward" />

        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto">
          {message && <p className="text-center text-green-500 mb-4">{message}</p>}

          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Reward Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                rows="4"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Points Required *</label>
              <input
                type="number"
                value={pointsRequired}
                onChange={(e) => setPointsRequired(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(parseInt(e.target.value, 10))} // Parse as integer
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                onClick={() => navigate('/admin/rewards')}
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

export default EditReward;
