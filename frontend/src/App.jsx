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
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Payment from './pages/Payment';
import SearchParking from './pages/SearchParking'
import SlotBooking from './pages/SlotBooking'
import NotFound from './pages/NotFound'


const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }
  
  return children;
};

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
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path='/dashboard/user' element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path='/dashboard/owner' element={
          <ProtectedRoute>
            <OwnerDashboard />
          </ProtectedRoute>
        } />
        <Route path='/dashboard/admin' element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/search" element = {<SearchParking />} />
        <Route path="/booking" element = {<SlotBooking />} />
        <Route path='/payment' element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        } />
        <Route path="*" element = {<NotFound />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App