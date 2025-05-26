import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from './pages/Index';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import TermsPrivacy from './pages/TermsPrivacy';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Payment from './pages/Payment';
import SearchParking from './pages/SearchParking'
import SlotBooking from './pages/SlotBooking'
import NotFound from './pages/NotFound'
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './components/PrivateRoute';

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


        <Route path='/dashboard/admin' element={<AdminDashboard />} />
        
        <Route path="/search" element = {<SearchParking />} />
        <Route path="/booking" element = {<SlotBooking />} />
        <Route path='/payment' element={<Payment />} />
        <Route path="*" element = {<NotFound />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
