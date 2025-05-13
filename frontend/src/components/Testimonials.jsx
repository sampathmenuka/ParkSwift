import React from 'react'
import { testimonials } from '../assets/assets.js'

const Testimonials = () => {
  return (
    
    <div className='bg-gray-50 py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-semibold text-gray-800 sm:text-4xl'>What Our Users Say</h2>
          <hr className='w-[60px] border-2 mx-auto border-indigo-500 rounded-xl mt-1'/>
          <p className='mt-4 max-w-2xl mx-auto text-xl text-gray-500'>Don't just take our word for it - hear from our happy users.</p>
        </div>

        <div className='mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none'>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className='bg-white rounded-lg shadow overflow-hidden transition-all hover:scale-105 duration-300'>
              <div className='p-6'>
                <div>
                  <p className='text-gray-500 mb-3 italic'>"{testimonial.content}"</p>
                  <div className='flex items-center mt-4'>
                    <div>
                      <img src={testimonial.imageUrl} className='w-10 h-10 object-cover rounded-full'/>
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-gray-800'>{testimonial.author}</p>
                      <div className='text-sm text-gray-600'>
                        <p>{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Testimonials