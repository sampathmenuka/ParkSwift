import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Info } from 'lucide-react'

const About = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='pt-24 pb-16'>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
            About ParkSwift
          </h1>

          <div className='mt-10'>
            <div className='grid md:grid-cols-2 gap-8 items-center mb-12'>
              <div>
                <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  ParkSwift was founded with a simple mission to eliminate the frustration of finding parking in busy urban areas. We connect drivers with available parking spaces through a seamless digital platform.
                </p>
                <p className="text-lg text-gray-600">
                  Our goal is to reduce traffic congestion, save time for drivers, and help parking space owners monetize their unused spaces.
                </p>
              </div>

              <div className='rounded-lg shadow-lg overflow-hidden'>
                <img src="https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="City parking" className="w-full h-64 object-cover" />
              </div>
            </div>

            <div className='grid md:grid-cols-2 gap-8 items-center mb-12'>
              <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Mobile app" className="w-full h-64 object-cover" />
              </div>

              <div className="order-1 md:order-2">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">How It Works</h2>
                <p className="text-lg text-gray-600 mb-1">
                  Our platform connects two types of users: those looking for parking spaces and those who have spaces to offer.
                </p>
                <ul className="list-disc pl-5 text-gray-600 flex flex-col gap-2">
                  <li>Drivers can search, book, and pay for parking spaces in advance or on the spot.</li>
                  <li>Parking space owners can list their available spaces and earn income from them.</li>
                  <li>Our system handles reservations, payments, and provides navigation to your parking spot.</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Our Values
              </h2>

              <div className="grid md:grid-cols-3 gap-8 items-center mb-12">
                <div className='sm:min-h-[200px] border rounded-lg shadow transition-all duration-300 hover:scale-105'>
                  <div className='p-6'>
                    <div className='flex items-center mb-4'>
                      <div className='bg-indigo-300 p-2 rounded-full mr-3'>
                        <Info size={24} className='text-indigo-600' />
                      </div>
                      <h3 className='text-xl font-semibold'>
                        Innovation
                      </h3>
                    </div>
                    <p className='text-gray-600'>
                      We continuously improve our platform to provide the best parking experience possible.
                    </p>
                  </div>
                </div>

                <div className='sm:min-h-[200px] border rounded-lg shadow transition-all duration-300 hover:scale-105'>
                  <div className='p-6'>
                    <div className='flex items-center mb-4'>
                      <div className='bg-indigo-300 p-2 rounded-full mr-3'>
                        <Info size={24} className='text-indigo-600' />
                      </div>
                      <h3 className='text-xl font-semibold'>
                        Community
                      </h3>
                    </div>
                    <p className='text-gray-600'>
                      We build relationships with local communities to understand their unique parking challenges.
                    </p>
                  </div>
                </div>

                <div className='sm:min-h-[200px] border rounded-lg shadow transition-all duration-300 hover:scale-105'>
                  <div className='p-6'>
                    <div className='flex items-center mb-4'>
                      <div className='bg-indigo-300 p-2 rounded-full mr-3'>
                        <Info size={24} className='text-indigo-600' />
                      </div>
                      <h3 className='text-xl font-semibold'>
                        Sustainability
                      </h3>
                    </div>
                    <p className='text-gray-600'>
                      By optimizing parking, we reduce the time cars spend circling for spots, cutting emissions and congestion.
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>

      </div>


      <Footer />
    </div>
  )
}

export default About