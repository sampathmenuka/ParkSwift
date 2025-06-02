import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { NavLink, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className='bg-gray-50 pt-24 pb-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Admin Panel
          </h1>

          <div className='grid sm:grid-cols-2 lg:grid-cols-5 gap-2 p-1 mb-6 bg-gray-100 rounded'>

            <NavLink to='/dashboard/admin/users' className={({ isActive }) => `w-full flex justify-center py-2 border text-md rounded shadow font-medium outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${ isActive ? 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600' : 'text-gray-700 bg-white hover:bg-gray-50' }` }> 
              Manage Users
            </NavLink>

            <NavLink to='/dashboard/admin/parking-slots' className={({ isActive }) => `w-full flex justify-center py-2 border text-md rounded shadow font-medium outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${ isActive ? 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600' : 'text-gray-700 bg-white hover:bg-gray-50' }` }> 
              Parking Slots
            </NavLink>

            <NavLink to='/dashboard/admin/bookings' className={({ isActive }) => `w-full flex justify-center py-2 border text-md rounded shadow font-medium outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${ isActive ? 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600' : 'text-gray-700 bg-white hover:bg-gray-50' }` }> 
              Bookings
            </NavLink>

            <NavLink to='/dashboard/admin/system-logs' className={({ isActive }) => `w-full flex justify-center py-2 border text-md rounded shadow font-medium outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${ isActive ? 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600' : 'text-gray-700 bg-white hover:bg-gray-50' }` }> 
              System Logs
            </NavLink>

            <NavLink to='/dashboard/admin/notifications' className={({ isActive }) => `w-full flex justify-center py-2 border text-md rounded shadow font-medium outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${ isActive ? 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600' : 'text-gray-700 bg-white hover:bg-gray-50' }` }> 
              Notifications
            </NavLink>

          </div>

          <div className='mt-10'>
            <Outlet />                
          </div>
        
        </div>  
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;