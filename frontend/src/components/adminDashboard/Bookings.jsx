import { Search } from 'lucide-react';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';

const Bookings = () => {
  const { backendUrl } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterSlotLocation, setFilterSlotLocation] = useState('');

  const getBookings = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/bookings');
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const slotLocation = booking.slot?.location?.toLowerCase() || '';
    const matchesSlot = filterSlotLocation.trim() !== '' ? slotLocation.includes(filterSlotLocation.toLowerCase()) : true;
    const matchesDate = filterDate ? booking.date === filterDate : true;
    return matchesDate && matchesSlot;
  });

  const exportToCSV = () => {
    const headers = ['Booking ID', 'Customer', 'Email', 'Parking Slot', 'Date', 'Time', 'Amount', 'Payment', 'Status'];
    const rows = filteredBookings.map((booking) => [
      booking._id,
      booking.user?.name || 'Unknown',
      booking.user?.email || 'Unknown',
      booking.slot?.location || 'Unknown Location',
      moment(new Date(booking.date).toLocaleDateString()).format('MMM DD, YYYY'),
      `${booking.startTime} - ${booking.endTime}`,
      `LKR. ${booking.totalPayment.toFixed(2)}`,
      booking.paymentIntentId ? 'Paid' : 'Pending',
      booking.status,
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'bookings.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mb-4">
        <h3 className="text-lg sm:text-xl tracking-wide font-semibold text-gray-900 sm:text-indigo-600">
          View All Bookings
        </h3>
        <div className="flex gap-2 items-center w-full sm:w-auto">
          <div className="relative flex items-center w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search bookings..."
              className="w-full pl-8 pr-4 py-2 sm:py-1.5 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              value={filterSlotLocation}
              onChange={(e) => setFilterSlotLocation(e.target.value)}
              aria-label="Search bookings"
            />
            <Search className="absolute w-4 h-4 left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <input
            type="date"
            className="w-full sm:w-auto pl-2 pr-4 py-2 sm:py-1.5 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            aria-label="Filter by date"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse divide-y divide-gray-200">
          <thead className="bg-indigo-50">
            <tr className="border-b text-indigo-500">
              <th className="text-left py-2 px-2 sm:px-4 text-sm font-semibold min-w-[220px]">
                Booking ID
              </th>
              <th className="text-left py-2 px-2 sm:px-4 text-sm font-semibold min-w-[240px]">
                Customer
              </th>
              <th className="text-left py-2 px-2 sm:px-4 text-sm font-semibold min-w-[200px] hidden md:table-cell">
                Parking Slot
              </th>
              <th className="text-center py-2 px-2 sm:px-4 text-sm font-semibold min-w-[120px] hidden sm:table-cell">
                Date
              </th>
              <th className="text-center py-2 px-2 sm:px-4 text-sm font-semibold min-w-[120px] hidden md:table-cell">
                Time
              </th>
              <th className="text-center py-2 px-2 sm:px-4 text-sm font-semibold min-w-[120px] hidden lg:table-cell">
                Amount
              </th>
              <th className="text-center py-2 px-2 sm:px-4 text-sm font-semibold min-w-[120px] hidden sm:table-cell">
                Payment
              </th>
              <th className="text-center py-2 px-2 sm:px-4 text-sm font-semibold min-w-[120px]">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No Bookings found.
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2 sm:px-4 text-sm text-gray-700 whitespace-nowrap">
                    #{booking._id}
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-sm">
                    <span className="text-gray-700 font-medium">{booking.user?.name || 'Unknown'}</span>
                    <br />
                    <span className="text-gray-500 text-sm">{booking.user?.email || 'Unknown'}</span>
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-sm text-gray-700 hidden md:table-cell whitespace-nowrap">
                    {booking.slot?.location || 'Unknown Location'}
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-sm text-gray-700 hidden sm:table-cell text-center whitespace-nowrap">
                    {moment(new Date(booking.date)).format('MMM DD, YYYY')}
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-sm text-gray-700 hidden md:table-cell text-center whitespace-nowrap">
                    {booking.startTime} - {booking.endTime}
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-sm font-medium text-gray-700 hidden lg:table-cell text-center whitespace-nowrap">
                    LKR. {booking.totalPayment.toFixed(2)}
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-sm text-gray-700 hidden sm:table-cell text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        booking.paymentIntentId ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {booking.paymentIntentId ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-sm text-gray-700 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        booking.status === 'Confirmed'
                          ? 'bg-indigo-100 text-indigo-600'
                          : booking.status === 'Completed'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Export Button */}
      <div className="mt-4 text-right">
        <button
          onClick={exportToCSV}
          className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Export Booking Data
        </button>
      </div>
    </div>
  );
};

export default Bookings;