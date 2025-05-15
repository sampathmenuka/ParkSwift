import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from './pages/Index';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import TermsPrivacy from './pages/TermsPrivacy';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Payment from './pages/Payment';
import SearchParking from './pages/SearchParking'
import SlotBooking from './pages/SlotBooking'
import NotFound from './pages/NotFound'
import ResetPassword from './pages/ResetPassword';


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
        <Route path='/dashboard' element={<UserDashboard />} />
        <Route path='/dashboard/user' element={<UserDashboard />} />
        <Route path='/dashboard/owner' element={ <OwnerDashboard /> } />
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