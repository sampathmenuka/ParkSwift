import React from 'react'
import Navbar from '../components/Navbar'
import FeatureSection from '../components/FeatureSection'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'
import ParkingSearch from '../components/ParkingSearch'

const Index = () => {
  return (
    <div className='flex flex-col min-h-screen'>

      <Navbar />

      {/* Hero section  */}

      <div className='pt-16 pb-20 bg-gradient-to-br from-indigo-500 to-blue-700 min-h-screen'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl font-extrabold tracking-wider text-white sm:text-5xl md:text-7xl mt-20'>
            <span className='block'>Parking made simple</span>
            <span className='block text-gray-800'>anytime, anywhere</span>
          </h1>
          <hr className='mt-5 w-[80px] mx-auto border-2 rounded-full border-gray-800'/>
          <p className="text-base mt-6 max-w-lg mx-auto sm:text-xl text-gray-200 sm:max-w-3xl font-light">
            Find and book available parking spaces in seconds. Save time, money and eliminate the stress of finding parking.
          </p>


          <ParkingSearch />

          <div className="mt-12 text-sm text-white">
            Over 50,000 parking spots available in more than 200 cities
          </div>
        </div>
      </div>
      

      <FeatureSection />

      <HowItWorks />

      <Testimonials />

      <CallToAction />

      <Footer />
    </div>
  )
}

export default Index