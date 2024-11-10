import React from 'react';

const Content = () => (
  <main className="flex-1 p-6 bg-gray-100">
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">มีร้านเปิดใหม่</h2>
      <p className="text-gray-500 text-sm mt-1">06 April 2021 | Announcements | 24 Comments</p>
      <p className="mt-4 text-gray-700">5 mins read</p>
      <div className="mt-4">
        <img src="https://via.placeholder.com/200" alt="New Store" className="mb-4"/>
        <p className="text-gray-700">สุดยอด! ร้านอร่อยสุดล้ำ ใจกลางสยามเซ็นเตอร์</p>
      </div>
    </section>
  </main>
);

export default Content;
