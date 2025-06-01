import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Star } from 'lucide-react';

const Review = () => {

  const { slotId } = useParams();

  const {backendUrl} = useContext(AuthContext);

  const [slot, setSlot] = useState({})
  const [canReview, setCanReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  // check whether user can review or not 
  const checkEligibility = async () => {

    try {  
      const {data} = await axios.get(backendUrl + `/api/reviews/can-review/${slotId}`);

      if (data.success) {
        setCanReview(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
        toast.error(error.message)
    }
  }

  // submit review by user 
  const submitReview = async (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      toast.error("Please select a rating between 1 and 5.");
      return;
    }

    setLoading(true);

    try {
      const {data} = await axios.post(backendUrl + `/api/reviews/${slotId}`, { rating, comment });

      if (data.success) {
        toast.success(data.message);
        navigate('/dashboard/user/booking-history')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }
  }

  useEffect(() => {
    const fetchSlot = async () => {
      try {
        const { data } = await axios.get(backendUrl + `/api/slots/${slotId}`);

        if (data.success) {
          setSlot(data.slot);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchSlot();
  }, [slotId])

  useEffect(() => {
    checkEligibility();
  }, [slotId])


  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />

      <div className='pt-24 pb-16'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Leave a Review
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <div>
              {
              !canReview ? (
                <p className="text-red-500 text-center">
                  You must complete a booking to leave a review.
                </p>
              ) : (

                <form onSubmit={submitReview} className='p-6 shadow-md rounded-md border h-fit'>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Your Rating: (1 to 5)</label>
                    <div className="flex gap-2 items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-6 h-6 cursor-pointer transition-colors ${ star <= rating ? "text-yellow-400" : "text-gray-300" }`} onClick={() => setRating(star)} fill={star <= rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Feedback (optional):</label>
                    <textarea rows="4" value={comment} onChange={(e) => setComment(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Write your feedback..." />
                  </div>

                  <button type="submit" disabled={loading} className="w-full bg-indigo-500 font-medium text-white py-3 rounded-lg hover:bg-indigo-600 transition-all disabled:opacity-50" >
                    {loading ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
                )
              }
            </div>

            <div className='p-6 shadow-md rounded-md border h-fit'>
              <h3 className='text-xl md:text-2xl leading-none tracking-wider font-semibold text-indigo-500 mb-2'>
                Summary
              </h3>

              <hr className='mb-4'/>

              <div className='mb-6'>
                <h3 className='text-lg md:text-xl leading-none font-semibold text-gray-700'>
                  {slot.location}
                </h3>
                <p className='text-gray-600 font-medium mb-4'>
                  {slot.address}
                </p>

                <img src={slot.images} className='w-full h-36 object-cover object-center rounded mb-3 shadow-md' alt={slot.location} />

                <p className='text-gray-700 font-medium text-sm'>
                  Description: 
                  <span className='ml-1 text-gray-600'>{slot.description}</span>
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="text-yellow-400 font-medium flex items-center gap-1">
                    <Star className='w-4 h-4 transition-colors' fill={"currentColor"}/>
                    <span>{slot.rating}</span>
                  </div>
                  <div className="text-sm text-gray-400 ml-1">
                    ({slot.totalReviews} reviews)
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

export default Review