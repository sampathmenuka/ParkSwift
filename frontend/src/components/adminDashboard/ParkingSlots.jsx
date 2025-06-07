import { Search } from 'lucide-react';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const ParkingSlots = () => {
  const { backendUrl } = useContext(AuthContext);

  const [slots, setSlots] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getSlots = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/');
      if (data) {
        setSlots(data.slots);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAction = async (slotId, action) => {
    try {
      const { data } = await axios.patch(backendUrl + `/api/admin/${slotId}/status`, {
        available: action === 'deactivate' ? false : true,
      });
      if (data.success) {
        toast.success(data.message);
        getSlots();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (slotId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this slot?');
    if (!confirmDelete) {
      return;
    }
    try {
      const { data } = await axios.delete(backendUrl + `/api/admin/${slotId}`);
      if (data.success) {
        toast.success(data.message);
        getSlots();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredSlots = slots.filter((slot) =>
    slot.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slot.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export slot data to CSV
  const exportToCSV = () => {
    if (!Array.isArray(filteredSlots) || filteredSlots.length === 0) {
      alert('No slot data to export.');
      return;
    }

    const headers = ['Name', 'Address', 'Type', 'Hourly Rate', 'Status'];

    const rows = filteredSlots.map((slot) => [
      slot.location,
      slot.address,
      slot.slotType,
      slot.pricePerHour,
      slot.available ? 'Active' : 'Inactive',
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'slots.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    getSlots();
  }, []);

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search parking slots"
          />
          <Search className="absolute w-4 h-4 left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
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
            {filteredSlots.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No Slot found.
                </td>
              </tr>
            ) : (
              filteredSlots.map((slot, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2 sm:px-4 text-gray-900 whitespace-nowrap">
                    {slot.location}
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-gray-700 hidden md:table-cell whitespace-nowrap">
                    {slot.address}
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-gray-700 hidden sm:table-cell whitespace-nowrap">
                    {slot.slotType}
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-gray-700 hidden md:table-cell whitespace-nowrap">
                    LKR. {slot.pricePerHour}
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        slot.available ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {slot.available ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-center">
                    {slot.available ? (
                      <button
                        onClick={() => handleAction(slot._id, 'deactivate')}
                        className="px-2 py-1 sm:px-3 sm:py-1 rounded-lg bg-pink-500 text-white text-xs sm:text-sm hover:bg-pink-600 transition-colors"
                        aria-label={`Deactivate ${slot.location}`}
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAction(slot._id, 'activate')}
                        className="px-2 py-1 sm:px-3 sm:py-1 rounded-lg bg-green-500 text-white text-xs sm:text-sm hover:bg-green-600 transition-colors"
                        aria-label={`Activate ${slot.location}`}
                      >
                        Activate
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(slot._id)}
                      className="px-2 py-1 sm:px-3 sm:py-1 ml-1 sm:ml-2 rounded-lg bg-red-500 text-white text-xs sm:text-sm hover:bg-red-600 transition-colors"
                      aria-label={`Delete ${slot.location}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Export Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={exportToCSV}
          className="px-3 py-1.5 sm:px-4 sm:py-2 border rounded-lg text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Export Slot Data
        </button>
      </div>
    </div>
  );
};

export default ParkingSlots;