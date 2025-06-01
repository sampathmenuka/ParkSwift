import { useContext, useEffect, useState } from 'react'
import {AuthContext} from '../../contexts/AuthContext'
import { toast } from 'react-toastify';
import axios from 'axios'
import {NavLink, useNavigate} from 'react-router-dom'
import { Calendar, Clock } from "lucide-react";
import moment from 'moment'

const ActiveBooking = () => {

  const { backendUrl } = useContext(AuthContext);
  const [ bookings, setBookings ] = useState([]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const getBooking = async () => {

    setLoading(true)

    try {

      const {data} = await axios.get(backendUrl + "/api/bookings/active-booking");

      if (data.success) {
        setBookings(data.bookings);
      } else{
        toast.error(data.message)
      }
      
      setLoading(false);
    } catch (error) {
        toast.error(error.message);
    }
  }

  const cancelBooking = async (id) => {

    try {

      const {data} = await axios.put(backendUrl + `/api/bookings/cancel/${id}`)

      if (data.success) {
        toast.success(data.message);
        setBookings(bookings.filter(b => b._id !== id));
      } else(
        toast.error(data.message)
      )
      
    } catch (error) {
        toast.error(error.message);
    }
  }

  const markAsParked = async (id) => {

    try {
      const { data } = await axios.put(backendUrl + `/api/bookings/mark-parked/${id}`);

      if (data.success) {
        toast.success(data.message);
        setBookings(bookings.filter(b => b._id !== id));
        navigate(`/reviews/${data.slotId}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getBooking();
  }, [backendUrl])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-blue-500 font-medium">Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4 text-gray-700'>
        Active Bookings
      </h2>

      {
        bookings.length === 0 
        ? (
          <div className='text-center py-12'>
            <p className='text-gray-600 mb-3 font-light text-lg'>
              You have no active bookings.
            </p>
            <NavLink to='/search'>
              <button className='py-1.5 px-4 bg-indigo-400 rounded-md text-white hover:bg-indigo-500 transition-all duration-300'>
                Find Parkings
              </button>
            </NavLink>
          </div>
        ) : (
          <div>
            {
              bookings.map((booking) => {
                
                const startMoment = moment(`${booking.date} ${booking.startTime}`, 'YYYY-MM-DD HH:mm');
                const now = moment();
                const isCancelable = startMoment.diff(now, 'minutes') > 30;
                const endMoment = moment(`${booking.date} ${booking.endTime}`, 'YYYY-MM-DD HH:mm');
                const isExpired = endMoment.isBefore(now);

                // Booking can be marked as parked if today and current time is within time range
                const isToday = now.isSame(booking.date, 'day');
                const isWithinTimeRange = now.isBetween(startMoment, endMoment);
                const canMarkAsParked = isToday && isWithinTimeRange;
      
                return (
                  <div key={booking._id} className='p-4 border rounded shadow mb-4'>
                    <div>
                      <div className='mb-4'>
                        <div className='w-full flex items-center justify-between'>
                          <h3 className='text-md md:text-xl tracking-wider font-semibold text-indigo-500'>
                            {booking.slot.location || 'Unknown Slot'}
                          </h3>
                          <p className={`py-1 px-3 rounded-full text-xs text-white md:text-sm ${booking.status === "Confirmed" ? "bg-indigo-600" : "bg-gray-700"}`}>
                            {booking.status}
                          </p>
                        </div>

                        <p className='text-sm font-light md:text-base text-gray-500'>Booking #{booking._id}</p>
                      </div>

                      <div className='flex gap-2 items-center mb-0.5'>
                        <Calendar className='w-4 h-4 text-indigo-500'/>
                        <p className='text-gray-600 font-medium'>
                          {moment(booking.date).format("MMM D, YYYY")}
                        </p> 
                      </div>

                      <div className='flex gap-2 items-center mb-3'>
                        <Clock className='w-4 h-4 text-indigo-500' />
                        <p className='text-gray-600 font-medium'>{booking.startTime} - {booking.endTime}</p>
                      </div>

                      <div className='flex gap-2 items-center text-gray-700 font-semibold mb-4'>
                        <p>Amount: </p>
                        <p className='text-green-600'>LKR. {booking.totalPayment.toFixed(2)}</p>
                      </div>
                    </div>

                    <hr className='border border-indigo-100 mb-2' />

                    {
                      isExpired ? (
                        <p className="text-sm text-red-500 font-medium mt-2">
                          This booking has ended.
                        </p>
                      ) : (
                        <div className="mt-4 grid gap-2 md:grid-cols-3">
                          <button className="border hover:bg-indigo-50 duration-300 transition-all py-2 rounded w-full">
                            View Details
                          </button>

                          {
                            canMarkAsParked && (
                              <button onClick={() => {markAsParked(booking._id); scrollTo(0, 0)}} className="py-2 text-white rounded w-full bg-green-500 hover:bg-green-600 duration-300 transition-all">
                                Parked
                              </button>
                            ) 
                          }

                          {
                            isCancelable && (
                              <button onClick={() => cancelBooking(booking._id)} className="bg-red-500 text-white py-2 rounded w-full hover:bg-red-600 duration-300 transition-all" >
                                Cancel Booking
                              </button>
                            )
                          }
                        </div>
                      )
                    }            
                  </div>
                )})
            }
          </div>
        )
      }    
    </div>
  )
}

export default ActiveBooking;