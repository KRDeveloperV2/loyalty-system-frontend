import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faHistory } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';

const PointList = () => {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch points and user data from the API
    const fetchPoints = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users');
        setPoints(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching points:', error);
        setError('Failed to load points data');
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  const handleEditPoints = (userId) => {
    // Navigate to the edit page for the specific user
    navigate(`/admin/points/edit/${userId}`);
  };

  const handleViewHistory = (userId) => {
    // Navigate to the history page for the specific user
    navigate(`/admin/points/history/${userId}`);
  };


  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col p-8 bg-gray-100">
        <Header title="User Points List" />
        <div className="bg-white p-6 rounded-lg shadow-md flex-1">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">User ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {points.map((point) => (
                  <tr key={point.user_id}>
                    <td className="border px-4 py-2">{point.user_id}</td>
                    <td className="border px-4 py-2">{point.name}</td>
                    <td className="border px-4 py-2">{point.phone}</td>
                    <td className="border px-4 py-2 text-center space-x-4">
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleEditPoints(point.user_id)}
                        title="Edit Points"
                      />
                      <FontAwesomeIcon
                        icon={faHistory}
                        className="text-gray-500 cursor-pointer"
                        onClick={() => handleViewHistory(point.user_id)}
                        title="View History"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default PointList;
