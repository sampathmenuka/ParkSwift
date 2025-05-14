import { Calendar, Clock, Search } from 'lucide-react'
import React, { useState } from 'react'
import DatePicker from "react-datepicker";

const ParkingSearch = () => {

  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('12:00');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for parking with:", { location, date, startTime, endTime });

  }

  return (
    <div className='w-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl mt-8 p-6'>
      <form onSubmit={handleSearch} className='grid md:grid-cols-12 md:gap-4'>
        <div className='mb-6 md:mb-0 md:col-span-5'>
          <label htmlFor="location" className='block text-sm font-medium text-gray-700 mb-1'>
            Where are you going?
          </label>
          <div className='relative flex items-center'>
            <input type="text" id='location' placeholder='Enter address, city, or landmark...' className='w-full py-2 pr-3 rounded-md border pl-10 placeholder-gray-400 text-gray-800 focus:outline-none ring-2 ring-indigo-400' value={location} required onChange={e => setLocation(e.target.value)} />
            <Search className='w-4 h-4 absolute text-gray-400 left-3' />
          </div>
        </div>

        <div className='mb-6 md:mb-0 md:col-span-3'>
          <label htmlFor='date' className='block text-sm font-medium text-gray-700 mb-1'>Date</label>

          <div className='relative flex items-center'>
            <input id='date' className='hide-icon w-full py-2 pr-3 pl-10 rounded-md border placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:bg-gray-50 transition-all' type="date" value={date} required onChange={e => setDate(e.target.value)} />

            <Calendar className='w-4 h-4 absolute text-gray-400 left-3'/>
          </div>
        </div>

        <div className='mb-6 md:mb-0 md:col-span-2'>
          <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="startTime">Start Time</label>
          <div className='relative flex items-center'>
            <input className='hide-icon w-full py-2 pr-3 pl-10 rounded-md border placeholder-gray-400 text-gray-800 focus:outline-none hover:bg-gray-50 transition-all focus:ring-2 focus:ring-indigo-400' type="time" id='startTime' required value={startTime} onChange={e => setStartTime(e.target.value)} />
            <Clock className='w-4 h-4 absolute text-gray-400 left-3'/>
          </div>
        </div>

        <div className='mb-6 md:mb-0 md:col-span-2'>
          <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="endTime">End Time</label>
          <div className='relative flex items-center'>
            <input className='hide-icon w-full py-2 pr-3 pl-10 rounded-md border placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 hover:bg-gray-50 transition-all focus:ring-indigo-400' type="time" id='endTime' required value={endTime} onChange={e => setEndTime(e.target.value)} />
            <Clock className='w-4 h-4 absolute text-gray-400 left-3' />
          </div>
        </div>

        <div className='mt-4 md:mt-0 md:col-span-12'>
          <button type='submit' className='w-full py-2 bg-gradient-to-r from-indigo-400 to-blue-700 text-white rounded-lg'>Find Parking</button>
        </div>
      </form>
      
    </div>
  )
}

export default ParkingSearch