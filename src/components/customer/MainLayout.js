// src/components/MainLayout.js
import React from 'react';
import FooterNav from './FooterNav';
import HeaderNav from './HeaderNav';

const MainLayout = ({ children, customerName, points, onReceivePoints, onTransferPoints, onLogout }) => (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <HeaderNav
      customerName={customerName}
      points={points}
      onReceivePoints={onReceivePoints}
      onTransferPoints={onTransferPoints}
      onLogout={onLogout}
    />
    <main className="flex-grow p-4">{children}</main>
    <br/>
    <br/>
    <br/>
    <FooterNav />
  </div>
);

export default MainLayout;
