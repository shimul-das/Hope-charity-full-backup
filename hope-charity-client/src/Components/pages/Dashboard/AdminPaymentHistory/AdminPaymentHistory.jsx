import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/payment-history')
      .then(response => {
        setPaymentHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching payment history:', error);
      });
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">All Payment History</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Message</th>
            <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map(payment => (
            <tr key={payment._id} className="bg-white">
              <td className="border border-gray-300 px-4 py-2">{payment._id}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.name}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.email}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.amount}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.category}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.message}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.transactionId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPaymentHistory;
