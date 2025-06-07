import React, { useState } from 'react';

const ParkingSlots = () => {
  const [slots, setSlots] = useState([
    { name: 'Downtown Garage Spot', address: '123 Main St, Downtown', type: 'covered', rate: '$5.00', status: 'active' },
    { name: 'Waterfront Parking', address: '456 Harbor Dr, Seaside', type: 'covered', rate: '$4.00', status: 'active' },
    { name: 'Mall Covered Spot', address: '789 Shopping Blvd, Retailville', type: 'covered', rate: '$6.25', status: 'pending' },
    { name: 'Stadium Parking', address: '101 Sports Ave, Fantown', type: 'uncovered', rate: '$7.00', status: 'inactive' },
  ]);

  const handleAction = (name, action) => {
    setSlots(
      slots.map((slot) =>
        slot.name === name
          ? { ...slot, status: action === 'deactivate' ? 'inactive' : action === 'activate' ? 'active' : 'approved' }
          : slot
      )
    );
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow mx-2 sm:mx-0">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h3 className="text-lg font-semibold text-gray-900">Manage Parking Slots</h3>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search slots..."
            className="w-full pl-8 pr-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            aria-label="Search parking slots"
          />
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">🔍</span>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead className="bg-gray-50">
            <tr className="border-b">
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Name
              </th>
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider hidden md:table-cell">
                Address
              </th>
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider hidden sm:table-cell">
                Type
              </th>
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider hidden md:table-cell">
                Hourly Rate
              </th>
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-3 px-2 sm:px-4 text-gray-700 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-2 sm:px-4 text-gray-900 whitespace-nowrap">{slot.name}</td>
                <td className="py-2 px-2 sm:px-4 text-gray-700 hidden md:table-cell whitespace-nowrap">{slot.address}</td>
                <td className="py-2 px-2 sm:px-4 text-gray-700 hidden sm:table-cell whitespace-nowrap">{slot.type}</td>
                <td className="py-2 px-2 sm:px-4 text-gray-700 hidden md:table-cell whitespace-nowrap">{slot.rate}</td>
                <td className="py-2 px-2 sm:px-4">
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
                <td className="py-2 px-2 sm:px-4">
                  {slot.status === 'active' ? (
                    <button
                      onClick={() => handleAction(slot.name, 'deactivate')}
                      className="px-2 py-1 sm:px-3 sm:py-1 rounded-lg bg-red-500 text-white text-xs sm:text-sm hover:bg-red-600 transition-colors"
                      aria-label={`Deactivate ${slot.name}`}
                    >
                      Deactivate
                    </button>
                  ) : slot.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleAction(slot.name, 'approve')}
                        className="px-2 py-1 sm:px-3 sm:py-1 rounded-lg bg-green-500 text-white mr-1 sm:mr-2 text-xs sm:text-sm hover:bg-green-600 transition-colors"
                        aria-label={`Approve ${slot.name}`}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(slot.name, 'reject')}
                        className="px-2 py-1 sm:px-3 sm:py-1 rounded-lg bg-red-500 text-white text-xs sm:text-sm hover:bg-red-600 transition-colors"
                        aria-label={`Reject ${slot.name}`}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleAction(slot.name, 'activate')}
                      className="px-2 py-1 sm:px-3 sm:py-1 rounded-lg bg-green-500 text-white text-xs sm:text-sm hover:bg-green-600 transition-colors"
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
      </div>

      {/* Export Button */}
      <div className="mt-4 flex justify-end">
        <button className="px-3 py-1.5 sm:px-4 sm:py-2 border rounded-lg text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          Export Slot Data
        </button>
      </div>
    </div>
  );
};

export default ParkingSlots;