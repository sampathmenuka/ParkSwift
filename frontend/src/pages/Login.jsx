import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom';
import { Car, Lock, Mail, Phone, User } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {

  const navigate = useNavigate();


  const [state, setState] = useState('Sign up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('user')
  const [phone, setPhone] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [licensePlate, setLicensePlate] = useState('')

  const {backendUrl, setIsAuthenticated, setUser } = useContext(AuthContext)

  const onSubmitHandler = async (e) => {

    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      if(state === 'Sign up') {

        const {data} = await axios.post(backendUrl + '/api/auth/register', {name, email, password, confirmPassword, phone, role, vehicleType, licensePlate })

        if (data.success) {
          setUser(data.user);
          setIsAuthenticated(true);
          navigate('/');
          toast.success(`${data.user.role} registered Successfully.`)
        } else{
            toast.error(data.message)
        }
      } else {

        const {data} = await axios.post(backendUrl + '/api/auth/login', {email, password, role})

        if (data.success) {
          setUser(data.user);
          setIsAuthenticated(true);
          navigate('/');
          toast.success(`${data.user.role} logged in successfully.`)
        } else{
            toast.error(data.message)
        }
      }
      
    } catch (error) {
        toast.error(error.message);     
    }
  }


  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />

      <div className='pt-24 pb-16 px-2'>
        <div className='max-w-lg mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50 shadow-md rounded-md pb-6'>
          <div className='flex flex-col py-6'>
            <h2 className='text-center text-2xl font-bold text-indigo-500 tracking-wide'>Welcome to ParkSwift</h2>
            <p className='text-center text-sm text-gray-600'>
              {
                state === 'Sign up' ? 'Enter your details to create an account' : 'Enter your details to sign in' 
              }
            </p>
            <div className='pt-4'>
              <label className='text-sm font-medium block'>Login as:</label>
              <select className='py-2 px-3 rounded-md border w-full mt-1 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 transition-all focus:ring-indigo-400' value={role} onChange={e => setRole(e.target.value)}>
                <option value="user">Parking User</option>
                <option value="owner">Slot Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className='flex gap-2 p-1 mb-6 bg-gray-100 rounded-sm'>
            <button type='button' onClick={() => setState('Log in')} className={`w-full flex justify-center py-2 px-4 border text-sm rounded-md shadow-sm font-medium focus:outline-none focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${state === 'Log in' ? 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`}>
              Log in
            </button>

            <button type='button' onClick={() => setState('Sign up')} className={`w-full flex justify-center py-2 px-4 border text-sm rounded-md shadow-sm font-medium focus:outline-none focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${state === 'Sign up' ? 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`}>Register</button>
          </div>

          <form onSubmit={onSubmitHandler}>
            {state === 'Sign up' && (
              <div className='mb-4'>
                <label className='text-sm font-medium block' htmlFor="fullname">Full Name</label>
                <div className='mt-1 flex items-center relative'>
                  <input type="text" id='fullname' required className='pl-10 py-2 px-3 rounded-md border w-full placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400' placeholder='John Doe' value={name} onChange={e => setName(e.target.value)} />
                  <User className='w-4 h-4 text-gray-500 absolute left-2' />
                </div>
              </div>
            )}

            <div className='mb-4'>
              <label className='text-sm font-medium block' htmlFor="email">Email</label>
              <div className='mt-1 flex items-center relative '>
                <input type="email" id='email' required className='pl-10 py-2 px-3 rounded-md border w-full placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400' placeholder='you@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                <Mail className='w-4 h-4 text-gray-500 absolute left-2' />
              </div>
            </div>

            {state === 'Sign up' && (
              <div className='mb-4'>
                <label className='text-sm font-medium block' htmlFor="phone">Phone Number</label>
                <div className='mt-1 flex items-center relative'>
                  <input type="tel" id='phone' required className='pl-10 py-2 px-3 rounded-md border w-full placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400' placeholder='123 456 7890' value={phone} onChange={e => setPhone(e.target.value)} />
                  <Phone className='w-4 h-4 text-gray-500 absolute left-2' />
                </div>
              </div>
            )}

            <div className='mb-4'>
              <label className='text-sm font-medium block' htmlFor="password">Password</label>
              <div className='mt-1 flex items-center relative'>
                <input type="password" id='password' required className='pl-10 py-2 px-3 rounded-md border w-full placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400' placeholder='++++' value={password} onChange={e => setPassword(e.target.value)} />
                <Lock className='w-4 h-4 text-gray-500 absolute left-2' />
              </div>
            </div>


            {state === 'Sign up' && (
              <>
                <div className='mb-4'>
                  <label className='text-sm font-medium block' htmlFor="cpassword">Confirm password</label>
                  <div className='mt-1 flex items-center relative'>
                    <input type="password" id='cpassword' required className='pl-10 py-2 px-3 rounded-md border w-full placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400' placeholder='++++' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    <Lock className='w-4 h-4 text-gray-500 absolute left-2' />
                  </div>
                </div>

                <hr className='border-gray-300 mb-4' />

                <div>
                  <h2 className='font-base text-gray-700 mb-3'>Vehicle Details (Optional)</h2>

                  <div className='mb-4'>
                    <label className='text-sm font-medium block' htmlFor="vtype">Vehicle Type</label>
                    <div className='mt-1 flex items-center relative'>
                      <input type="text" id='vtype' className='pl-10 py-2 px-3 rounded-md border w-full placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400' placeholder='Sedan, SUV, etc..' value={vehicleType} onChange={e => setVehicleType(e.target.value)} />
                      <Car className='w-4 h-4 text-gray-500 absolute left-2'/>
                    </div>
                  </div>

                  <div className='mb-4'>
                    <label className='text-sm font-medium block' htmlFor="lnumber">License Plate Number</label>
                    <div className='mt-1 flex items-center'>
                      <input type="text" id='lnumber' className='py-2 px-3 rounded-md border w-full placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400' placeholder='ABC - 1234' value={licensePlate} onChange={e => setLicensePlate(e.target.value)} />
                    </div>
                  </div>
                </div>  

              </>             
            )}

            {
              state === 'Log in' && (
                <div className='mb-4 flex justify-end'>
                  <Link to='/reset-password' >
                    <p className='text-indigo-500 hover:underline transition-all font-medium'>Forgot Password?</p>
                  </Link>
                </div>
              )
            }

            <div className='pt-2'>
              <button type='submit' className='w-full py-2 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 transition-all duration-300'>{state === 'Log in' ? 'Log in' : 'Create account'}</button>
            </div>
          </form>

          <div className='mt-4 text-center'>
            <p className='text-sm text-gray-600'>
              {
                state === 'Log in' ? "Don't have an account?" : "Already have an account?"
              }{' '}
              <button onClick={() => {
                  if (state === 'Log in') {
                    setState('Sign up')
                  } else{
                    setState('Log in')
                  }
                ; scrollTo(0,0)} } className='font-medium hover:text-indigo-500 hover:underline'>
                {
                  state === 'Log in' ? "Sign up" : "Sign in" 
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