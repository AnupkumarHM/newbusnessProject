import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const GenerateInvoice = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [serviceCharge, setServiceCharge] = useState();
  const [platformFee, setPlatformFee] = useState();

  useEffect(() => {
    // Function to fetch users
    const fetchUsers = async () => {
      try {
        const response = await api.fetchUsers();
        setUsers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };


    fetchUsers();

 
  }, []);

  const handleGenerateInvoice = async (event) => {
    event.preventDefault();
    try {
      const invoiceData = { userId: selectedUserId, serviceCharge, platformFee };

      api.downloadInvoice(invoiceData);

    } catch (error) {
      console.error('Error generating invoice:', error);
    }
  };

  return (
    <div className="auth-page">
      <h2>Generate Invoice</h2>
      <form onSubmit={handleGenerateInvoice}>
        <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)} required>
          <option value="" disabled>Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>{user.firstName} {user.lastName}</option>
          ))}
        </select>
        <input
          type="number"
          value={serviceCharge}
          onChange={(e) => setServiceCharge(e.target.value)}
          placeholder="Service Charge"
          required
        />
        <input
          type="number"
          value={platformFee}
          onChange={(e) => setPlatformFee(e.target.value)}
          placeholder="Platform Fee"
          required
        />
        <button type="submit">Generate Invoice</button>
      </form>
    </div>
  );
};

export default GenerateInvoice;
