import React, { useState } from 'react';

const Bookings = () => {
  const [bookings, setBookings] = useState([
    { id: '#1', customer: 'Alex Johnson', email: 'alex@example.com', slot: 'Downtown Garage Spot', date: '2023-11-15', time: '10:00 - 12:00', amount: '$11.00', payment: 'paid', status: 'confirmed' },
    { id: '#2', customer: 'Maria Garcia', email: 'maria@example.com', slot: 'Waterfront Parking', date: '2023-11-16', time: '14:00 - 16:00', amount: '$8.00', payment: 'paid', status: 'completed' },
    { id: '#3', customer: 'David Wilson', email: 'david@example.com', slot: 'Downtown Garage Spot', date: '2023-11-18', time: '09:00 - 13:00', amount: '$22.00', payment: 'pending', status: 'confirmed' },
    { id: '#4', customer: 'Sarah Miller', email: 'sarah@example.com', slot: 'Mall Covered Spot', date: '2023-11-20', time: '11:00 - 14:00', amount: '$17.50', payment: 'failed', status: 'cancelled' },
  ]);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow mx-2 sm:mx-0">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h3 className="text-lg font-semibold text-gray-900">View All Bookings</h3>
        <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto mb-2 sm:mb-0">
            <input
              type="text"
              placeholder="Search bookings..."
              className="w-full pl-8 pr-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
              aria-label="Search bookings"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          </div>
          <input
            type="date"
            className="w-full pl-2 pr-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
            aria-label="Filter by date"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Booking ID
              </th>
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Customer
              </th>
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider hidden md:table-cell">
                Parking Slot
              </th>
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider hidden sm:table-cell">
                Date
              </th>
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider hidden md:table-cell">
                Time
              </th>
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider hidden lg:table-cell">
                Amount
              </th>
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider hidden sm:table-cell">
                Payment
              </th>
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 sm:px-4 text-gray-900 whitespace-nowrap">{booking.id}</td>
                <td className="py-3 px-2 sm:px-4">
                  <span className="text-gray-700">{booking.customer}</span>
                  <br />
                  <span className="text-gray-500 text-sm whitespace-nowrap">{booking.email}</span>
                </td>
                <td className="py-3 px-2 sm:px-4 text-gray-700 hidden md:table-cell whitespace-nowrap">{booking.slot}</td>
                <td className="py-3 px-2 sm:px-4 text-gray-700 hidden sm:table-cell whitespace-nowrap">{booking.date}</td>
                <td className="py-3 px-2 sm:px-4 text-gray-700 hidden md:table-cell whitespace-nowrap">{booking.time}</td>
                <td className="py-3 px-2 sm:px-4 text-gray-700 hidden lg:table-cell whitespace-nowrap">{booking.amount}</td>
                <td className="py-3 px-2 sm:px-4 text-gray-700 hidden sm:table-cell">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      booking.payment === 'paid'
                        ? 'bg-green-100 text-green-600'
                        : booking.payment === 'pending'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {booking.payment}
                  </span>
                </td>
                <td className="py-3 px-2 sm:px-4 text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      booking.status === 'confirmed'
                        ? 'bg-blue-100 text-blue-600'
                        : booking.status === 'completed'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Button */}
      <div className="mt-4 flex justify-end">
        <button className="px-3 py-1.5 sm:px-4 sm:py-2 border rounded-lg text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          Export Booking Data
        </button>
      </div>
    </div>
  );
};

export default Bookings;