import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Info, Shield } from 'lucide-react'
import {Link} from 'react-router-dom' 

const TermsPrivacy = () => {

  const [state, setState] = useState('terms');

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />

      <div className='pt-24 pb-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg-px-8'>
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-8'>
            <h1 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-2'>
              Terms & Privacy
            </h1>
          </div>

          <div className='flex max-w-sm  gap-2 p-1 mb-6 bg-gray-100 rounded'>
            <button type='button' onClick={() => setState('terms')} className={`w-full flex gap-2 items-center justify-center py-2 border text-sm sm:text-base rounded-md shadow-sm font-medium focus:outline-none focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${state === 'terms' ? 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600' : 'border-none text-gray-700 bg-transparent hover:bg-gray-50'}`}>
              <Info className='w-4 h-4 sm:w-6 sm:h-6' />
              Terms of Service
            </button>

            <button type='button' onClick={() => setState('privacy')} className={`w-full flex items-center justify-center py-2 gap-2 border text-sm sm:text-base rounded-md shadow-sm font-medium focus:outline-none focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${state === 'privacy' ? 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600' : 'border-none text-gray-700 bg-transparent hover:bg-gray-50'}`} >
              <Shield className='w-4 h-4 sm:w-6 sm:h-6'/>
              Privacy Policy
            </button>
          </div>

          {
            state === 'terms' ? (
              <div>
                <div className='mb-10'>
                  <h2 className='text-2xl font-semibold text-indigo-500'>
                    Terms of Service
                  </h2>
                  <h3 className='text-xl font-medium mt-6 text-gray-800'>
                    1. Service Usage
                  </h3>
                  <p className='text-gray-600'>
                    By accessing or using the ParkSwift platform, you agree to comply with and be bound by these Terms of Service. ParkSwift reserves the right to change these terms at any time, and you agree to abide by the most recent version posted.
                  </p>

                  <h3 className='text-xl font-medium mt-6 text-gray-800'>
                    2. User Accounts
                  </h3>
                  <p className='text-gray-600'>
                    You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. ParkSwift reserves the right to refuse service, terminate accounts, or remove content at our discretion.
                  </p>

                  <h3 className='text-xl font-medium mt-6 text-gray-800'>
                    3. Payments and Refunds
                  </h3>
                  <p className='text-gray-600'>
                    All payments are processed securely through our payment providers. Refunds for parking spaces are subject to the cancellation policy specified at the time of booking. Generally, cancellations made at least 2 hours before the scheduled start time are eligible for a full refund.
                  </p>

                  <h3 className='text-xl font-medium mt-6 text-gray-800'>
                    4. Limitation of Liability
                  </h3>
                  <p className='text-gray-600'>
                    ParkSwift is not liable for any damages or losses related to your use of the service. This includes but is not limited to damage to vehicles, theft, or issues with parking spot availability.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className='mb-10'>
                  <h2 className='text-2xl font-semibold text-indigo-500'>
                    Privacy Policy
                  </h2>
                  <h3 className='text-xl font-medium mt-6 text-gray-800'>
                    1. Information Collection
                  </h3>
                  <p className='text-gray-600'>
                    We collect information you provide directly to us, including personal information such as your name, email address, phone number, payment information, and location data when you use our service.
                  </p>

                  <h3 className='text-xl font-medium mt-6 text-gray-800'>
                    2. How We Use Your Information
                  </h3>
                  <p className='text-gray-600'>
                    We use the information we collect to provide, maintain, and improve our services, process transactions, send you related information, and communicate with you about promotions and updates.
                  </p>

                  <h3 className='text-xl font-medium mt-6 text-gray-800'>
                    3. Information Sharing
                  </h3>
                  <p className='text-gray-600'>
                    We do not share your personal information with third parties except as described in this policy. This may include service providers who assist us in providing the ParkSwift service, legal requirements, or business transfers.
                  </p>

                  <h3 className='text-xl font-medium mt-6 text-gray-800'>
                    4. Data Security
                  </h3>
                  <p className='text-gray-600'>
                    We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
                  </p>
                </div>
              </div>
            )
          }
          

          <div className='bg-indigo-200 border border-indigo-300 rounded-lg p-6 mb-6 shadow'>
            <h3 className='tracking-wide text-xl font-semibold text-gray-800 mb-4'>
              Have Questions?
            </h3>

            <p className='text-gray-600 mb-4 text-lg'>
              If you have any questions about our Terms of Service or Privacy Policy, please contact our support team.
            </p>

            <div className='flex justify-start font-medium'>
              <Link to="/contact">
                <button onClick={() => scrollTo(0,0)} className='py-2 px-5 bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 rounded text-white'>Contact Support</button>
              </Link>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default TermsPrivacy