import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import { Facebook, Instagram } from 'lucide-react'
import { toast } from 'react-toastify'

const Footer = () => {

  const year = new Date().getFullYear();

  const [email, setEmail] = useState('')

  const submitHandler = (e) => {
    e.preventDefault();

    setTimeout(() => {
      toast.success("Thank you! We will got you soon!");
      setEmail('');
    }, 1500)
  }

  return (
    <footer className='text-white bg-gradient-to-tr from-indigo-300 to-gray-100'>
      <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
          <div>
            <NavLink to='/' onClick={() => scrollTo(0,0)} >
              <img src={logo} alt="logo" className='w-48' /> 
            </NavLink>
            <p className='mt-4 text-sm text-gray-600 sm:w-[220px]'>
              Making parking simple, secure, and seamless.
            </p> 
          </div>

          <div>
            <h3 className='text-sm font-semibold uppercase text-gray-800 tracking-wider'>Company</h3>
            <ul className='flex flex-col mt-4 gap-3'>
              <li>
                <NavLink to="/about" onClick={() => scrollTo(0,0)} className="text-base text-gray-600 hover:text-indigo-600 font-medium transition-all duration-300" >
                  About Us
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact" onClick={() => scrollTo(0,0)} className="text-base text-gray-600 hover:text-indigo-600 font-medium transition-all duration-300" >
                  Contact
                </NavLink>
              </li>            
            </ul>
          </div>

          <div>
            <h3 className='text-sm font-semibold uppercase text-gray-800 tracking-wider'>SUPPORT</h3>
            <ul className='flex flex-col mt-4 gap-3'>
              <li>
                <NavLink to="/faq" onClick={() => scrollTo(0,0)} className="text-base text-gray-600 hover:text-indigo-600 font-medium transition-all duration-300" >
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink to="/help" onClick={() => scrollTo(0,0)} className="text-base text-gray-600 hover:text-indigo-600 font-medium transition-all duration-300" >
                  Help Center
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms-privacy" onClick={() => scrollTo(0,0)} className="text-base text-gray-600 hover:text-indigo-600 font-medium transition-all duration-300" >
                  Terms & Privacy
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-sm font-semibold uppercase text-gray-800 tracking-wider'>SIGN UP</h3>
            <p className='mt-3 text-base text-gray-600'>
              Get updates on new parking spots and features.
            </p>
            <form onSubmit={submitHandler} className='mt-4 sm:flex sm:max-w-md'>
              <input type="email" name="email" value={email} placeholder='Enter your Email' className='w-full bg-gray-700 border border-transparent rounded-md py-2 px-4 text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400' required onChange={e => setEmail(e.target.value)}/>
              <div className='mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0'>
                <button type='submit' className='w-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white'>Get in Touch</button>
              </div>
            </form>
          </div>
        </div>


        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-500">
            &copy; {year} ParkSwift. All rights reserved.
          </p>

          <div className='flex items-center mt-4 gap-3 sm:mt-0'>
            <div className='bg-gray-600 rounded-full p-2 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300'>
              <NavLink to='/'>
                <Facebook className='w-5 h-5' />
              </NavLink>
            </div>
            <div className='bg-gray-600 rounded-full p-2 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300'>
              <NavLink to='/'>
                <Instagram className='w-5 h-5' />
              </NavLink>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer