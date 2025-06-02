import { Search } from 'lucide-react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import moment from 'moment'

const Bookings = () => {
  
  const {backendUrl} = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterSlotLocation, setFilterSlotLocation] = useState('');

  const getBookings = async () => {

    try {
      
      const {data} = await axios.get(backendUrl + '/api/admin/bookings')

      if (data.success) {
        setBookings(data.bookings)
      } else {
          toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
    }
  }

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
      booking.user?.name || "Unknown",
      booking.user?.email || "Unknown",
      booking.slot?.location || "Unknown Location",
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
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-5 sm:items-center">
        <h3 className="text-xl tracking-wide font-semibold text-indigo-600">
          View All Bookings
        </h3>
        <div className="flex gap-2 items-center">
          <div className="relative flex items-center">
            <input type="text"  placeholder="Search bookings..." className="w-3/4 sm:w-full pl-8 pr-4 py-1.5 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400" value={filterSlotLocation} onChange={(e) => setFilterSlotLocation(e.target.value)} />
            <Search className="absolute w-4 h-4 left-2 text-gray-500" />
          </div>
          <input type="date" className="w-1/2 sm:w-full px-2 py-1.5 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className="min-w-full border-collapse divide-y divide-gray-200">
          <thead className='bg-indigo-50'>
            <tr className="text-indigo-500">
              <th className="text-left min-w-[220px] p-2 text-sm font-semibold">Booking ID</th>
              <th className="text-left min-w-[240px] py-2 text-sm font-semibold">Customer</th>
              <th className="text-left min-w-[200px] py-2 text-sm font-semibold">Parking Slot</th>
              <th className="text-center min-w-[120px] py-2 text-sm font-semibold">Date</th>
              <th className="text-center min-w-[120px] py-2 text-sm font-semibold">Time</th>
              <th className="text-center min-w-[120px] py-2 text-sm font-semibold">Amount</th>
              <th className="text-center min-w-[120px] py-2 text-sm font-semibold">Payment</th>
              <th className="text-center min-w-[120px] py-2 text-sm font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200'>
            {
              filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No Bookings found.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking, index) => (
                <tr key={index}>
                  <td className="py-2 w-[220px] items-center text-sm text-gray-700">
                    #{booking._id}
                  </td>

                  <td className="py-2 text-sm w-[240px]">
                    <span className="text-gray-700 font-medium">
                      {booking.user.name}
                    </span>
                    <br />
                    <span className="text-gray-500 text-sm">
                      {booking.user.email}
                    </span>
                  </td>

                  <td className="py-2 text-sm w-[200px] text-gray-700">
                    {booking.slot?.location || "Unknown Location"}
                  </td>
                  <td className="py-2 text-sm w-[120px] text-gray-700 text-center">
                    {moment(new Date(booking.date)).format('MMM DD, YYYY')}
                  </td>

                  <td className="py-2 text-sm w-[120px] text-gray-700 text-center">
                    {booking.startTime} - {booking.endTime}
                  </td>

                  <td className="py-2 text-sm w-[120px] font-medium text-gray-700 text-center">
                    LKR. {booking.totalPayment.toFixed(2)}
                  </td>

                  <td className="py-2 text-sm w-[120px] text-center">
                    <span className={`px-2 py-1 rounded-full text-sm ${ booking.paymentIntentId ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600' }`} >
                      {booking.paymentIntentId ? "Paid" : "Pending"}
                    </span>
                  </td>

                  <td className="text-sm w-[120px] text-center">
                    <span className={`px-2 py-1 rounded-full text-sm ${ booking.status === 'Confirmed' ? 'bg-indigo-100 text-indigo-600' : booking.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600' }`} >
                      {booking.status}
                    </span>
                  </td>

                </tr>
              )))
            }
          </tbody>
        </table>

      </div>
      
      <div className="mt-4 text-right">
        <button onClick={exportToCSV} className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
          Export Booking Data
        </button>
      </div>
    </div>
  );
};

export default Bookings;