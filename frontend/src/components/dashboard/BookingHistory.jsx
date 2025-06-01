import React, { useContext, useState, useEffect } from 'react'
import {AuthContext} from '../../contexts/AuthContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Calendar, Clock } from "lucide-react";
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

const BookingHistory = () => {

  const { backendUrl } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // get history
  const getHistory = async () => {

    setLoading(true);

    try {

      const { data } = await axios.get(backendUrl + '/api/bookings/booking-history');

      if (data.success) {
        setHistory(data.bookings)
      } else{
        toast.error(data.message)
      }

    setLoading(false)
      
    } catch (error) {
        toast.error(error.message)
    }
  }

  // clear all history 
  const clearHistory = async () => {

    const confirmClear = window.confirm("Are you sure you want to clear all the slots?")

    if (!confirmClear) {
      return
    }
    try {

      const { data } = await axios.delete(backendUrl + '/api/bookings/clear-history');

      if (data.success) {
        toast.success(data.message);
        setHistory([]); // Clear local state
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    getHistory()
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
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-semibold text-gray-700'>
          Bookings History
        </h2>

        {
          history.length > 0 && <button onClick={clearHistory} className='text-sm sm:text-base py-1.5 px-3 bg-red-200 rounded-md text-red-700 hover:bg-red-100 transition-all duration-300'>
            Clear All
          </button>
        }
      </div>

      {
        history.length === 0 
        ? (
          <div className='text-center py-12'>
            <p className='text-gray-600 mb-3 font-light text-lg'>
              You have no history.
            </p>
          </div>
        ) : (
          <div>
            {
              history.map((item) => (
                <div key={item._id} className='p-4 border rounded shadow mb-4'>
                  <div>
                    <div className='mb-4'>
                      <div className='w-full flex items-center justify-between'>
                        <h3 className='text-md md:text-xl font-semibold text-indigo-500'>
                          {item.slot?.location || 'Unknown Slot'}
                        </h3>
                        <p className={`py-1 px-3 rounded-full text-white text-sm ${item.status === "Completed" ? "bg-green-600" : "bg-red-600"} `}>
                          {item.status}
                        </p>
                      </div>

                      <p className='text-sm font-light md:text-base text-gray-500'>Booking #{item._id}</p>
                    </div>

                    <div className='flex gap-2 items-center mb-0.5'>
                      <Calendar className='w-4 h-4 text-indigo-500'/>
                      <p className='text-gray-600 font-medium'>
                        {moment(item.date).format("MMM D, YYYY")}
                      </p> 
                    </div>

                    <div className='flex gap-2 items-center mb-3'>
                      <Clock className='w-4 h-4 text-indigo-500' />
                      <p className='text-gray-600 font-medium'>{item.startTime} - {item.endTime}</p>
                    </div>

                    <div className='flex gap-2 items-center text-gray-700 font-semibold mb-4'>
                      <p>Amount: </p>
                      <p className='text-green-600'>LKR. {item.totalPayment.toFixed(2)}</p>
                    </div>
                  </div>

                  <hr className='border border-indigo-100 mb-2' />

                  <div className="mt-4 grid gap-2 md:grid-cols-2">
                    <div className='w-full'></div>
                    <button onClick={() => {navigate('/search'); scrollTo(0, 0)}} className="border py-2 rounded w-full bg-indigo-50 hover:bg-indigo-100 duration-300 transition-all">
                      Book Again
                    </button>
        
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>    
  )
}

export default BookingHistory;