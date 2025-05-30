import React, { useState } from 'react';

const ParkingSlots = () => {
  const [slots, setSlots] = useState([
    { name: 'Downtown Garage Spot', address: '123 Main St, Downtown', type: 'covered', rate: '$5.00', status: 'active' },
    { name: 'Waterfront Parking', address: '456 Harbor Dr, Seaside', type: 'covered', rate: '$4.00', status: 'active' },
    { name: 'Mall Covered Spot', address: '789 Shopping Blvd, Retailville', type: 'covered', rate: '$6.25', status: 'pending' },
    { name: 'Stadium Parking', address: '101 Sports Ave, Fantown', type: 'uncovered', rate: '$7.00', status: 'inactive' },
  ]);

  const handleAction = (name, action) => {
    setSlots(slots.map(slot =>
      slot.name === name ? { ...slot, status: action === 'deactivate' ? 'inactive' : action === 'activate' ? 'active' : 'approved' } : slot
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Manage Parking Slots</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search slots..."
            className="pl-8 pr-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Search parking slots"
          />
          <span className="absolute left-2 top-2 text-gray-400">🔍</span>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 text-gray-700">Name</th>
            <th className="text-left py-2 text-gray-700">Address</th>
            <th className="text-left py-2 text-gray-700">Type</th>
            <th className="text-left py-2 text-gray-700">Hourly Rate</th>
            <th className="text-left py-2 text-gray-700">Status</th>
            <th className="text-left py-2 text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 text-gray-900">{slot.name}</td>
              <td className="py-2 text-gray-700">{slot.address}</td>
              <td className="py-2 text-gray-700">{slot.type}</td>
              <td className="py-2 text-gray-700">{slot.rate}</td>
              <td className="py-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    slot.status === 'active'
                      ? 'bg-blue-100 text-blue-600'
                      : slot.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {slot.status}
                </span>
              </td>
              <td className="py-2">
                {slot.status === 'active' ? (
                  <button
                    onClick={() => handleAction(slot.name, 'deactivate')}
                    className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
                    aria-label={`Deactivate ${slot.name}`}
                  >
                    Deactivate
                  </button>
                ) : slot.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleAction(slot.name, 'approve')}
                      className="px-3 py-1 rounded-lg bg-green-500 text-white mr-2 hover:bg-green-600"
                      aria-label={`Approve ${slot.name}`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(slot.name, 'reject')}
                      className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
                      aria-label={`Reject ${slot.name}`}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleAction(slot.name, 'activate')}
                    className="px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600"
                    aria-label={`Activate ${slot.name}`}
                  >
                    Activate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        <button className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
          Export Slot Data
        </button>
      </div>
    </div>
  );
};

export default ParkingSlots;