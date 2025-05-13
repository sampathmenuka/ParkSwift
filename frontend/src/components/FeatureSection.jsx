import React from 'react'
import { features } from '../assets/assets'

const FeatureSection = () => {
  return (
    <div className='py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-semibold sm:text-4xl text-gray-800'>Park with peace mind</h2>
          <hr className='w-[60px] border-2 mx-auto border-indigo-500 rounded-xl mt-2'/>
          <p className='mt-5 max-w-2xl mx-auto text-xl text-gray-500'>
            Our platform makes finding and booking parking spaces simple and secure.
          </p>
        </div>

        <div className='mt-12'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {features.map((feature) => (
              <div key={feature.name} className='relative bg-gray-50 rounded-lg shadow transition-all duration-300 hover:scale-105'>
                <div className='absolute flex items-center justify-center bg-indigo-500 h-12 w-12 rounded-br-lg'>
                  <feature.icon className='h-6 w-6 text-white' />
                </div>
                <div className='p-6 pl-16'>
                  <h3 className='text-lg font-medium leading-6 text-gray-800'>{feature.name}</h3>
                  <p className='mt-2 text-gray-600'>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureSection