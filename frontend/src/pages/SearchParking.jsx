import { useEffect, useState, useContext } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { AuthContext } from '../contexts/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Calendar, Clock, Filter, List, Star } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'


const SearchParking = () => {

  const {backendUrl} = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const [slots, setSlots] = useState([]);

  const [filters, setFilters] = useState({
    location: '',
    startTime: '',
    endTime: '',
    date: '',
    slotType: '',
    vehicleTypeAllowed: '',
    minPrice: '',
    maxPrice: '',
    available: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

 
  const fetchSlots = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, val]) => {
        if (
          val !== "" &&
          val !== false &&
          val !== null &&
          val !== undefined
        ) {
          params.append(key, val);
        }
      });

      const {data} = await axios.get(backendUrl + `/api/slots/?${params.toString()}`);

      if (data.success) {
        setSlots(data.slots);
        scrollTo(0, 0);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
        console.log(error)
        toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetHandler = async () => {
    setFilters({
      location: '',
      startTime: '',
      endTime: '',
      slotType: '',
      date: '',
      minPrice: '',
      maxPrice: '',
      available: false,
    })

    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + `/api/slots/`);

      if (data.success) {
        setSlots(data.slots);
        scrollTo(0, 0);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  }

 
  const fetchSlotsFromParams = async (filterValues) => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      Object.entries(filterValues).forEach(([key, val]) => {
        if (
          val !== "" &&
          val !== false &&
          val !== null &&
          val !== undefined
        ) {
          params.append(key, val);
        }
      });

      const {data} = await axios.get(backendUrl + `/api/slots/?${params.toString()}`);

      if (data.success) {
        setSlots(data.slots);
        scrollTo(0, 0);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
        console.log(error)
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  };


  useEffect(() => {

    async function fetchData() {
      try {
        setLoading(true);

        const { data } = await axios.get(backendUrl + `/api/slots/`);

        if (data.success) {
          setSlots(data.slots);
          scrollTo(0, 0);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
          console.log(error);
          toast.error(error.message);
      } finally {
          setLoading(false);
      }
    }    

    fetchData();  
  }, [])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchFilters = {
      location: searchParams.get('location') || '',
      date: searchParams.get('date') || '',
      startTime: searchParams.get('startTime') || '',
      endTime: searchParams.get('endTime') || '',
    };
    
    // Set filters and fetch slots
    setFilters(prev => ({ ...prev, ...searchFilters }));
    fetchSlotsFromParams(searchFilters); // You’ll need to write this function
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />

      
      <div className='pt-24 pb-16' >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between mb-8'>
            <h1 className='text-2xl sm:text-3xl font-semibold text-gray-800'>
              Search Parking Spaces
            </h1>
            <p className='flex items-center gap-2 px-4 py-1.5 bg-indigo-500 rounded font-semibold'>
              <List className='h-3 w-3 sm:h-5 sm:w-5 text-gray-200' />
              <span className='text-sm md:text-lg text-gray-200 tracking-wider'>List</span>
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>

            {/* filters  */}
            <div className='lg:col-span-1'>
              <div className='border rounded-md shadow p-4'>
                <p className='flex items-center gap-2 text-gray-800 mb-4'>
                  <Filter className='h-5 w-5' />
                  <span className='text-xl tracking-wider font-bold'>Filters</span>
                </p>

                <form onSubmit={fetchSlots}>
                  <div className='mb-2'>
                    <label className='text-sm font-medium text-gray-700'>
                      Location
                    </label>
                    <input type="text" name="location" placeholder="Location" value={filters.location} onChange={handleChange} className='py-2 px-3 rounded-md border w-full mt-1 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' />
                  </div>

                  <div className='mb-2'>
                    <label className='text-sm font-medium text-gray-700'>
                      Date
                    </label>
                    <input type="date" name="date" value={filters.date} onChange={handleChange} className='py-2 px-3 rounded-md border w-full mt-1 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' />
                  </div>

                  <div className='flex items-center w-full gap-2 mb-2'>
                    <div className='w-full'>
                      <label className='text-sm font-medium text-gray-700'>
                        Start Time
                      </label>
                      <input type="time" name="startTime" value={filters.startTime} onChange={handleChange} className='py-2 pl-1 rounded-md border w-full mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' />
                    </div>

                    <div className='w-full'>
                      <label className='text-sm font-medium text-gray-700'>
                        End Time
                      </label>
                      <input type="time" name="endTime" value={filters.endTime} onChange={handleChange} className='py-2 pl-1 rounded-md border w-full mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' />
                    </div>
                  </div>

                  <div className='flex items-center w-full gap-2 mb-2'>
                    <div className='w-full'>
                      <label className='text-sm font-medium text-gray-700'>
                        Min Price (LKR)
                      </label>
                      <input type="number" name="minPrice" placeholder="Min. Price" value={filters.minPrice} onChange={handleChange} className='py-2 px-3 rounded-md border w-full mt-1 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' />
                    </div>

                    <div className='w-full'>
                      <label className='text-sm font-medium text-gray-700'>
                        Max Price (LKR)
                      </label>
                      <input type="number" name="maxPrice" placeholder="Max. Price" value={filters.maxPrice} onChange={handleChange} className='py-2 px-3 rounded-md border w-full mt-1 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' />
                    </div>
                  </div>

                  <div className='w-full mb-3'>
                    <label className='text-sm font-medium text-gray-700'>
                      Slot Type
                    </label>
                    <select name="slotType" value={filters.slotType} onChange={handleChange} className='py-2 px-3 rounded-md border w-full mt-1 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' >
                      <option value="">All</option>
                      <option value="Covered">Covered</option>
                      <option value="Uncovered">Un Covered</option>
                    </select>
                  </div>

                  <label className='flex items-center gap-2'>
                    <input type="checkbox" name="available" checked={filters.available} onChange={handleChange} />
                      <span>Only show available</span>
                  </label>


                  <button type="submit" className='w-full py-2 bg-indigo-500 rounded-md mt-3 text-white font-medium hover:bg-indigo-400 transition-all duration-300' disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                  </button>

                  <button type="button" className='w-full py-2 bg-red-500 rounded-md mt-2 text-white font-medium hover:bg-red-400 transition-all duration-300' onClick={resetHandler}>
                    Reset
                  </button>

                </form>
              </div>
            </div>


            {/* slot results  */}
            {
              loading ? (
                <p>Loading......</p>
              ) : slots.length === 0 ? (
                  <p className='text-gray-600 font-semibold tracking-wider text-lg'>
                    No parking slots found.
                  </p>
                ) : (
                  <div className='lg:col-span-3'>
                    <div className='text-gray-500 text-sm mb-4'>
                      {`Found ${slots.length} parking spots near you`}
                    </div>
                    {
                      slots.map((slot) => (
                        <div key={slot._id} className='overflow-hidden'>
                          <div className='grid grid-cols-1 md:grid-cols-3 border border-gray-300 mb-3 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300'>

                            <div className='md:col-span-1 overflow-hidden'>
                              <img src={slot.images} alt={slot.location} className='w-full object-cover object-center hover:scale-x-105 transition-all duration-300 md:h-48' />
                            </div>

                            <div className='md:col-span-2 p-4'>
                              <div className='mb-6'>
                                <div className='flex justify-between items-start'>
                                  <div>
                                    <h2 className='text-gray-700 text-base md:text-xl font-semibold'>{slot.location}</h2>
                                    <p className="text-sm text-gray-500">
                                      {slot.address}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-base md:text-xl font-bold text-indigo-600">
                                      LKR. {slot.pricePerHour}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      per hour
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <div className='flex items-center flex-wrap gap-2 justify-start'>
                                  <p className='text-sm py-1 px-3 bg-indigo-200 rounded-md text-indigo-600 font-medium'>
                                    {slot.slotType}
                                  </p>
                                  <p className='text-sm py-1 px-3 bg-indigo-200 rounded-md text-indigo-600 font-medium'>
                                    24/7
                                  </p>
                                  <p className='text-sm py-1 px-3 bg-indigo-200 rounded-md text-indigo-600 font-medium'>
                                    Security
                                  </p>
                                  <p className={`text-sm py-1 px-2 rounded-md font-medium ${slot.available === true ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"}`}>
                                    {slot.available ? "Available" : "Not Available"}
                                  </p>      
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm mt-4 text-indigo-600">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2" />
                                    <span className='font-medium'>
                                      {slot.availableFrom} - {slot.availableTo}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span className='font-medium'>{slot.date ? moment(new Date(slot.date).toLocaleDateString('en-CA')).format('MMM DD, YYYY') : "Book Today"}</span>
                                  </div>
                                </div>

                                <div className='mt-2 text-sm text-purple-600 font-semibold'>
                                  <p>Available Slots: {slot.totalSlots}</p>
                                </div>


                                <div className="flex justify-between items-center mt-2">
                                  <div className="flex items-center">
                                    <div className="text-amber-600 font-medium flex items-center gap-1">
                                      <Star className='w-4 h-4'/>
                                      <span>{slot.rating}</span>
                                    </div>
                                    <div className="text-sm text-gray-500 ml-1">
                                      ({slot.totalReviews} reviews)
                                    </div>
                                  </div>      
                                </div>
                              </div>

                              <div className='flex justify-end border-t pt-4 w-full mt-2'>
                                <button className={`py-2 w-1/2 text-white rounded bg-indigo-500 hover:bg-indigo-400 transition-all duration-300 ${!slot.available ? "cursor-not-allowed" : ""}`} disabled={!slot.available} onClick={() => {navigate(`/booking/${slot._id}`); scrollTo(0, 0)}}>
                                  Reserve Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )
            }
            
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SearchParking;