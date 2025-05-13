import React from 'react'
import Navbar from '../components/Navbar'
import FeatureSection from '../components/FeatureSection'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

const Index = () => {
  return (
    <div className='flex flex-col min-h-screen'>

      <Navbar />

      {/* Hero section  */}

      

      <FeatureSection />

      <HowItWorks />

      <Testimonials />

      <CallToAction />

      <Footer />
    </div>
  )
}

export default Index