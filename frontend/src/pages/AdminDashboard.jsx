import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Bookings from '../components/adminDashboard/Bookings';
import Notifications from '../components/adminDashboard/Notifications';
import ParkingSlots from '../components/adminDashboard/ParkingSlots';
import SystemLogs from '../components/adminDashboard/SystemLogs';
import Users from '../components/adminDashboard/Users';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Users');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false); // Close mobile menu upon selection
  };

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

  const tabs = ['Users', 'Parking Slots', 'Bookings', 'System Logs', 'Notifications'];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Panel</h2>

          {/* Mobile Dropdown Menu - Hidden on medium screens and up */}
          <div className="md:hidden relative mb-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg shadow flex justify-between items-center font-semibold"
            >
              <span>{activeTab}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  isMobileMenuOpen ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {isMobileMenuOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg py-1">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      activeTab === tab
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Tab Navigation - Hidden on small screens */}
          <div className="hidden md:flex border-b border-gray-200 mb-6">
             <div className="flex space-x-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`px-4 py-3 -mb-px border-b-2 font-semibold whitespace-nowrap focus:outline-none ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
            </div>
          </div>

          {renderTabContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;