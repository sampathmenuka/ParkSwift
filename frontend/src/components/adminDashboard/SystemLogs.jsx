import React, { useState } from 'react';

const SystemLogs = () => {
  const [logs, setLogs] = useState([
    { timestamp: '11/15/2023, 10:23:45 AM', action: 'USER_LOGIN', description: 'User logged in successfully', user: 'John Doe', ip: '192.168.1.1' },
    { timestamp: '11/15/2023, 10:23:45 AM', action: 'USER_LOGIN', description: 'User logged in successfully', user: 'John Doe', ip: '192.168.1.1' },
    { timestamp: '11/15/2023, 11:45:12 AM', action: 'SLOT_CREATED', description: 'New parking slot added', user: 'Jane Smith', ip: '192.168.1.2' },
    { timestamp: '11/15/2023, 1:13:33 PM', action: 'BOOKING_COMPLETED', description: 'Booking payment processed successfully', user: 'John Doe', ip: '192.168.1.1' },
    { timestamp: '11/15/2023, 5:08:27 PM', action: 'ADMIN_ACTION', description: 'User account banned', user: 'Michael Brown', ip: '192.168.1.5' },
    { timestamp: '11/15/2023, 5:40:01 PM', action: 'USER_LOGOUT', description: 'User logged out', user: 'John Doe', ip: '192.168.1.1' },
  ]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">System Logs</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search logs..."
            className="pl-8 pr-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Search logs"
          />
          <span className="absolute left-2 top-2 text-gray-400">🔍</span>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 text-gray-700">Timestamp</th>
            <th className="text-left py-2 text-gray-700">Action</th>
            <th className="text-left py-2 text-gray-700">Description</th>
            <th className="text-left py-2 text-gray-700">User</th>
            <th className="text-left py-2 text-gray-700">IP Address</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 text-gray-700">{log.timestamp}</td>
              <td className="py-2 text-gray-700">{log.action}</td>
              <td className="py-2 text-gray-700">{log.description}</td>
              <td className="py-2 text-gray-700">{log.user}</td>
              <td className="py-2 text-gray-700">{log.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        <button className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
          Export Logs
        </button>
      </div>
    </div>
  );
};

export default SystemLogs;