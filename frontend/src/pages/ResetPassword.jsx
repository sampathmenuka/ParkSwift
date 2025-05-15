import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {AuthContext} from '../contexts/AuthContext'
import axios from 'axios';
import logo from '../assets/logo.png'
import { Lock, Mail } from 'lucide-react';
import {toast} from 'react-toastify'

const ResetPassword = () => {

  const navigate = useNavigate();

  const {backendUrl} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {

    if (e.target.value.length > 0 && inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {

    if (e.key === "Backspace" && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {

    const paste = e.clipboardData.getData('text')

    const pasteArray = paste.split('');

    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }

  const onSubmitEmail = async (e) => {

    e.preventDefault();

    try {

      const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email})

      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }

      data.success && setIsEmailSent(true);
      
    } catch (error) {
        toast.error(error.message)
    }
  }

  const onSubmitOtp = async (e) => {

    e.preventDefault();

    const otpArray = inputRefs.current.map(e => e.value)
    setOtp(otpArray.join(''));
    setIsOtpSubmitted(true);
  }

  const onSubmitNewPassword = async (e) => {

    e.preventDefault();

    try {
      
      const {data} = await axios.post(backendUrl + '/api/auth/reset-password', {email, otp, newPassword})

      data.success ? toast.success(data.message) : toast.error(data.message)

      data.success && navigate('/login')


    } catch (error) {
        toast.error(error.message)
    }
  }



  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-indigo-600'>
      <img src={logo} alt="logo" className='absolute left-5 sm:left-20 top-5 w-32 sm:w-[132px] cursor-pointer' onClick={() => navigate('/')}/>

      {/* enter email id  */}
      {
        !isEmailSent &&  
        
        <form onSubmit={onSubmitEmail} className='bg-gray-900 p-8 rounded-lg shadow-xl w-96 text-sm' >

          <h1 className='text-white text-2xl font-semibold text-center mb-2'>Reset Password</h1>
          
          <p className='text-center mb-8 text-indigo-400'>Enter your registered email address</p>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] '>
            <Mail className='w-5 h-5 text-indigo-400' />

            <input type="email" placeholder='Email Id' className='bg-transparent outline-none text-white' value={email} onChange={(e) => setEmail(e.target.value)} required/>

          </div>

          <button type='submit' className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-blue-800 rounded-full text-white mt-3'>Submit</button>

        </form>
      }

      {/* otp input form  */}

      {

        !isOtpSubmitted && isEmailSent &&
        
        <form onSubmit={onSubmitOtp} className='bg-gray-900 p-8 rounded-lg shadow-xl w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-2'>Reset Password OTP</h1>
        
          <p className='text-center mb-8 text-indigo-400'>Enter the 6-digit code sent to your email id.</p>

          <div className='flex justify-between mb-8' onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
              <input type="text" key={index} maxLength='1' required className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md' 
              ref={e => inputRefs.current[index] = e} onInput={(e) => handleInput(e, index)} 
              onKeyDown={(e) => handleKeyDown(e, index)} />
            ))}
          </div>

          <button type='submit' className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-blue-800 text-white rounded-full'>
            Reset Password
          </button>
        </form>
      }

      {/* enter new Password  */}

      {

        isOtpSubmitted && isEmailSent && 
        
        <form onSubmit={onSubmitNewPassword} className='bg-gray-900 p-8 rounded-lg shadow-xl w-96 text-sm' >

          <h1 className='text-white text-2xl font-semibold text-center mb-2'>New Password</h1>
        
          <p className='text-center mb-8 text-indigo-400'>Enter the new password below</p>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] '>
            <Lock className='w-5 h-5 text-indigo-400' />

            <input type="password" placeholder='Password' className='bg-transparent outline-none text-white' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>

          </div>

          <button type='submit' className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-blue-800 rounded-full text-white mt-3'>
            Submit
          </button>

        </form>

      }


    </div>
  )
}

export default ResetPassword