import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from './pages/Index';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import TermsPrivacy from './pages/TermsPrivacy';
import Login from './pages/Login';
import SearchParking from './pages/SearchParking'
import SlotBooking from './pages/SlotBooking'
import NotFound from './pages/NotFound'
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './components/PrivateRoute';

import StripeContainer from './components/StripeContainer';
import Review from './pages/Review';

import UserDashboard from './pages/UserDashboard';
import ActiveBooking from './components/dashboard/ActiveBooking'
import BookingHistory from './components/dashboard/BookingHistory';
import Notification from './components/dashboard/Notification'
import UserProfile from './components/dashboard/UserProfile'

import OwnerDashboard from './pages/OwnerDashboard';
import ManageSlots from './components/ownerDashboard/ManageSlots'
import ViewBooking from './components/ownerDashboard/ViewBooking'
import Earnings from './components/ownerDashboard/Earnings'
import OwnerProfile from './components/ownerDashboard/OwnerProfile';

import AdminDashboard from './pages/AdminDashboard';
import Users from './components/adminDashboard/Users';
import ParkingSlots from './components/adminDashboard/ParkingSlots';
import Bookings from './components/adminDashboard/Bookings';
import SystemLogs from './components/adminDashboard/SystemLogs';
import Notifications from './components/adminDashboard/Notifications';


const queryClient = new QueryClient();


const App = () => {
  return (
    <QueryClientProvider client={queryClient} >
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/about' element={<About />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/terms-privacy' element={<TermsPrivacy />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        <Route path='/dashboard/user' 
          element={
            <PrivateRoute allowedRoles={['user']}>
              <UserDashboard />
            </PrivateRoute>} >

            <Route path='active-booking' element={<ActiveBooking />} />
            <Route path='booking-history' element={<BookingHistory />} />
            <Route path='notifications' element={<Notification />} />
            <Route path='profile' element={<UserProfile />} />           
        </Route>

        <Route path='/dashboard/owner' 
          element={
            <PrivateRoute allowedRoles={['owner']}>
              <OwnerDashboard />
            </PrivateRoute>} >

            <Route path='manage-slots' element={<ManageSlots />} />
            <Route path='view-booking' element={<ViewBooking />} />
            <Route path='earnings' element={<Earnings />} />
            <Route path='profile' element={<OwnerProfile />} />        
        </Route>

        <Route path='/dashboard/admin' 
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>} >

            <Route path='users' element={<Users />} />
            <Route path='parking-slots' element={<ParkingSlots />} />
            <Route path='bookings' element={<Bookings />} />
            <Route path='system-logs' element={<SystemLogs />} />        
            <Route path='notifications' element={<Notifications />} />        
        </Route>
        
        <Route path="/search" element = {<SearchParking />} />
        <Route path="/booking/:id" element = {<SlotBooking />} />
        <Route path='/payment' element={
          <PrivateRoute allowedRoles={['user']}>
            <StripeContainer />
          </PrivateRoute> } >
        </Route>
        <Route path="/reviews/:slotId" element={<Review />} />
        <Route path="*" element = {<NotFound />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
