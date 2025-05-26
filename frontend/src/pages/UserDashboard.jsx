import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { AuthContext } from '../contexts/AuthContext'
import Footer from '../components/Footer'

const UserDashboard = () => {

  const {user} = useContext(AuthContext);

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />

      <div className='pt-24 pb-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome, <span className='text-indigo-500'>{(user.name).charAt(0).toUpperCase() + (user.name).slice(1).toLowerCase() }</span>
          </h1>

          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-2 p-1 mb-6 bg-gray-100 rounded'>

            <NavLink to='/dashboard/user/active-booking' className={({ isActive }) => `w-full flex justify-center py-2 border text-md rounded shadow font-medium outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${ isActive ? 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600' : 'text-gray-700 bg-white hover:bg-gray-50' }` }> 
              Active Booking
            </NavLink>

            <NavLink to='/dashboard/user/booking-history' className={({ isActive }) => `w-full flex justify-center py-2 border text-md rounded shadow font-medium outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${ isActive ? 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600' : 'text-gray-700 bg-white hover:bg-gray-50' }` }> 
              Booking History
            </NavLink>

            <NavLink to='/dashboard/user/notifications' className={({ isActive }) => `w-full flex justify-center py-2 border text-md rounded shadow font-medium outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${ isActive ? 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600' : 'text-gray-700 bg-white hover:bg-gray-50' }` }> 
              Notifications
            </NavLink>

            <NavLink to='/dashboard/user/profile' className={({ isActive }) => `w-full flex justify-center py-2 border text-md rounded shadow font-medium outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${ isActive ? 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600' : 'text-gray-700 bg-white hover:bg-gray-50' }` }> 
              Profile
            </NavLink>

          </div>

          <div className='mt-10'>
            <Outlet />                
          </div>
          

        </div>  
      </div>
    
      <Footer />
    </div>
  )
}

export default UserDashboard