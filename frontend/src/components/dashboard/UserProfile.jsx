import React, { useContext, useEffect, useState } from 'react'
import {AuthContext} from '../../contexts/AuthContext'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const UserProfile = () => {

  const {backendUrl, getAuthState} = useContext(AuthContext) 

  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleType: '',
    licensePlate: ''
  });

  const [editingInfo, setEditingInfo] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(false)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [confirm, setConfirm] = useState(false);

  const getProfile = async () => {

    try {

      const {data} = await axios.get(backendUrl + '/api/user/profile')

      if (data.success) {
        setUser(data.user);
      } else{
        toast.error(data.message);
      }
      
    } catch (error) {
        toast.error(error.message)
    }
  }

  const handleProfileUpdate = async () => {
    try {

      const {data} = await axios.put(backendUrl + '/api/user/profile', user)

      if (data.success) {
        setEditingInfo(false)
        toast.success(data.message)  
        setTimeout(() => {
          window.location.reload(); 
        }, 1500)
         
      } else{
        toast.error(data.message)
      }
      
    } catch (error) {
        toast.error(error.message)
    }
  }

  const handleVehicleUpdate = async () => {
    try {

      const {data} = await axios.put(backendUrl + '/api/user/profile', user)

      if (data.success) {
        setEditingVehicle(false)
        toast.success(data.message)  
        setTimeout(() => {
          window.location.reload(); 
        }, 1500)  
      } else{
        toast.error(data.message)
      }

      
    } catch (error) {
        toast.error(error.message)
    }
  }


  const handlePasswordChange = async () => {

    try {

      const {data} = await axios.put(backendUrl + '/api/user/change-password', {oldPassword, newPassword})

      if (data.success) {
        setOldPassword('')
        setNewPassword('')
        toast.success(data.message)
        setTimeout(() => {
          window.location.reload(); 
        }, 1500)
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
        toast.error(error.message)
    }
  }

  const handleDelete = async () => {

    try {

      const {data} = await axios.delete(backendUrl + '/api/user/delete-account');

      if (data.success) {
        navigate('/')
        setTimeout(() => {
          window.location.reload()
        }, 1500)
        toast.success(data.message)
      } else{
        toast.error(data.message)
      }
      
    } catch (error) {
        toast.error(error.message)
    }
  }


  useEffect(() => {
    getProfile();
  }, [])


  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        Profile Information
      </h2>


      {/* update user profile information */}
      <div className='shadow p-4 rounded bg-indigo-50 mb-4 border'>
        <div className='mb-6'>
          <h2 className='text-lg sm:text-2xl font-semibold tracking-wide text-indigo-500'>Personal Information</h2>
          <p className='text-sm sm:text-base text-gray-600 font-light'>Update your personal details</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
          <div>
            <label className='text-sm sm:text-base font-medium text-gray-700'>Full Name</label>
            <input type="text" value={user.name} onChange={e => setUser({...user, name: e.target.value})} disabled={!editingInfo} className='py-2 px-3 rounded-md bg-white w-full mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' required />
          </div>
          <div>
            <label className='text-sm sm:text-base font-medium text-gray-700'>Email</label>
            <input type="email" value={user.email} disabled className='py-2 px-3 rounded-md bg-white w-full mt-1 text-gray-800' />
          </div>
          <div>
            <label className='text-sm sm:text-base font-medium text-gray-700'>Phone</label>
            <input type="text" value={user.phone} name='phone' onChange={e => setUser({...user, phone: e.target.value})} disabled={!editingInfo} required className='py-2 px-3 rounded-md bg-white w-full mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' />
          </div>
        </div>

        <button type='button' className='font-medium py-2 px-4 bg-indigo-500 text-white transition-all duration-300 hover:bg-indigo-600 rounded' onClick={() => (editingInfo ? handleProfileUpdate() : setEditingInfo(true)) }>
          {editingInfo ? 'Save Changes' : 'Edit Information'}
        </button>

      </div>


      {/* update vehicle information  */}
      <div className='shadow p-4 rounded bg-indigo-50 mb-4 border'>
        <div className='mb-6'>
          <h2 className='text-lg sm:text-2xl font-semibold tracking-wide text-indigo-500'>Vehicle Information</h2>
          <p className='text-sm sm:text-base text-gray-600 font-light'>Your registered vehicle details</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
          <div>
            <label className='text-sm sm:text-base font-medium text-gray-700'>Vehicle</label>
            <input type="text" required value={user.vehicleType} onChange={e => setUser({...user, vehicleType: e.target.value})} disabled={!editingVehicle} className='py-2 px-3 rounded-md bg-white w-full mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' />
          </div>
          
          <div>
            <label className='text-sm sm:text-base font-medium text-gray-700'>License Plate</label>
            <input type="text" required value={user.licensePlate} onChange={e => setUser({...user, licensePlate: e.target.value})} disabled={!editingVehicle} className='py-2 px-3 rounded-md bg-white w-full mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' />
          </div>
        </div>

        <button className='font-medium py-2 px-4 bg-indigo-500 text-white transition-all duration-300 hover:bg-indigo-600 rounded' onClick={() => (editingVehicle ? handleVehicleUpdate() : setEditingVehicle(true)) }>
          {editingVehicle ? 'Save Changes' : 'Edit Vehicle'}
        </button>
      </div>


      {/* change password  */}
      <div className='shadow p-4 rounded bg-indigo-50 mb-4 border'>
        <div className='mb-6'>
          <h2 className='text-lg sm:text-2xl font-semibold tracking-wide text-indigo-500'>Password & Security</h2>
          <p className='text-sm sm:text-base text-gray-600 font-light'>Manage your password and security settings. For security purposes, your password is hidden.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
          <div>
            <label className='text-sm sm:text-base font-medium text-gray-700'>Old Password</label>
            <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required className='py-2 px-3 rounded-md bg-white w-full mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' />
          </div>
          
          <div>
            <label className='text-sm sm:text-base font-medium text-gray-700'>Your New Password</label>
            <input type="password" value={newPassword} onChange={ e => setNewPassword(e.target.value) } required className='py-2 px-3 rounded-md bg-white w-full mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400' />
          </div>
        </div> 

        <button className='font-medium py-2 px-4 bg-indigo-500 text-white transition-all duration-300 hover:bg-indigo-600 rounded' onClick={handlePasswordChange}>
          Change Password
        </button>
      </div>


      {/* delete account  */}
      <div className='shadow p-4 rounded bg-gray-100 mb-4 border'>
        <div className='mb-6'>
          <h2 className='text-lg sm:text-2xl font-semibold tracking-wide text-indigo-500'>Danger Zone</h2>
          <p className='text-sm sm:text-base text-gray-600 font-light'>Delete your account</p>
        </div>

        {
          !confirm ? (
            <button type='button' className='font-medium py-2 px-4 bg-red-600 text-white transition-all duration-300 hover:bg-red-500 rounded' onClick={() => setConfirm(true) }>
              Delete My Account
            </button>
          ) : (
            <div>
              <p className='text-red-700 mb-3'>Are you sure? This action can not be undone</p>
              <div className='flex gap-3'>
                <button type='button' className='font-medium py-2 px-4 bg-red-600 text-white transition-all duration-300 hover:bg-red-700 rounded' onClick={() => {handleDelete(); scrollTo(0, 0)} }>
                  Yes, delete it
                </button>
                <button type='button' className='font-medium py-2 px-4 bg-gray-400 text-white transition-all duration-300 hover:bg-gray-500 rounded' onClick={() => setConfirm(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )
        }
      </div>

    </div>
  )
}

export default UserProfile