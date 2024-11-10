import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoyaltyDashboard from './components/loyalty-system/LoyaltyDashboard'; // ตรวจสอบเส้นทางการนำเข้าให้ถูกต้อง
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AdminDashboard from './components/admin/AdminDashboard'; // สร้าง Component AdminDashboard
import CustomerLogin from './components/customer/CustomerLogin'; // นำเข้าหน้า CustomerLogin
import OtpVerification from './components/customer/OtpVerification';
import Activity from './components/customer/Activity'; // นำเข้าหน้า Activity
import LoginCust from './components/customer/LoginCust';
import CustomerDashboard from './components/customer/CustomerDashboard';
import AddPoint from './components/admin/AddPoint';
import UserList from './components/admin/UserList';
import RewardList from './components/admin/RewardList'
import AddReward from './components/admin/AddReward';
import EditReward from './components/admin/EditReward';
import PointList from './components/admin/PointList';
import EditPoint from './components/admin/EditPoint';
import RewardListUser from './components/customer/RewardListUser';
import CouponPage from './components/customer/CouponPage';
import History from './components/customer/History';
import Promotion from './components/customer/Promotion';
import UserHistory from './components/admin/UserHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoyaltyDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginCustomer" element={<LoginCust />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/index" element={<AdminDashboard />} />
        <Route path="/admin/add-point" element={<AddPoint />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/activity" element={<Activity />} /> 
        <Route path="/customerDashboard" element={<CustomerDashboard />} /> 
        <Route path="/rewards" element={<RewardListUser />} />
        <Route path="/coupons" element={<CouponPage />} />
        <Route path="/histories" element={<History />} />
        <Route path="/Promotion" element={<Promotion />} />

        <Route path="/admin/customers" element={<UserList />} />
        <Route path="/admin/rewards" element={<RewardList />} />
        <Route path="/admin/rewards/add" element={<AddReward />} />
        <Route path="/admin/rewards/edit/:reward_id" element={<EditReward />} />
        <Route path="/admin/points" element={<PointList/>} />
        <Route path="/admin/points/edit/:id" element={<EditPoint />} />
        <Route path="/admin/points/history/:userId" element={<UserHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
