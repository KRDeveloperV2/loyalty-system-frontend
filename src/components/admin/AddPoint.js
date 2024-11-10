import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';

const AddPoint = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [phone, setPhone] = useState('');
  const [points, setPoints] = useState('');
  const [latestPoints, setLatestPoints] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('userId');
    console.log(id);
    setUserId(id);

    if (id) {
      axios.get(`http://localhost:4000/api/users/${id}`)
        .then(userResponse => {
          setPhone(userResponse.data.phone);

          return axios.get(`http://localhost:4000/api/user-points/${id}`);
        })
        .then(pointsResponse => {
          setLatestPoints(parseInt(pointsResponse.data.userPoints.points, 10));
          setLoading(false);
        })
        .catch(error => {
          setMessage('Failed to fetch user data');
          setLoading(false);
        });
    } else {
      navigate('/'); // หากไม่มี userId ให้ redirect กลับหน้าแรก
    }
  }, [location.search, navigate]);

  const handlePointChange = (e) => {
    setPoints(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //const updatedPoints = latestPoints + parseInt(points, 10);

    axios.post('http://localhost:4000/api/add-point', {
      userId: userId,
      phone: phone,
      point: parseInt(points, 10),
    })
    .then(response => {
      setMessage(response.data.message);
      //navigate('/admin/points');
      window.close();
    })
    .catch(error => {
      if (error.response && error.response.data) {
        console.log(error);
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred');
      }
    });
  };

  return (
    <div className="flex min-h-screen">
      
      <main className="flex-1 flex flex-col p-8 bg-gray-100">
       

        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Phone:</label>
                <input
                  type="text"
                  value={phone}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-1">Quantity of Points:</label>
                <input
                  type="number"
                  value={points}
                  onChange={handlePointChange}
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


      </main>
    </div>
  );
};

export default AddPoint;
