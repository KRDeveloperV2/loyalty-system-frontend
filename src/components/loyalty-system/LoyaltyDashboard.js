import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const LoyaltyDashboard = () => {
    // const [users, setUsers] = useState([]);
    // const [transactions, setTransactions] = useState([]);

    // useEffect(() => {
    //     // ดึงข้อมูลผู้ใช้จาก API
    //     axios.get('http://localhost:4000/api/users')
    //         .then(response => setUsers(response.data))
    //         .catch(error => console.error('Error fetching users:', error));

    //     // ดึงข้อมูลการทำธุรกรรมจาก API
    //     axios.get('http://localhost:4000/api/transactions')
    //         .then(response => setTransactions(response.data))
    //         .catch(error => console.error('Error fetching transactions:', error));
    // }, []);

    // return (
    //     <div className="container">
    //         <h1 className="my-4">Loyalty System Dashboard</h1>

    //         {/* การแสดงข้อมูลผู้ใช้งาน */}
    //         <Card className="mb-4">
    //             <CardHeader><strong>User List</strong></CardHeader>
    //             <CardBody>
    //                 <Table striped bordered>
    //                     <thead>
    //                         <tr>
    //                             <th>User ID</th>
    //                             <th>Name</th>
    //                             <th>Points Balance</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {users.map(user => (
    //                             <tr key={user.user_id}>
    //                                 <td>{user.user_id}</td>
    //                                 <td>{user.name}</td>
    //                                 <td>{user.points_balance}</td>
    //                             </tr>
    //                         ))}
    //                     </tbody>
    //                 </Table>
    //             </CardBody>
    //         </Card>

    //         {/* การแสดงข้อมูลธุรกรรม */}
    //         <Card className="mb-4">
    //             <CardHeader><strong>Recent Transactions</strong></CardHeader>
    //             <CardBody>
    //                 <Table striped bordered>
    //                     <thead>
    //                         <tr>
    //                             <th>Transaction ID</th>
    //                             <th>User ID</th>
    //                             <th>Type</th>
    //                             <th>Points</th>
    //                             <th>Status</th>
    //                             <th>Date</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {transactions.map(transaction => (
    //                             <tr key={transaction.transaction_id}>
    //                                 <td>{transaction.transaction_id}</td>
    //                                 <td>{transaction.user_id}</td>
    //                                 <td>{transaction.transaction_type}</td>
    //                                 <td>{transaction.points}</td>
    //                                 <td>{transaction.status}</td>
    //                                 <td>{new Date(transaction.date).toLocaleString()}</td>
    //                             </tr>
    //                         ))}
    //                     </tbody>
    //                 </Table>
    //             </CardBody>
    //         </Card>
    //     </div>
    // );

    const navigate = useNavigate();

    useEffect(() => {
      // ตรวจสอบว่า token มีอยู่ใน session storage หรือไม่
      const token = sessionStorage.getItem("authToken");
      
      // ถ้าไม่มี token ให้เปลี่ยนเส้นทางไปที่หน้า Login
      if (!token) {
        navigate("/login");
      }
    }, [navigate]);
  
    return (
      <div>
        <h1>Welcome to the Dashboard</h1>
      </div>
    );
};

export default LoyaltyDashboard;
