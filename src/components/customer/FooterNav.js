// src/components/FooterNav.js
import React from 'react';
import { FaGift, FaHistory, FaTags, FaTrophy } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FooterNav = () => (
  <footer className="fixed inset-x-0 bottom-0 bg-white shadow-lg mt-4">
    <nav className="flex justify-around items-center p-4 border-t">
      <Link to="/customerDashBoard" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
        <FaTags className="text-xl" />
        <span className="text-xs">โปรโมชั่น</span>
      </Link>
      <Link to="/rewards" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
        <FaTrophy className="text-xl" />
        <span className="text-xs">ของรางวัล</span>
      </Link>
      <Link to="/coupons" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
        <FaGift className="text-xl" />
        <span className="text-xs">คูปอง</span>
      </Link>
      <Link to="/histories" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
        <FaHistory className="text-xl" />
        <span className="text-xs">ประวัติ</span>
      </Link>
    </nav>
  </footer>
);

export default FooterNav;
