import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';

const EditPoint = () => {
  const { id } = useParams(); // User ID from route parameter
  const navigate = useNavigate();
  const [userId , setUserId] = useState('');
  const [phone, setPhone] = useState('');
  const [points, setPoints] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [latestPoints, setLatestPoints] = useState(''); // New state for latest points

  useEffect(() => {
    // Fetch user details by ID
    axios.get(`http://localhost:4000/api/user-points/${id}`)
      .then(response => {
        if (response.status === 200) {
          const user = response.data.userPoints;
          console.log(response);
          console.log(user);

          setUserId(user.userId);
          setLatestPoints(user.points || 0); // Set the latest points label with default
          return axios.get(`http://localhost:4000/api/users/${id}`);
        } else {
          throw new Error('Failed to load points data');
        }
      })
      .then(userResponse => {
        console.log(userResponse);
        setPhone(userResponse.data.phone || ''); // Set the phone number if it exists
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        setMessage('Failed to load user data');
        setLoading(false);
      });
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();

    // Calculate the updated points by adding the new points to the latest points
    //const updatedPoints = parseInt(latestPoints, 10) + parseInt(points, 10);

    // Call the add-point endpoint with the updated points value
    axios.post(`http://localhost:4000/api/add-point`, {
      userId: id,
      phone: phone,
      point: parseInt(points, 10),
    })
    .then(response => {
      setMessage('Points added successfully to blockchain!');
      console.log('Transaction result:', response.data.transaction);
      navigate('/admin/points');
    })
    .catch(error => {
      console.error('Error adding points to blockchain:', error);
      setMessage('Failed to add points to blockchain');
    });
  };
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col p-8 bg-gray-100">
        <Header title="Edit Points" />

        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Phone:</label>
                <input
                  type="text"
                  value={phone}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-1">Quantity of Points:</label>
                <input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter the new point quantity"
                  required
                />
              </div>

              <div className="mb-4">
                <span className="text-gray-500">Latest Points: {latestPoints}</span>
              </div>

              {message && <p className="text-center text-green-500 mb-4">{message}</p>}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                  onClick={() => navigate('/admin/points')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default EditPoint;
