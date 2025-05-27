import React, { useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([
    { name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joined: '2023-05-10' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'owner', status: 'active', joined: '2023-06-15' },
    { name: 'Robert Johnson', email: 'robert@example.com', role: 'user', status: 'banned', joined: '2023-07-20' },
    { name: 'Emily Davis', email: 'emily@example.com', role: 'owner', status: 'active', joined: '2023-08-05' },
    { name: 'Michael Brown', email: 'michael@example.com', role: 'admin', status: 'active', joined: '2023-09-12' },
  ]);

  const handleBan = (email) => {
    setUsers(users.map(user =>
      user.email === email ? { ...user, status: user.status === 'active' ? 'banned' : 'active' } : user
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Manage Users</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="pl-8 pr-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Search users"
          />
          <span className="absolute left-2 top-2 text-gray-400">🔍</span>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 text-gray-700">User</th>
            <th className="text-left py-2 text-gray-700">Email</th>
            <th className="text-left py-2 text-gray-700">Role</th>
            <th className="text-left py-2 text-gray-700">Status</th>
            <th className="text-left py-2 text-gray-700">Joined Date</th>
            <th className="text-left py-2 text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 flex items-center">
                <span className="mr-2">👤</span>
                <span className="text-gray-900">{user.name}</span>
              </td>
              <td className="py-2 text-gray-700">{user.email}</td>
              <td className="py-2">
                <span className="px-2 py-1 bg-gray-200 rounded-full text-sm text-gray-700">
                  {user.role}
                </span>
              </td>
              <td className="py-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    user.status === 'active'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="py-2 text-gray-700">{user.joined}</td>
              <td className="py-2">
                <button
                  onClick={() => handleBan(user.email)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    user.status === 'active'
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-pink-100 text-red-500 hover:bg-pink-200'
                  }`}
                  aria-label={user.status === 'active' ? `Ban ${user.name}` : `Unban ${user.name}`}
                >
                  {user.status === 'active' ? 'Ban' : 'Unban'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        <button className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
          Export User Data
        </button>
      </div>
    </div>
  );
};

export default Users;