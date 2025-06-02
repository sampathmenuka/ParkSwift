import { Car, Home } from 'lucide-react';
import React from 'react';

const HowItWorks = () => {
  return (
    <div className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-10'>
        <div className='text-center'>
          <h2 className='text-3xl font-semibold sm:text-4xl text-gray-800'>How ParkSwift Works</h2>
          <hr className='w-[60px] border-2 mx-auto border-indigo-500 rounded-xl mt-2' />
          <p className='mt-5 max-w-2xl mx-auto text-xl text-gray-500'>
            Whether you're looking for parking or have a space to rent, we've got you covered.
          </p>
        </div>

        <div className='mt-12'>
          {/* For Drivers */}
          <div className='mb-12'>
            <h3 className='text-2xl font-semibold text-indigo-500 mb-10 flex items-center justify-center'>
              <Car className='mr-2 h-6 w-6' />
              <span>For Drivers</span>
            </h3>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-3'>
              <div className='relative bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out'>
                <div className='absolute -left-4 -top-4 h-10 w-10 bg-indigo-500 flex items-center justify-center rounded-full font-bold text-white text-lg hover:bg-indigo-600 transition-colors'>
                  1
                </div>
                <div className='p-6'>
                  <h4 className='text-xl font-semibold text-gray-700 mb-2 hover:text-gray-900 transition-colors'>
                    Search
                  </h4>
                  <p className='text-gray-600'>
                    Enter your destination, date, and times to find available parking spaces nearby.
                  </p>
                </div>
              </div>

              <div className='relative bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out'>
                <div className='absolute -left-4 -top-4 h-10 w-10 bg-indigo-500 flex items-center justify-center rounded-full font-bold text-white text-lg hover:bg-indigo-600 transition-colors'>
                  2
                </div>
                <div className='p-6'>
                  <h4 className='text-xl font-semibold text-gray-700 mb-2 hover:text-gray-900 transition-colors'>
                    Book & Pay
                  </h4>
                  <p className='text-gray-600'>
                    Reserve your spot instantly and pay securely through our platform.
                  </p>
                </div>
              </div>

              <div className='relative bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out'>
                <div className='absolute -left-4 -top-4 h-10 w-10 bg-indigo-500 flex items-center justify-center rounded-full font-bold text-white text-lg hover:bg-indigo-600 transition-colors'>
                  3
                </div>
                <div className='p-6'>
                  <h4 className='text-xl font-semibold text-gray-700 mb-2 hover:text-gray-900 transition-colors'>
                    Park
                  </h4>
                  <p className='text-gray-600'>
                    Use your phone or Desktop to access the parking spot and enjoy your hassle-free parking.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* For Space Owners */}
          <div>
            <h3 className='text-2xl font-semibold text-indigo-500 mb-10 flex items-center justify-center'>
              <Home className='mr-2 h-6 w-6' />
              <span>For Space Owners</span>
            </h3>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-3'>
              <div className='relative bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out'>
                <div className='absolute -left-4 -top-4 h-10 w-10 bg-indigo-500 flex items-center justify-center rounded-full font-bold text-white text-lg hover:bg-indigo-600 transition-colors'>
                  1
                </div>
                <div className='p-6'>
                  <h4 className='text-xl font-semibold text-gray-700 mb-2 hover:text-gray-900 transition-colors'>
                    List Your Space
                  </h4>
                  <p className='text-gray-600'>
                    Add your parking space details, photos, and set your availability.
                  </p>
                </div>
              </div>

              <div className='relative bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out'>
                <div className='absolute -left-4 -top-4 h-10 w-10 bg-indigo-500 flex items-center justify-center rounded-full font-bold text-white text-lg hover:bg-indigo-600 transition-colors'>
                  2
                </div>
                <div className='p-6'>
                  <h4 className='text-xl font-semibold text-gray-700 mb-2 hover:text-gray-900 transition-colors'>
                    Get Bookings
                  </h4>
                  <p className='text-gray-600'>
                    Drivers book your space and you receive notifications for each reservation.
                  </p>
                </div>
              </div>

              <div className='relative bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out'>
                <div className='absolute -left-4 -top-4 h-10 w-10 bg-indigo-500 flex items-center justify-center rounded-full font-bold text-white text-lg hover:bg-indigo-600 transition-colors'>
                  3
                </div>
                <div className='p-6'>
                  <h4 className='text-xl font-semibold text-gray-700 mb-2 hover:text-gray-900 transition-colors'>
                    Earn Money
                  </h4>
                  <p className='text-gray-600'>
                    Get paid automatically after each completed parking session.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;