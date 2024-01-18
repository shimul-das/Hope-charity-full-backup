import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminAllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users from the backend
    axios.get('http://localhost:5000/admin-users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleRoleToggle = async (id, newRole) => {
    try {
      // Update user role via backend API
      await axios.put(`http://localhost:5000/admin-users/${id}`, { role: newRole });

      // Update the state to reflect the new role
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === id ? { ...user, role: newRole } : user
        )
      );

      if (newRole === 'admin') {
        // Show SweetAlert notification for role change to admin
        Swal.fire({
          icon: 'success',
          title: 'Role Updated',
          text: `${newRole === 'admin' ? 'Promoted to Admin' : 'Demoted to Student'}`,
        });
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Admin - Show All Users</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="bg-white">
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={user.image}
                  alt={`${user.name}'s avatar`}
                  className="h-10 w-10 rounded-full"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() =>
                    handleRoleToggle(
                      user._id,
                      user.role === 'admin' ? 'student' : 'admin'
                    )
                  }
                  className={`px-2 py-1 bg-blue-500 text-white rounded-md ${
                    user.role === 'admin' ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  disabled={user.role === 'admin'}
                >
                  {user.role === 'admin' ? 'Admin' : 'Make Admin'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAllUsers;
