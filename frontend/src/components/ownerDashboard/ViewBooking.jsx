import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import moment from 'moment';


const statusOptions = ['All', 'Confirmed', 'Completed', 'Cancelled'];

const dateOptions = [
  { label: 'Last 7 Days', value: '7' },
  { label: 'Last 30 Days', value: '30' },
  { label: 'Last 90 Days', value: '90' },
  { label: 'All Time', value: 'all' }
];


const ViewBooking = () => {

  const {backendUrl} = useContext(AuthContext)

  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [locations, setLocations] = useState([]);
  const [status, setStatus] = useState('All');
  const [dateRange, setDateRange] = useState('all');
  const [search, setSearch] = useState('');

  const [selectedLocation, setSelectedLocation] = useState('All');

  const [loading, setLoading] = useState(false);

  const getBookings = async () => {

    setLoading(true);

    try {

      const {data} = await axios.get(backendUrl + '/api/owner/bookings');

      if (data.success) {
        const fetched = data.bookings || [];
        setBookings(fetched);

        const locationNames = [...new Set(fetched.map(b => b.slot.location))]

        setLocations(['All', ...locationNames]);

      } else {
          toast.error(data.message)
      }

      setLoading(false)
      
    } catch (error) {
        toast.error(error.message)
    }
  }

  useEffect(() => {
    getBookings();
  }, []);

  useEffect(() => {

    const now = Date.now()
    const msInDay = 86400000;
    
    let filteredData = [...bookings]

    if (status !== "All") {
      filteredData = filteredData.filter(b => b.status === status)
    }

    if (selectedLocation !== 'All') {
      filteredData = filteredData.filter(b => b.slot.location === selectedLocation)
    }

    if (dateRange !== 'all') {
      const days = parseInt(dateRange, 10);
      filteredData = filteredData.filter(b => {
        const bookingDate = new Date(b.date).getTime();
        return now - bookingDate <= days * msInDay
      })
    }

    if (search.trim() !== '') {
      const keyword = search.toLowerCase();
      filteredData = filteredData.filter(b => 
        b.user.name.toLowerCase().includes(keyword) || 
        b.user.email.toLowerCase().includes(keyword)
      )
    }

    setFiltered(filteredData)

  }, [bookings, selectedLocation, status, dateRange, search])


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
        <span className="ml-2 text-gray-600">Loading bookings...</span>
      </div>
    );
  }


  return (
    <div>
      <div className='p-5 border shadow-md rounded-md mb-8 bg-indigo-50'>
        <h2 className='text-lg md:text-2xl font-semibold text-gray-600 mb-8'>
          Booking Management
        </h2>

        {/* filtering options  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className='font-medium text-base text-indigo-500'>Slot</label>
            <select className='py-2 px-3 border border-gray-400 focus:border-none rounded-md bg-white w-full mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400' value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className='font-medium text-base text-indigo-500'>Status</label>
            <select className='py-2 border border-gray-400 focus:border-none px-3 rounded-md bg-white w-full mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400' value={status} onChange={e => setStatus(e.target.value)} >
              {statusOptions.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className='font-medium text-base text-indigo-500'>Date Range</label>
            <select className='py-2 px-3 border border-gray-400 focus:border-none rounded-md bg-white w-full mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400' value={dateRange} onChange={e => setDateRange(e.target.value)} >
              {dateOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='mt-4'>
          <input type='text' className='py-2 px-3 border border-gray-300 focus:border-none rounded-md bg-white w-full mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' value={search} onChange={e => setSearch(e.target.value)} placeholder='Search by customer name or email' />
        </div>
      </div> 


      {/* data in table format */}
      <div className="overflow-auto p-4 rounded-md shadow-sm border">
        <table className="min-w-full border divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className='text-indigo-500'>
              <th className="text-left px-4 py-2 text-sm font-semibold">Customer</th>
              <th className="text-left px-4 py-2 text-sm font-semibold">Slot</th>
              <th className="text-left px-4 py-2 text-sm font-semibold">Date</th>
              <th className="text-left px-4 py-2 text-sm font-semibold">Time</th>
              <th className="text-left px-4 py-2 text-sm font-semibold">Amount</th>
              <th className="text-left px-4 py-2 text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            ) : (
              filtered.map(b => (
                <tr key={b._id} className='text-gray-600 text-sm'>
                  <td className="px-4 py-2">
                    <div className="font-medium text-gray-700">{(b.user.name).charAt(0).toUpperCase() + (b.user.name).slice(1).toLowerCase() }</div>
                    <div className="text-sm text-gray-500">{b.user.email}</div>
                  </td>
                  <td className="px-4 py-2">{b.slot.location}</td>
                  <td className="px-4 py-2">{moment(new Date(b.date).toLocaleDateString()).format('MMM DD, YYYY')}</td>
                  <td className="px-4 py-2">{b.startTime} - {b.endTime}</td>
                  <td className="px-4 py-2">LKR. {b.totalPayment.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${b.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : b.status === 'Completed' ? 'bg-green-100 text-green-800' : b.status === 'In-progress' ? 'bg-green-300 text-green-800' : 'bg-red-100 text-red-800' } `}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewBooking
