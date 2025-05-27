import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Bookings from '../components/adminDashboard/Bookings';
import Notifications from '../components/adminDashboard/Notifications';
import ParkingSlots from '../components/adminDashboard/ParkingSlots';
import SystemLogs from '../components/adminDashboard/SystemLogs';
import Users from '../components/adminDashboard/Users';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Users');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Users':
        return <Users />;
      case 'Parking Slots':
        return <ParkingSlots />;
      case 'Bookings':
        return <Bookings />;
      case 'System Logs':
        return <SystemLogs />;
      case 'Notifications':
        return <Notifications />;
      default:
        return <Users />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Panel</h2>
          <div className="flex space-x-4 mb-6">
            {['Users', 'Parking Slots', 'Bookings', 'System Logs', 'Notifications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {renderTabContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;