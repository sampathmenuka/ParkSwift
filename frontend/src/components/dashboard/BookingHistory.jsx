import React, { useContext, useState, useEffect } from 'react'
import {AuthContext} from '../../contexts/AuthContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Calendar, Clock } from "lucide-react";
import moment from 'moment'

const BookingHistory = () => {

  const { backendUrl } = useContext(AuthContext)
  const [history, setHistory] = useState([])

  const getHistory = async () => {

    try {

      const { data } = await axios.get(backendUrl + '/api/bookings/booking-history');

      if (data.success) {
        setHistory(data.bookings)
      } else{
        toast.error(data.message)
      }
      
    } catch (error) {
        toast.error(error.message)
    }
  }

  useEffect(() => {
    getHistory()
  }, [history])

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4 text-gray-700'>
        Bookings History
      </h2>

      {
        history.length < 0 
        ? (
          <div className='text-center py-12'>
            <p className='text-gray-600 mb-3 font-light text-lg'>
              You have no history.
            </p>
            <NavLink to='/search'>
              <button className='py-1.5 px-4 bg-indigo-400 rounded-md text-white hover:bg-indigo-500 transition-all duration-300'>Find Parkings</button>
            </NavLink>
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
                          {item.slot.location || 'Unknown Slot'}
                        </h3>
                        <p className={`py-1 px-3 rounded-full bg-indigo-400 text-white text-sm ${item.status === "Completed" ? "bg-green-600" : "bg-red-600"} `}>
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

                    <div className='flex gap-2 items-center text-gray-700 font-semibold'>
                      <p>Amount: </p>
                      <p className='text-green-600'>LKR. {item.totalPayment.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2 md:grid-cols-2">
                    <button className="border hover:bg-indigo-50 duration-300 transition-all py-2 rounded w-full">
                      View Reciept
                    </button>
                    <button className="border py-2 rounded w-full hover:bg-indigo-50 duration-300 transition-all">
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

export default BookingHistory