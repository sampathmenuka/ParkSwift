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
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow mx-2 sm:mx-0">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h3 className="text-lg font-semibold text-gray-900">System Logs</h3>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search logs..."
            className="w-full pl-8 pr-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            aria-label="Search logs"
          />
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">🔍</span>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Timestamp
              </th>
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Action
              </th>
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider hidden sm:table-cell">
                Description
              </th>
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider hidden md:table-cell">
                User
              </th>
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider hidden lg:table-cell">
                IP Address
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 sm:px-4 text-gray-700 whitespace-nowrap">{log.timestamp}</td>
                <td className="py-3 px-2 sm:px-4 text-gray-700 whitespace-nowrap">{log.action}</td>
                <td className="py-3 px-2 sm:px-4 text-gray-700 hidden sm:table-cell">{log.description}</td>
                <td className="py-3 px-2 sm:px-4 text-gray-700 hidden md:table-cell whitespace-nowrap">{log.user}</td>
                <td className="py-3 px-2 sm:px-4 text-gray-700 hidden lg:table-cell whitespace-nowrap">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Button */}
      <div className="mt-4 flex justify-end">
        <button className="px-3 py-1.5 sm:px-4 sm:py-2 border rounded-lg text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          Export Logs
        </button>
      </div>
    </div>
  );
};

export default SystemLogs;