import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="w-64 h-full bg-gray-50 p-6">
    <h2 className="text-xl font-bold mb-4">APP-POINT</h2>
    <nav className="flex flex-col space-y-4">
      <Link to="/promotions" className="text-gray-700 hover:text-blue-600">โปรโมชั่น</Link>
      <Link to="/rewards" className="text-gray-700 hover:text-blue-600">ของรางวัล</Link>
      <Link to="/coupons" className="text-gray-700 hover:text-blue-600">คูปอง</Link>
      <Link to="/histories" className="text-gray-700 hover:text-blue-600">ประวัติ</Link>
    </nav>
  </aside>
);

export default Sidebar;