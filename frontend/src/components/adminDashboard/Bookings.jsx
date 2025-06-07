import React, { useState } from 'react';

const Bookings = () => {
  const [bookings, setBookings] = useState([
    { id: '#1', customer: 'Alex Johnson', email: 'alex@example.com', slot: 'Downtown Garage Spot', date: '2023-11-15', time: '10:00 - 12:00', amount: '$11.00', payment: 'paid', status: 'confirmed' },
    { id: '#2', customer: 'Maria Garcia', email: 'maria@example.com', slot: 'Waterfront Parking', date: '2023-11-16', time: '14:00 - 16:00', amount: '$8.00', payment: 'paid', status: 'completed' },
    { id: '#3', customer: 'David Wilson', email: 'david@example.com', slot: 'Downtown Garage Spot', date: '2023-11-18', time: '09:00 - 13:00', amount: '$22.00', payment: 'pending', status: 'confirmed' },
    { id: '#4', customer: 'Sarah Miller', email: 'sarah@example.com', slot: 'Mall Covered Spot', date: '2023-11-20', time: '11:00 - 14:00', amount: '$17.50', payment: 'failed', status: 'cancelled' },
  ]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">View All Bookings</h3>
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search bookings..."
              className="pl-8 pr-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Search bookings"
            />
            <span className="absolute left-2 top-2 text-gray-400">🔍</span>
          </div>
          <input
            type="date"
            className="pl-2 pr-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Filter by date"
          />
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 text-gray-700">Booking ID</th>
            <th className="text-left py-2 text-gray-700">Customer</th>
            <th className="text-left py-2 text-gray-700">Parking Slot</th>
            <th className="text-left py-2 text-gray-700">Date</th>
            <th className="text-left py-2 text-gray-700">Time</th>
            <th className="text-left py-2 text-gray-700">Amount</th>
            <th className="text-left py-2 text-gray-700">Payment</th>
            <th className="text-left py-2 text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 text-gray-900">{booking.id}</td>
              <td className="py-2">
                <span className="text-gray-700">{booking.customer}</span>
                <br />
                <span className="text-gray-500 text-sm">{booking.email}</span>
              </td>
              <td className="py-2 text-gray-700">{booking.slot}</td>
              <td className="py-2 text-gray-700">{booking.date}</td>
              <td className="py-2 text-gray-700">{booking.time}</td>
              <td className="py-2 text-gray-700">{booking.amount}</td>
              <td className="py-2">
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
              <td className="py-2">
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
      <div className="mt-4 text-right">
        <button className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
          Export Booking Data
        </button>
      </div>
    </div>
  );
};

export default Bookings;