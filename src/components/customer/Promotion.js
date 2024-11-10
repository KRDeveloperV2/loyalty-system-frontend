import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Promotion = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/promotions'); // แก้ URL ตาม API ของคุณ
        setPromotions(response.data.promotions);
      } catch (err) {
        console.error("Error fetching promotions:", err);
        setError("Failed to load promotions");
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Header />

        <div className="p-8 flex-1">
          <h2 className="text-2xl font-semibold mb-4">โปรโมชั่น</h2>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              {promotions.length > 0 ? (
                <>
                  <div className="flex justify-between py-2 border-b font-semibold text-gray-700">
                    <span>ชื่อโปรโมชั่น</span>
                    <span>รายละเอียด</span>
                    <span>ระยะเวลา</span>
                  </div>
                  <ul>
                    {promotions.map((promotion, index) => (
                      <li key={index} className="flex justify-between py-2 border-b">
                        <span>{promotion.name}</span>
                        <span>{promotion.description}</span>
                        <span>{promotion.duration}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-gray-500">ไม่มีโปรโมชั่น</p>
              )}
            </div>
          )}
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Promotion;
