import React, { useState } from 'react';

const Notifications = () => {
  const [notification, setNotification] = useState({ title: '', message: '', audience: 'All Users' });
  const [notifications, setNotifications] = useState([
    { title: 'System Maintenance', message: 'The system will be down for maintenance on Sunday...', target: 'All Users', sent: '11/10/2023, 8:30:00 AM', by: 'Michael Brown' },
    { title: 'New Feature: Multiple Vehicle Types', message: 'Slot owners can now specify multiple vehicle types...', target: 'Slot Owners', sent: '11/15/2023, 2:15:00 PM', by: 'Michael Brown' },
    { title: 'Holiday Season Discount', message: 'Get 10% off on bookings from Dec 20 to Jan 5...', target: 'Parking Users', sent: '10/25/2023, 11:00:00 AM', by: 'Michael Brown' },
  ]);

  const handleSend = () => {
    setNotifications([...notifications, { ...notification, sent: new Date().toLocaleString(), by: 'Admin User' }]);
    setNotification({ title: '', message: '', audience: 'All Users' });
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      {/* --- */}
      {/* Notification Form and Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
        {/* Send New Notification Form */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Send New Notification</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Notification title"
              value={notification.title}
              onChange={(e) => setNotification({ ...notification, title: e.target.value })}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              aria-label="Notification title"
            />
            <textarea
              placeholder="Enter your notification message here"
              value={notification.message}
              onChange={(e) => setNotification({ ...notification, message: e.target.value })}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 h-24 sm:h-32 text-sm sm:text-base"
              aria-label="Notification message"
            />
            <select
              value={notification.audience}
              onChange={(e) => setNotification({ ...notification, audience: e.target.value })}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              aria-label="Notification audience"
            >
              <option>All Users</option>
              <option>Slot Owners</option>
              <option>Parking Users</option>
            </select>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg focus:ring-indigo-400 text-sm sm:text-base"
                aria-label="Send notification"
              >
                Send Notification
              </button>
            </div>
          </div>
        </div>

        {/* Notification Statistics */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Notification Statistics</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-100 p-3 sm:p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm sm:text-base">Total Sent</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="bg-gray-100 p-3 sm:p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm sm:text-base">To Users</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">1</p>
            </div>
            <div className="bg-gray-100 p-3 sm:p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm sm:text-base">To Owners</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
          <h4 className="text-md sm:text-lg font-semibold text-gray-900 mb-2">Delivery Methods</h4>
          <div className="flex flex-wrap gap-2"> {/* Use flex-wrap for better wrapping on small screens */}
            <span className="px-2 py-1 bg-gray-200 rounded-full text-xs sm:text-sm">In-App</span>
            <span className="px-2 py-1 bg-gray-200 rounded-full text-xs sm:text-sm">Email</span>
          </div>
        </div>
      </div>

      {/* --- */}
      {/* Recently Sent Notifications Table */}
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-6 mb-4">Recently Sent Notifications</h3>
      <div className="overflow-x-auto"> {/* Enable horizontal scrolling for the table */}
        <table className="w-full border-collapse min-w-[600px]"> {/* Set a minimum width for the table */}
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left py-2 px-2 sm:px-4 text-gray-700 text-sm sm:text-base">Title</th>
              <th className="text-left py-2 px-2 sm:px-4 text-gray-700 text-sm sm:text-base">Message</th>
              <th className="text-left py-2 px-2 sm:px-4 text-gray-700 text-sm sm:text-base">Target Group</th>
              <th className="text-left py-2 px-2 sm:px-4 text-gray-700 text-sm sm:text-base">Sent At</th>
              <th className="text-left py-2 px-2 sm:px-4 text-gray-700 text-sm sm:text-base">Sent By</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notif, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-2 sm:px-4 text-gray-900 text-sm">{notif.title}</td>
                <td className="py-2 px-2 sm:px-4 text-gray-700 text-sm">{notif.message.substring(0, 30)}...</td>
                <td className="py-2 px-2 sm:px-4 text-gray-700 text-sm">{notif.target}</td>
                <td className="py-2 px-2 sm:px-4 text-gray-700 text-sm">{notif.sent}</td>
                <td className="py-2 px-2 sm:px-4 text-gray-700 text-sm">{notif.by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notifications;