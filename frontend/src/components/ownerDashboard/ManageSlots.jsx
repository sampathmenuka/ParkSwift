import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios'
import { Locate } from 'lucide-react'


const ManageSlots = () => {

  const {backendUrl} = useContext(AuthContext)

  const [slots, setSlots] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editSlot, setEditSlot] = useState(null)

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    location: '',
    address: '',
    pricePerHour: '',
    totalSlots: '',
    description: '',
    latitude: '',
    longitude: '',
    images: null,
    vehicleTypeAllowed: '',
    slotType: '', // Covered or Uncovered
    availableFrom: '', // e.g., "08:00"
    availableTo: ''  // e.g., "08:00" 
  })


  // get slot details 
  const getSlots = async () => {

    setLoading(true)

    try {

      const {data} = await axios.get(backendUrl + '/api/owner/slots')

      if (data.success) {
        setSlots(data.slots)
      } else {
          toast.error(data.message)
      }

      setLoading(false);
      
    } catch (error) {
        toast.error(error.message)
    }
  }

  useEffect(() => {
    getSlots();
  }, [])


  // edit slots
  const handleEditClick = (slot) => {
    setEditSlot(slot);
    setFormData({
      location: slot.location || '',
      address: slot.address || '',
      pricePerHour: slot.pricePerHour || '',
      totalSlots: slot.totalSlots || '',
      description: slot.description || '',
      latitude: slot.latitude || '',
      longitude: slot.longitude || '',
      images: slot.images || null,
      vehicleTypeAllowed: slot.vehicleTypeAllowed || '',
      slotType: slot.slotType || '',
      availableFrom: slot.availableFrom || '',
      availableTo: slot.availableTo || ''
    });
    setShowForm(true);
  }


  // delete slot
  const deleteSlot = async (slotId) => {

    if (!window.confirm("Are you sure you want to delete this slot?")) {
      return
    }

    try {

      const {data} = await axios.delete(backendUrl + `/api/owner/slot/${slotId}`)

      if (data.success) {
        getSlots()
        toast.success(data.message)
      }
    } catch (error) {
        toast.error(error.message)
    }
  }


  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    try {

      const formPayload = new FormData()

      for (const key in formData) {
        if (key === 'images') {
          if (formData.images) {
            formPayload.append('images', formData.images)
          } 
        } else{
            formPayload.append(key, formData[key])
        }      
      }
      
      if (editSlot) {
        const {data} = await axios.put(backendUrl + `/api/owner/slot/${editSlot._id}`, formPayload, { 
          headers: { 'Content-Type': 'multipart/form-data' }
         }
        )

        if (data.success) {
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
      } else {
          const {data} = await axios.post(backendUrl + '/api/owner/slot', formPayload, {
          headers: { 'Content-Type': 'multipart/form-data' } })

          if (data.success) {
            toast.success(data.message)
          } else {
            toast.error(data.message)
          }
        }

      getSlots();
      setShowForm(false);
      setEditSlot(null);
      setFormData({ location: '', address: '', pricePerHour: '' ,totalSlots: '', description: '', latitude: '', longitude: '', images: null, vehicleTypeAllowed: '', slotType: '', availableFrom: '', availableTo: '' })

      setLoading(false);
      scrollTo(0,0);

    } catch (error) {
        toast.error(error.message)
    }
  }


  return (
    <div>
      <div className='w-full flex justify-between items-center mb-6'>
        <h2 className='text-lg md:text-2xl font-semibold text-gray-700'>
          Your Parking Slots
        </h2>
        <button onClick={() => { scrollTo(0,0); setEditSlot(null); setFormData({ location: '', address: '', pricePerHour: '',totalSlots: '', description: '', latitude: null, longitude: '', images: '', vehicleTypeAllowed: '', slotType: '', availableFrom: '', availableTo: '' }); setShowForm(true)} } className={`text-xs md:text-lg py-2 px-3 bg-indigo-500 rounded-md text-white hover:bg-indigo-400 transition-all duration-300` }>
          + Add new slot
        </button>
      </div>

      {
        loading ? (
          <div className="flex flex-col items-center justify-center h-48">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-blue-500 font-medium">Loading...</p>
          </div>
        ) : (
          !showForm && (
            slots.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-600 mb-3 font-light text-lg'>
              You don't have any parking slots yet.
            </p>
            <p className="text-lg text-gray-400 mt-2">Add your first parking slot using the button above.</p>
          </div>
          ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
          {
            slots.map((slot) => (
              <div key={slot._id} className='bg-white overflow-hidden rounded-lg shadow border'>
                <div className="h-48 overflow-hidden">
                  <img src={slot.images} alt={slot.location} className='w-full h-full object-cover object-center' />
                </div>

                <div className='p-4'>
                  <div className='w-full flex justify-between items-center'>
                    <p className='font-semibold text-gray-800 text-lg'>
                      {slot.location}
                    </p>
                    <p className={`text-xs px-2 py-1 rounded-full ${slot.slotType === 'Covered' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'} `}>
                      {slot.slotType === 'Covered' ? 'Covered' : 'UnCovered'}
                    </p>
                  </div>

                  <div className='flex items-center gap-2 text-gray-600 mb-3'>
                    <Locate className='w-4 h-4'/>
                    <p className='text-sm'>{slot.address}</p>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 mt-4'>
                    <div>
                      <p className="text-sm">Capacity: {slot.totalSlots} vehicle(s)</p>
                      <p className="text-sm">Hours: {slot.availableFrom} - {slot.availableTo}</p>
                    </div>

                    <div>
                      <p className="text-sm">Vehicle: {slot.vehicleTypeAllowed}</p>
                      <p className="text-sm text-indigo-500 font-medium">Rate: LKR. {slot.pricePerHour}/hr</p>
                    </div>
                  </div>
                </div>

                <hr className='border-1 border-gray-300' />

                <div className='p-4 flex justify-end gap-2'>
                  <button onClick={() => {handleEditClick(slot); scrollTo(0,0); }} className='bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-all duration-300'>
                    Edit
                  </button>
                  <button onClick={() => deleteSlot(slot._id)} className='bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-all duration-300'>
                    Delete
                  </button>
                </div>
              </div>
            ))
          }
          </div>
        )))}

      

      {/* Showing form  */}
      {
        showForm && (
          <div className='w-full p-6 rounded-md border shadow'>
            <h2 className='text-2xl text-gray-700 font-semibold mb-6'>
              {editSlot ? 'Edit Parking Slot' : 'Add New Parking Slot'}
            </h2>

            <form onSubmit={handleSubmit} encType='multipart/form-data'>
              
              <div className='mb-4'>
                <label className='text-sm font-md font-medium'>
                  Slot Name
                </label>
                <input className='py-2 px-3 rounded-md border w-full mt-1 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder='Downtown Garage Slot A' required />
              </div>

              <div className='mb-4'>
                <label className='text-sm font-md font-medium'>
                  Address
                </label>
                <input className='py-2 px-3 rounded-md border w-full mt-1 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder='123 Main St, city' required />
              </div>

              <div className='mb-4'>
                <label className='text-sm font-md font-medium'>
                  Description
                </label>
                <input className='py-2 px-3 rounded-md border w-full mt-1 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className='mb-4'>
                <label className='text-sm font-md font-medium'>
                  Upload Image
                </label>
                <input name="image" type="file" onChange={e => setFormData({ ...formData, images: e.target.files[0] })} className='block w-full text-sm text-gray-600 mt-2' />
              </div>

              <div className='mb-4 grid md:grid-cols-2 gap-3'>
                <div>
                  <label className='text-sm font-md font-medium'>
                    Latitude
                  </label>
                  <input className='py-2 px-3 rounded-md border w-full mt-1 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="number" value={formData.latitude} onChange={e => setFormData({...formData, latitude: e.target.value})} placeholder='4.523' required />
                </div>
                <div>
                  <label className='text-sm font-md font-medium'>
                    Longitude
                  </label>
                  <input className='py-2 px-3 rounded-md border w-full mt-1 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="number" value={formData.longitude} onChange={e => setFormData({...formData, longitude: e.target.value})} placeholder='4.523' required />
                </div>
              </div>

              <div className='mb-4 grid md:grid-cols-2 gap-3'>
                <div>
                  <label className='text-sm font-md font-medium'>
                    Capacity
                  </label>
                  <input className='py-2 px-3 rounded-md border w-full mt-1 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="number" value={formData.totalSlots} onChange={e => setFormData({...formData, totalSlots: e.target.value})} placeholder='1' required />
                </div>
                <div>
                  <label className='text-sm font-md font-medium'>
                    Slot Type
                  </label>
                  <select className='py-2 px-3 rounded-md border w-full mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' value={formData.slotType} onChange={e => setFormData({...formData, slotType: e.target.value})} required>
                    <option value="Covered">Covered</option>
                    <option value="Uncovered">Uncovered</option>
                  </select>
                </div>
              </div>

              <div className='mb-4 grid md:grid-cols-2 gap-3'>
                <div>
                  <label className='text-sm font-md font-medium'>
                    Available From
                  </label>
                  <input className='py-2 px-3 rounded-md border w-full mt-1 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="time" value={formData.availableFrom} onChange={e => setFormData({...formData, availableFrom: e.target.value})} placeholder='10:00 AM' required />
                </div>
                <div>
                  <label className='text-sm font-md font-medium'>
                    Available To
                  </label>
                  <input className='py-2 px-3 rounded-md border w-full mt-1 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="time" value={formData.availableTo} onChange={e => setFormData({...formData, availableTo: e.target.value})} placeholder='08:00 PM' required />
                </div>
              </div>

              <div className='mb-4'>
                <label className='text-sm font-md font-medium'>
                  Hourly Rate (LKR)
                </label>
                <input className='py-2 px-3 rounded-md border w-full mt-1 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="number" value={formData.pricePerHour} onChange={e => setFormData({...formData, pricePerHour: e.target.value})} placeholder='150' required />
              </div>

              <div className='mb-4'>
                <label className='text-sm font-md font-medium'>
                  Vehicle Type Allowed
                </label>
                <select className='py-2 px-3 rounded-md border w-full mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' value={formData.vehicleTypeAllowed} onChange={e => setFormData({...formData, vehicleTypeAllowed: e.target.value})} required>
                  <option value="Car">Car</option>
                  <option value="Motorbike">Motorbike</option>
                  <option value="Van">Van</option>
                </select>
              </div>

              <div className='flex justify-end mb-4 gap-3'>
                <button type='button' onClick={() => { setShowForm(false); setEditSlot(null); scrollTo(0,0) }} className='bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 transition-all duration-300'>
                  Cancel
                </button>

                <button type='submit' className='bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition-all duration-300'>
                  { editSlot ? "Update" : "Add Slot" }
                </button>
              </div>
              
            </form>
          </div>
        )
      }

    </div>
  )
}

export default ManageSlots
