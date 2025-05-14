import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import { Car, Lock, Mail, Phone, User } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userType, setUserType] = useState('user')


  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />

      <div className='pt-24 pb-16 px-2'>
        <div className='max-w-lg mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50 shadow-md rounded-md pb-6'>
          <div className='flex flex-col py-6'>
            <h2 className='text-center text-2xl font-bold text-gray-800'>Welcome to ParkSwift</h2>
            <p className='text-center text-sm text-gray-600'>
              {
                isLogin ? 'Enter your details to sign in' : 'Enter your details to create an account'
              }
            </p>
            <div className='pt-4'>
              <label className='text-sm font-medium block'>Login as:</label>
              <select className='py-2 px-3 rounded-md border w-full mt-1 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 transition-all focus:ring-indigo-400' value={userType} onChange={e => setUserType(e.target.value)}>
                <option value="user">Parking User</option>
                <option value="owner">Slot Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className='flex gap-2 p-1 mb-6 bg-gray-100 rounded-sm'>
            <button type='button' onClick={() => setIsLogin(true)} className={`w-full flex justify-center py-2 px-4 border text-sm rounded-md shadow-sm font-medium focus:outline-none focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${isLogin ? 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`}>
              Log in
            </button>

            <button type='button' onClick={() => setIsLogin(false)} className={`w-full flex justify-center py-2 px-4 border text-sm rounded-md shadow-sm font-medium focus:outline-none focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${!isLogin ? 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`}>Register</button>
          </div>

          <form>
            {!isLogin && (
              <div className='mb-4'>
                <label className='text-sm font-medium block' htmlFor="fullname">Full Name</label>
                <div className='mt-1 flex items-center relative'>
                  <input type="text" id='fullname' required className='pl-10 py-2 px-3 rounded-md border w-full placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400' placeholder='John Doe' />
                  <User className='w-4 h-4 text-gray-500 absolute left-2' />
                </div>
              </div>
            )}

            <div className='mb-4'>
              <label className='text-sm font-medium block' htmlFor="email">Email</label>
              <div className='mt-1 flex items-center relative '>
                <input type="email" id='email' required className='pl-10 py-2 px-3 rounded-md border w-full placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400' placeholder='you@example.com' />
                <Mail className='w-4 h-4 text-gray-500 absolute left-2' />
              </div>
            </div>

            {!isLogin && (
              <div className='mb-4'>
                <label className='text-sm font-medium block' htmlFor="phone">Phone Number</label>
                <div className='mt-1 flex items-center relative'>
                  <input type="tel" id='phone' required className='pl-10 py-2 px-3 rounded-md border w-full placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400' placeholder='123 456 7890' />
                  <Phone className='w-4 h-4 text-gray-500 absolute left-2' />
                </div>
              </div>
            )}

            <div className='mb-4'>
              <label className='text-sm font-medium block' htmlFor="password">Password</label>
              <div className='mt-1 flex items-center relative'>
                <input type="password" id='password' required className='pl-10 py-2 px-3 rounded-md border w-full placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400' placeholder='++++' />
                <Lock className='w-4 h-4 text-gray-500 absolute left-2' />
              </div>
            </div>


            {!isLogin && (
              <>
                <div className='mb-4'>
                  <label className='text-sm font-medium block' htmlFor="cpassword">Confirm password</label>
                  <div className='mt-1 flex items-center relative'>
                    <input type="password" id='cpassword' required className='pl-10 py-2 px-3 rounded-md border w-full placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400' placeholder='++++' />
                    <Lock className='w-4 h-4 text-gray-500 absolute left-2' />
                  </div>
                </div>

                <hr className='border-gray-300 mb-4' />

                <div>
                  <h2 className='font-base text-gray-700 mb-3'>Vehicle Details (Optional)</h2>

                  <div className='mb-4'>
                    <label className='text-sm font-medium block' htmlFor="vtype">Vehicle Type</label>
                    <div className='mt-1 flex items-center relative'>
                      <input type="text" id='vtype' className='pl-10 py-2 px-3 rounded-md border w-full placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400' placeholder='Sedan, SUV, etc..' />
                      <Car className='w-4 h-4 text-gray-500 absolute left-2'/>
                    </div>
                  </div>

                  <div className='mb-4'>
                    <label className='text-sm font-medium block' htmlFor="lnumber">License Plate Number</label>
                    <div className='mt-1 flex items-center'>
                      <input type="text" id='lnumber' className='py-2 px-3 rounded-md border w-full placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400' placeholder='ABC - 1234' />
                    </div>
                  </div>
                </div>  

              </>             
            )}

            {
              isLogin && (
                <div className='mb-4 flex justify-end'>
                  <Link to='/' >
                    <p className='text-indigo-500 hover:underline transition-all font-medium'>Forgot Password?</p>
                  </Link>
                </div>
              )
            }

            <div className='pt-2'>
              <button type='submit' className='w-full py-2 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 transition-all duration-300'>{isLogin ? 'Log in' : 'Create account'}</button>
            </div>
          </form>

          <div className='mt-4 text-center'>
            <p className='text-sm text-gray-600'>
              {
                isLogin ? "Don't have an account?" : "Already have an account?"
              }{' '}
              <button onClick={() => {setIsLogin(!isLogin); scrollTo(0,0)} } className='font-medium hover:text-indigo-500 hover:underline'>
                {
                  isLogin ? "Sign up" : "Sign in" 
                }
              </button>
            </p>
          </div>


        </div>
      </div>

      <Footer />      
    </div>
  )
}

export default Login