import React, { useContext, useState } from 'react'
import { Calendar, Clock, Search } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const ParkingSearch = () => {

  const {backendUrl} = useContext(AuthContext);

  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    location: '',
    startTime: '',
    endTime: '',
    date: ''
  });
  
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, val]) => {
        if (
          val !== "" &&
          val !== false &&
          val !== null &&
          val !== undefined
        ) {
          params.append(key, val);
        }
      });

      const {data} = await axios.get(backendUrl + `/api/slots/?${params.toString()}`);

      if (data.success) {
        navigate(`/search?${params.toString()}`);
        scrollTo(0, 0);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
        console.log(error)
        toast.error(error.message);
    }
  }

  return (
    <div className='w-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl mt-8 p-6'>
      <form onSubmit={handleSearch} className='grid md:grid-cols-12 md:gap-4'>
        <div className='mb-6 md:mb-0 md:col-span-5'>
          <label htmlFor="location" className='block text-sm font-medium text-gray-700 mb-1'>
            Where are you going?
          </label>
          <div className='relative flex items-center'>
            <input type="text" id='location' name='location' placeholder='Enter address, city, or landmark...' className='w-full py-2 pr-3 rounded-md border pl-10 placeholder-gray-400 text-gray-800 focus:outline-none ring-2 ring-indigo-400' value={filters.location} required onChange={handleChange} />

            <Search className='w-4 h-4 absolute text-gray-400 left-3' />
          </div>
        </div>

        <div className='mb-6 md:mb-0 md:col-span-3'>
          <label htmlFor='date' className='block text-sm font-medium text-gray-700 mb-1'>
            Date
          </label>

          <div className='relative flex items-center'>
            <input id='date' name='date' className='hide-icon w-full py-2 pr-3 pl-10 rounded-md border placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:bg-gray-50 transition-all' type="date" value={filters.date} onChange={handleChange} />

            <Calendar className='w-4 h-4 absolute text-gray-400 left-3'/>
          </div>
        </div>

        <div className='mb-6 md:mb-0 md:col-span-2'>
          <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="startTime">
            Start Time
          </label>
          <div className='relative flex items-center'>
            <input className='hide-icon w-full py-2 pr-3 pl-10 rounded-md border placeholder-gray-400 text-gray-800 focus:outline-none hover:bg-gray-50 transition-all focus:ring-2 focus:ring-indigo-400' type="time" id='startTime' name='startTime' value={filters.startTime} onChange={handleChange} />

            <Clock className='w-4 h-4 absolute text-gray-400 left-3'/>
          </div>
        </div>

        <div className='mb-6 md:mb-0 md:col-span-2'>
          <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="endTime">
            End Time
          </label>

          <div className='relative flex items-center'>
            <input className='hide-icon w-full py-2 pr-3 pl-10 rounded-md border placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 hover:bg-gray-50 transition-all focus:ring-indigo-400' type="time" id='endTime' name='endTime' value={filters.endTime} onChange={handleChange} />

            <Clock className='w-4 h-4 absolute text-gray-400 left-3' />
          </div>
        </div>

        <div className='mt-4 md:mt-0 md:col-span-12'>
          <button type='submit' className='w-full py-2 bg-gradient-to-r from-indigo-400 to-blue-700 text-white rounded-lg'>
            Find Parking
          </button>
        </div>
      </form>
      
    </div>
  )
}

export default ParkingSearch