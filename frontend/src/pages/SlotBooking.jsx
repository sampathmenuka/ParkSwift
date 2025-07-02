import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CreditCard, Star } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import moment from 'moment';

const SlotBooking = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const {backendUrl, user} = useContext(AuthContext);

  const [slot, setSlot] = useState({})

  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: ''
  })

  const [duration, setDuration] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [loading, setLoading] = useState(false)

  // getting a slot details from search parking 
  const getSlot = async () => {
    setLoading(true)

    try {
      const { data } = await axios.get(backendUrl + `/api/slots/${id}`);

      if (data.success) {
        console.log(data.slot)
        setSlot(data.slot)
      } else {
          toast.error(data.message)
      }

      setLoading(false)
    } catch (error) {
        toast.error(error.message)
    }
  }

  const handleBooking = async () => {

    if (!user) {
      navigate('/login')
      return 
    }

    try {
      const { date, startTime, endTime } = formData;

      if (!date || !startTime || !endTime) 
        return toast.error('All fields are required.');

      if (new Date(date).toISOString().split('T')[0] !== new Date(slot.date).toISOString().split('T')[0]) 
        return toast.error('You can only book on the available date.');

      if (new Date(slot.date).getDate() < new Date().getDate()) 
        return toast.error("can't book a solt. because of the expired");

      if (startTime < slot.availableFrom || endTime > slot.availableTo) {
        return toast.error(`Slot is only available between ${slot.availableFrom} and ${slot.availableTo}`);
      }

      if (startTime >= endTime) {
        return toast.error('End time must be after start time');
      }

      navigate('/payment', {
        state: {
          slotId: id,
          slotInfo: slot,
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime,
          duration,
          totalPrice,
        }
      });

      scrollTo(0, 0);

    } catch (error) {
        toast.error(error.message)
    }   
  }


  useEffect(() => {
    getSlot();
  }, [id])

  useEffect(() => {
    const { startTime, endTime } = formData;

    if (startTime && endTime) {
      const start = dayjs(new Date(formData.date).toISOString().split('T')[0] + "T" + `${startTime}`);
      const end = dayjs(new Date(formData.date).toISOString().split('T')[0] + "T" + `${endTime}`);

      const diffInHours = end.diff(start, 'minute') / 60;

      if (diffInHours < 0.5) {
        toast.error('Booking must be at least 30 minutes long');

        setDuration(0)
        setTotalPrice(0)
        return 
      } 

      setDuration(diffInHours);
      setTotalPrice((diffInHours * slot.pricePerHour));
    }
    
  }, [formData.startTime, formData.endTime]);


  if (loading) {
    return (
      <p className='min-h-screen flex items-center justify-center font-medium text-xl'>
        Loading....
      </p>
    )
  }

  return (
    <div className='flex flex-col'>
      <Navbar />

      <div className='pt-24 pb-16'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <button onClick={() => {navigate(-1); scrollTo(0, 0)}} className='flex gap-2 items-center text-sm text-gray-600 py-1.5 px-3 rounded hover:bg-indigo-100 transition-all duration-300 mb-8'>
            <ArrowLeft className='w-4 h-4' />
            <span>Back to Search</span>
          </button>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

            {/* slot details  */}
            <div className='p-6 border shadow-md bg-gray-50 rounded-md h-fit'>
              <h3 className='text-xl md:text-2xl leading-none font-semibold text-gray-700 mb-4'>
                {slot.location}
              </h3>
              <img src={slot.images} className='w-full h-48 object-cover object-center rounded mb-3' alt={slot.location} />

              <p className='text-gray-600 font-medium mb-2'>
                {slot.address}
              </p>

              <div className='mb-1'>
                <p className='font-medium text-gray-800'>Description:</p>
                <p className='text-gray-500 text-sm'>{slot.description}</p> 
              </div>

              <div className="flex items-center mt-4 mb-2">
                <div className="text-yellow-400 font-medium flex items-center gap-1">
                  <Star className='w-4 h-4' fill={"currentColor"}/>
                  <span>{slot.rating}</span>
                </div>
                <div className="text-sm text-gray-500 ml-1">
                  ({slot.totalReviews} reviews)
                </div>
              </div>

              <p className='font-medium text-indigo-600 mb-2 flex justify-between items-center'>
                <span>Vehicle Allowed: <span className='text-gray-600'>{slot.vehicleTypeAllowed}</span></span>
                <span className='font-medium text-green-500'>Date: {moment(slot.date).format("MMM D, YYYY")}</span>
              </p>  

              <p className='font-medium text-gray-800 mb-1'>Features:</p>  
              <div className='flex items-start flex-wrap gap-2 mb-6'>
                <p className='py-1 px-2 text-sm bg-indigo-100 text-indigo-600 rounded-full'>{slot.slotType}</p>
                <p className='py-1 px-2 text-sm bg-indigo-100 text-indigo-600 rounded-full'>Security</p>
                <p className='py-1 px-2 text-sm bg-indigo-100 text-indigo-600 rounded-full'>24/7</p>
              </div>

              <hr className='mb-2'/>

              <div className='text-base md:text-lg font-bold text-indigo-500 text-right'>
                LKR. {slot.pricePerHour}
                <span className='text-sm font-normal text-gray-500 ml-1'>per hour</span>
              </div>
            </div>

            {/* booking a slot  */}
            <div className='flex flex-col gap-4'>
              <div className='p-6 border shadow rounded'>
                <h3 className='text-xl md:text-2xl leading-none font-semibold text-gray-800 tracking-wide mb-6'>
                  Booking Details
                </h3>

                <div>
                  <div className='mb-3'>
                    <label className='font-medium text-gray-700'>
                      Date
                    </label>
                    <input type="date" value={formData.date} onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value}))} className='py-2 px-3 rounded-md border w-full mt-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' />
                  </div>

                  <div className='flex items-center w-full gap-2 mb-3'>
                    <div className='w-full'>
                      <label className='font-medium text-gray-700'>
                        Start Time
                      </label>
                      <input type="time" value={formData.startTime} onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value}))} className='py-2 pl-1 rounded-md border w-full mt-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' />
                    </div>

                    <div className='w-full'>
                      <label className='font-medium text-gray-700'>
                        End Time
                      </label>
                      <input type="time" value={formData.endTime} onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value}))} className='py-2 pl-1 rounded-md border w-full mt-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' />
                    </div>
                  </div>
                </div>

                <div className='my-6'>
                  <div className='flex justify-between items-center text-gray-600 mb-2'>
                    <span className='text-indigo-500 font-medium'>Duration:</span>
                    <span>{duration ? `${(duration).toFixed(2)} hour(s)` : "-"}</span>
                  </div>

                  <div className='flex justify-between items-center text-gray-600'>
                    <span className='text-indigo-500 font-medium'>Rate:</span>
                    <span>LKR. {slot.pricePerHour}/hour</span>
                  </div>
                </div>

                <hr className='mb-3'/>

                <div className='flex justify-between items-center font-bold text-gray-800 text-lg tracking-wide mb-4'>
                  <span>Total</span>
                  <span>LKR. {totalPrice ? totalPrice.toFixed(2) : '0.00'}</span>
                </div>

                <button className='bg-indigo-500 flex justify-center items-center w-full gap-2 py-2 rounded-md text-white tracking-wide hover:bg-indigo-400 transition-all duration-300' disabled={!duration || duration < 0.5} onClick={handleBooking}>
                  <CreditCard className='w-5 h-5' />
                  <span>Book and Pay Now</span>
                </button>
              </div>



              <div className='p-6 shadow rounded bg-indigo-50'>
                <div>
                  <p className='font-semibold text-indigo-600 mb-2'>Booking Policy:</p>
                  <p className='text-gray-600 text-sm font-medium mb-1 tracking-wide'>Free cancellation up to 1 hour before booking time</p>
                  <p className='text-gray-600 text-sm font-medium mb-1 tracking-wide'>Arrive on time - your space is guaranteed for the duration</p>
                  <p className='text-gray-600 text-sm font-medium mb-1 tracking-wide'>Payment is processed securely after booking is confirmed</p>
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

export default SlotBooking