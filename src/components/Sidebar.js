import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaGift, FaUserFriends, FaBullhorn, FaRunning, FaMapMarkerAlt, FaTruck, FaUserTie, FaHistory } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-8 text-blue-600">APP-POINT</h2>
      <nav className="space-y-4">
        <SidebarLink icon={<FaHome />} text="Dashboards" to="/admin/index" />
        <SidebarLink icon={<FaGift />} text="Rewards" to="/admin/rewards"  />
        <SidebarLink icon={<FaUserFriends />} text="Customer" to="/admin/customers"  />
        <SidebarLink icon={<FaMapMarkerAlt />} text="Point" to="/admin/points"  />
        {/* <SidebarLink icon={<FaTruck />} text="Delivery" /> */}
      </nav>
    </aside>
  );
};

const SidebarLink = ({ icon, text, to }) => (
    <Link to={to} className="flex items-center text-gray-700 hover:text-blue-600 mb-2">
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </Link>
  );

export default Sidebar;
