import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

const Contact = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [topic, setTopic] = useState('general');

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      toast.success("Your message has been sent! We will get back soon.")
      setName('')
      setEmail('')
      setMessage('')
      setSubject('')
      setTopic('')
    }, 1500);

  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />

      <div className='pt-24 pb-16'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
            Contact Us
          </h1>
          <p className='mt-4 text-xl text-gray-600'>
            Have questions or feedback? We'd love to hear from you.
          </p>

          <div className='grid grid-cols-1 mt-12 lg:grid-cols-3 gap-8'>

            {/* contact information  */}
            <div>
              <div className='bg-gray-50 p-6 rounded-lg shadow-md mb-8'>
                <div className='flex items-center mb-4'>
                  <Mail className='w-6 h-6 text-indigo-600 mr-2' />
                  <h2 className='text-lg font-semibold text-gray-700'>Email Us</h2>
                </div>
                <p className='text-gray-600'>For general inquiries:</p>
                <Link to='mailto:info@parkswift.com' className='text-indigo-500 hover:underline' >
                  info@parkswift.com
                </Link>

                <p className="text-gray-600 mt-3">For support:</p>
                <Link to="mailto:support@parkswift.com" className="text-indigo-500 hover:underline">
                  support@parkswift.com
                </Link>
              </div>

              <div className='bg-gray-50 p-6 rounded-lg shadow-md mb-8'>
                <div className='flex items-center mb-4'>
                  <Phone className='w-6 h-6 text-indigo-600 mr-2' />
                  <h2 className='text-lg font-semibold text-gray-700'>Call Us</h2>
                </div>
                <p className='text-gray-600'>Customer Support:</p>
                <Link to='tel:+94114567890' className='text-indigo-500 hover:underline' >
                  +94 (11) 456-7890
                </Link>
              </div>

              <div className='bg-gray-50 p-6 rounded-lg shadow-md'>
                <div className='flex items-center mb-4'>
                  <MapPin className='w-6 h-6 text-indigo-600 mr-2' />
                  <h2 className='text-lg font-semibold text-gray-700'>Visit Us</h2>
                </div>
                <p className='text-gray-600'>
                  ParkSwift Headquarters<br />
                  123 Parking Avenue<br />
                  Lotus Road, Colombo 11<br />
                  Sri Lanka
                </p>
              </div>


            </div>

            {/* contact form  */}
            <div className='lg:col-span-2 bg-gray-50 p-8 rounded-lg shadow-md mb-8'>
              <h2 className='text-xl font-bold text-gray-700 mb-6'>
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label htmlFor="name" className='text-sm font-md'>Your Name</label>
                    <input className='py-2 px-3 rounded-md border w-full mt-2 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="text" id='name' value={name} onChange={e => setName(e.target.value)} placeholder='Kumar Peiries' required />
                  </div>
                  <div>
                    <label className='text-sm font-md ' htmlFor="email">Email Address</label>
                    <input className='py-2 px-3 rounded-md border w-full mt-2 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="email" id='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Peries@gmail.com' required />
                  </div>
                </div>

                <div>
                  <label className='text-sm font-md' htmlFor="topic">Topics</label>
                  <select className='py-2 px-3 rounded-md border w-full mt-2 placeholder-gray-400 text-gray-800 outline-none'  value={topic} onChange={e => setTopic(e.target.value)} >
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Questions</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Business Partnership</option>
                  </select>
                </div>

                <div>
                  <label className='text-sm font-md' htmlFor="subject">Subject</label>
                  <input className='py-2 px-3 rounded-md border w-full mt-2 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="text" id='subject' value={subject} onChange={e => setSubject(e.target.value)} placeholder='What is your message about?' required />    
                </div>

                <div>
                  <label className='text-sm font-md' htmlFor="message">Your message</label>
                  <textarea className='h-32 py-2 px-3 rounded-md border w-full mt-2 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' id='message' value={message} onChange={e => setMessage(e.target.value)} placeholder='How can we help you?' required />    
                </div>

                <button className = 'w-full py-3 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 transition-all duration-300' type="submit"  disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>

                <p className="text-sm text-gray-500">
                  By submitting this form, you agree to our <Link to="/terms-privacy" className="text-indigo-500 hover:underline">Privacy Policy</Link> and consent to being contacted regarding your inquiry.
                </p>
              </form>
            </div>
          </div>


          {/* FAQ section  */}

          <div className="mt-16 bg-gray-50 rounded-lg p-8 shadow">
            <h2 className='text-2xl font-bold text-gray-700 mb-7 text-center'>
              Common Questions
              <hr className='w-[60px] mx-auto border-2 rounded-lg border-indigo-500 mt-1'/>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
              <div>
                <h3 className="font-semibold text-lg mb-2">How quickly will I receive a response?</h3>
                <p className="text-gray-600">We aim to respond to all inquiries within 24-48 business hours.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Is there a phone support option?</h3>
                <p className="text-gray-600">Yes, our customer support team is available by phone during business hours.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Can I visit your office?</h3>
                <p className="text-gray-600">Our office is open to visitors by appointment only. Please contact us to schedule a visit.</p>
              </div>
            </div>

            <div className='text-center mt-8'>
              <Link onClick={() => scrollTo(0, 0)} to='/faq' className='inline-flex items-center gap-2 text-indigo-500'>
                Visit our full FAQ page
                <ArrowRight className='w-5 h-5' />
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contact