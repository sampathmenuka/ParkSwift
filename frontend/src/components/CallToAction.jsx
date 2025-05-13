import React from 'react'
import {Link} from 'react-router-dom'

const CallToAction = () => {
  return (
    <div className='bg-indigo-500 py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-semibold text-white sm:text-4xl'>Ready to transform how you park?</h2>
          <hr className='w-[60px] border-2 mx-auto border-white rounded-xl mt-1'/>
          <p className='mt-5 text-xl max-w-2xl mx-auto text-gray-200'>Join thousands of drivers and parking space owners who are already using ParkSwift.</p>
          <div className='mt-8 flex justify-center gap-6'>
            <Link to='/login' onClick={() => scrollTo(0, 0)} >
              <button className='bg-white px-5 py-2 rounded-md font-medium text-indigo-500 border border-white hover:bg-gray-100 transition-all duration-300'>Sign up now</button>
            </Link>

            <Link to='/contact' onClick={() => scrollTo(0, 0)} >
              <button className='bg-transparent text-white hover:bg-gray-100 hover:text-indigo-500 border rounded-md px-5 py-2 font-medium border-white transition-all duration-300'>Contact Sales</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallToAction