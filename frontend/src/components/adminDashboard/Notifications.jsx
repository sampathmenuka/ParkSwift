import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';

const Notifications = () => {
  
  const {backendUrl} = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("confirmation");
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({ totalSent: 0, toUsers: 0, toOwners: 0 });

  const [notifications, setNotifications] = useState([])

  const getUsers = async () => {

    try {
      const {data} = await axios.get(backendUrl + '/api/admin/all-users')

      if (data.success) {
        setUsers(data.users);
      } else (
        toast.error(data.message)
      )
    } catch (error) {
        toast.error(error.message)
    }
  }

  const getStats = async () => {
      try {
        const { data } = await axios.get(backendUrl + "/api/admin/notification-stats");

        if (data.success) {
          setStats(data);
        } else {
          toast.error(data.message)
        }
        
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };

  const fetchRecentNotifications = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/recent-notifications");

      if (data.success) {
        setNotifications(data.formatted);
      } else{
        toast.error(data.message)
      }
      
    } catch (error) {
        toast.error(error.message)
    }
  };

  const handleSend = async (e) => {

    e.preventDefault();

    if (!selectedUser || !title || !message || !type) {
      toast.error("All fields are required")
      return
    }

    try {
      setLoading(true);

      const {data} = await axios.post(backendUrl + '/api/admin/send', {
        userId: selectedUser,
        title,
        message,
        type
      })

      if (data.success) {
        setTitle('');
        setMessage("");
        setSelectedUser("");
        setType("confirmation");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      getStats();
      fetchRecentNotifications();
    } catch (error) {
        toast.error(error.message)
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getUsers();
    getStats();
    fetchRecentNotifications();
  }, [])

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
        {/* Send New Notification Form */}
        <form onSubmit={handleSend}>
          <h3 className="text-lg sm:text-xl font-semibold text-indigo-600 mb-4">
            Send New Notification
          </h3>

          <div>
            <label className="block mb-1 font-medium">
              Select User/Owner
            </label>
            <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className="w-full px-3 py-2 sm:px-4 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base mb-4" >
              <option value="">-- Select a user --</option>
              {users.filter((u) => u.role !== "admin").map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.role}) - {u.email}
                </option>
              ))}
            </select>

            <label className="block mb-1 font-medium">
              Notification Type
            </label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 sm:px-4 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base mb-4" >
              <option value="confirmation">Confirmation</option>
              <option value="cancellation">Cancellation</option>
              <option value="reminder">Reminder</option>
              <option value="receipt">Receipt</option>
            </select>

            <input type="text" placeholder="Notification title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 sm:px-4 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base mb-4" />

            <textarea placeholder="Enter your notification message here" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-3 py-2 sm:px-4 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 h-24 sm:h-32 text-sm sm:text-base mb-4" />

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type='submit' className="px-4 py-2 bg-indigo-500 text-white rounded-lg focus:ring-indigo-400 text-sm sm:text-base" disabled={loading} >
                {loading ? "Sending..." : "Send Notification"}
              </button>
            </div>
          </div>
        </form>

        {/* Notification Statistics */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
            Notification Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-indigo-100 p-3 sm:p-4 rounded-lg text-center">
              <p className="text-gray-700 text-sm sm:text-base">
                Total Sent
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {stats.totalSent}
              </p>
            </div>
            <div className="bg-indigo-100 p-3 sm:p-4 rounded-lg text-center">
              <p className="text-gray-700 text-sm sm:text-base">
                To Users
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {stats.toUsers}
              </p>
            </div>
            <div className="bg-indigo-100 p-3 sm:p-4 rounded-lg text-center">
              <p className="text-gray-700 text-sm sm:text-base">
                To Owners
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {stats.toOwners}
              </p>
            </div>
          </div>

          <h4 className="text-md sm:text-lg font-semibold text-gray-900 mb-2">
            Delivery Methods
          </h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-200 rounded-full text-xs sm:text-sm">
              In-App
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded-full text-xs sm:text-sm">
              Email
            </span>
          </div>
        </div>
      </div>

      <hr className='mt-6'/>

      <h3 className="text-lg sm:text-xl font-semibold text-indigo-600 mt-6 mb-4">
        Recently Sent Notifications
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse divide-y divide-gray-200">
          <thead className='divide-y divide-gray-200'>
            <tr className="text-indigo-500">
              <th className="text-left py-2 px-2 sm:px-4 text-sm sm:text-base">
                Title
              </th>
              <th className="text-left py-2 px-2 sm:px-4 text-sm sm:text-base">
                Message
              </th>
              <th className="text-center py-2 px-2 sm:px-4 text-sm sm:text-base">
                Target Group
              </th>
              <th className="text-center py-2 px-2 sm:px-4 text-sm sm:text-base">
                Sent At
              </th>
              <th className="text-center py-2 px-2 sm:px-4 text-sm sm:text-base">
                Sent By
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200'>
            {notifications.map((notif, index) => (
              <tr key={index}>
                <td className="py-2 px-2 font-medium sm:px-4 text-gray-900 text-sm">{notif.title}</td>
                <td className="py-2 px-2 sm:px-4 text-gray-700 text-sm">{notif.message.substring(0, 30)}...</td>
                <td className="py-2 px-2 sm:px-4 text-center text-gray-700 text-sm font-medium">{notif.target}</td>
                <td className="py-2 px-2 sm:px-4 text-center text-gray-700 text-sm">{notif.sent}</td>
                <td className="py-2 px-2 sm:px-4 text-center text-sm text-indigo-600">{notif.by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notifications;