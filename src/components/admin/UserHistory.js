import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const UserHistory = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user , setuser] = useState('');

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/user-point-history/${userId}`);
        console.log(response);
        setHistory(response.data.history);
        console.log(response.data);
        setuser(response.data.user);
      } catch (error) {
        console.error('Error fetching user history:', error);
        setError('Failed to load history');
      } finally {
        setLoading(false);
      }
    };

    fetchUserHistory();
  }, [userId]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <Header />

        <div className="p-8 flex-1">
          <h2 className="text-2xl font-semibold mb-4">ประวัติการใช้พอยต์ของผู้ใช้ {user.name}</h2>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-gray-500">ไม่มีประวัติการใช้พอยต์</p>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b text-left">วันที่</th>
                    <th className="px-4 py-2 border-b text-left">ประเภทการทำธุรกรรม</th>
                    <th className="px-4 py-2 border-b text-left">BlockNumber</th>
                    <th className="px-4 py-2 border-b text-right">จำนวนพอยต์</th>
                    <th className="px-4 py-2 border-b text-right">คงเหลือ</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{new Date(item.timestamp).toLocaleDateString()}</td>
                      <td className="px-4 py-2 border-b">{item.transactionType}</td>
                      <td className="px-4 py-2 border-b">{item.blockNumber}</td>
                      <td className="px-4 py-2 border-b text-right">{item.points} พอยต์</td>
                      <td className="px-4 py-2 border-b text-right">{item.balanceAfterTransaction} พอยต์</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {history.length === 0 && (
                <p className="text-gray-500 text-center mt-4">ไม่มีประวัติการใช้พอยต์</p>
              )}
            </div>
          )}
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default UserHistory;
