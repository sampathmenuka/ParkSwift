import { useEffect, useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Calendar, Clock, CreditCard } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Payment = () => {

  const { state } = useLocation();
  const navigate = useNavigate();

  const { backendUrl, user } = useContext(AuthContext)
  const [slot, setSlot] = useState({})
  const [loading, setLoading] = useState(false);
  
  const stripe = useStripe()
  const elements = useElements();

  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state) return null;

  const {
    slotId,
    slotInfo,
    date,
    startTime,
    endTime,
    duration,
    totalPrice,
  } = state;

  useEffect(() => {
    const fetchSlot = async () => {
      try {
        const { data } = await axios.get(backendUrl + `/api/slots/${state.slotId}`);
        setSlot(data);
      } catch (err) {
        console.error('Error fetching slot:', err);
      }
    };
    fetchSlot();
  }, [state.slotId]);


  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) 
      return;

    setLoading(true);

    try {

      if (!user) {
        toast.error("Please log in to proceed with the payment.");
        navigate("/login");
        scrollTo(0,0);
        return;
      }
      
      const { data: clientSecretData } = await axios.post(backendUrl + '/api/payment/create-payment-intent', {
        amount: totalPrice * 100,
        metadata: {
          slotId, date, startTime, endTime, duration, userId: user._id
        }
      });

      const result = await stripe.confirmCardPayment(clientSecretData.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.name,
            email: user.email,
          }
        }
      });

      if (result.error) {
        toast.error(result.error.message)
      } else {

        const {data} = await axios.post(backendUrl + '/api/availability/check', {
          slotId,
          date,
          startTime,
          endTime
        });

        if (!data.available) {
          toast.error("All slots are already booked for the selected time range. Please choose another time.");
          return;
        }

        if (result.paymentIntent.status === "succeeded" && data.available) {

          const {data} = await axios.post(backendUrl + '/api/bookings/create', {
            slotId,
            date,
            startTime,
            endTime,
            duration,
            totalPrice,
            paymentIntentId: result.paymentIntent.id,
          })

          if (data.success) {
            navigate('/dashboard/user/active-booking')
            scrollTo(0, 0)
            toast.success(data.message)
          } else {
              toast.error(data.message)
          }       
        }
      }
      
    } catch (error) {
        toast.error("Payment failed", error.message)
    } finally{
        setLoading(false);
    }
  }


  return (
    <div className='flex flex-col'>
      <Navbar />

      <div className='pt-24 pb-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <button onClick={() => {navigate(-1); scrollTo(0, 0)}} className='flex gap-2 items-center text-sm text-gray-600 py-1.5 px-3 rounded hover:bg-indigo-100 transition-all duration-300 mb-8'>
            <ArrowLeft className='w-4 h-4' />
            <span>Back to booking</span>
          </button>

          <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
            <div className='p-6 shadow-md rounded-md border h-fit'>
              <h3 className='text-xl md:text-2xl leading-none font-semibold text-indigo-500 mb-3'>
                Booking Summary
              </h3>

              <hr className='mb-4'/>

              <div className='mb-6'>
                <h3 className='text-lg md:text-xl leading-none font-semibold text-gray-700'>
                  {slotInfo.location}
                </h3>
                <p className='text-gray-600 font-medium mb-4'>
                  {slotInfo.address}
                </p>

                <img src={slotInfo.images} className='w-full h-36 md:h-48 object-cover object-center rounded mb-3' alt={slotInfo.location} />

                <p className='text-gray-500 text-sm'>{slotInfo.description}</p>
              </div>

              <div className='flex items-center mb-4 gap-2'>
                <div className='flex items-center gap-2 text-indigo-600 w-full text-sm md:text-base'>
                  <Calendar className='w-5 h-5' />
                  <p>{date}</p>
                </div>
                <div className='flex items-center gap-2 text-indigo-600 w-full text-sm md:text-base'>
                  <Clock className='w-5 h-5' />
                  <p>{startTime} - {endTime}</p>
                </div>
              </div>

              <hr className='mb-4'/>

              <div className='mb-4'>
                <div className='flex justify-between items-center text-gray-600 mb-1'>
                  <span className='text-indigo-500 font-medium'>Duration:</span>
                  <span>{duration ? `${(duration).toFixed(2)} hour(s)` : "-"}</span>
                </div>

                <div className='flex justify-between items-center text-gray-600'>
                  <span className='text-indigo-500 font-medium'>Rate:</span>
                  <span>LKR. {slotInfo.pricePerHour}/hour</span>
                </div>
              </div>

              <hr className='mb-4'/>

              <div className='flex justify-between items-center font-bold text-gray-800 text-lg tracking-wide'>
                <span>Total</span>
                <span className='text-green-500'>LKR. {totalPrice ? totalPrice.toFixed(2) : '0.00'}</span>
              </div>
            </div>

            <form onSubmit={handlePayment} className='border bg-gradient-to-tr from-slate-50 to-indigo-200 p-6 shadow-lg h-fit rounded-md'>
              <label className="block mb-2 text-xl text-gray-800 font-semibold">
                Card Information:
              </label>
              <div className="p-3 border rounded mb-4">
                <CardElement options={{ hidePostalCode: true }} />
              </div>

              <button type="submit" disabled={!stripe || loading} className="flex items-center justify-center gap-3 w-full bg-indigo-500 text-white font-medium tracking-wide py-2.5 rounded-md shadow hover:bg-indigo-400 transition-all duration-300" >
                <CreditCard className='w-6 h-6'/>
                <span>{loading ? 'Processing...' : 'Pay Now'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Payment;