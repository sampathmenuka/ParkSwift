import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import moment from 'moment'


const Notification = () => {

  const { backendUrl } = useContext(AuthContext)

  const [notifications, setNotifications] = useState([])
  const [unReadCount, setUnReadCount] = useState(0)

  const [loading, setLoading] = useState(false)

  const fetchNotifications = async () => {

    setLoading(true)

    try {
      
      const {data} = await axios.get(backendUrl + '/api/notifications/')

      if (data.success) {
        setNotifications(data.notifications)
        const unread = data.notifications.filter((e) => !e.isRead).length;

        setUnReadCount(unread)
      } else {
        toast.error(data.message)
      }

    setLoading(false)

    } catch (error) {
        toast.error(error.message)
    }
  }

  const handleMarkAsRead = async (id, isRead) =>{

    try {

      const {data} = await axios.patch(backendUrl + `/api/notifications/${id}`, {read: !isRead} );

      if (data.success) {
        setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, isRead: !isRead } : n)));
        toast.success(data.message)
      } else{
        toast.error(data.message)
      }

      fetchNotifications();
      
    } catch (error) {
        toast.error(error.message)
    }
  }


  const handleMarkAllAsRead = async () => {

    try{
      const {data} = await axios.patch(backendUrl + '/api/notifications');

      if (data.success) {
        const updated = notifications.map((n) => ({...n, isRead: true}));

        setNotifications(updated)
        setUnReadCount(0);
        toast.success(data.message);

        fetchNotifications();
      } else{
          toast.error(data.message)
      }
    } catch(error){
        toast.error(error.message)
    }
  }

  
  useEffect(() => {
    fetchNotifications();
  }, [])


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-blue-500 font-medium">Loading...</p>
      </div>
    )
  }


  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4 text-gray-700'>
        Notifications
      </h2>

      {
        notifications.length < 0 
        ? (
          <div className='text-center py-12'>
            <p className='text-gray-600 mb-3 font-light text-lg'>
              You have no Notifications.
            </p>
          </div>
        ) : (
          <div>
            <div className='p-4 border rounded shadow mb-4'>
              <div className='w-full flex items-center justify-between mb-6'>
                <div>
                  <h3 className='text-md md:text-2xl font-semibold text-indigo-500 tracking-wide'>
                    Recent Notifications
                    {
                      unReadCount > 0 && (
                        <span className='bg-red-500 ml-1 text-white text-sm md:text-base font-semibold rounded-full px-2 py-0.5'>            
                          {unReadCount}
                        </span>
                      )
                    }
                  </h3>     
                </div>

                {
                  unReadCount > 0 && (
                    <button onClick={handleMarkAllAsRead} className='py-2 px-3 rounded bg-indigo-400 text-white font-medium hover:bg-indigo-500 text-xs md:text-sm transition-all duration-300'>
                      Mark all as read
                    </button>
                  )
                }
                
              </div>

              {
                notifications.map((notification) => (
                  <div key={notification._id} className='p-4 rounded'>
                    <div className='w-full'>
                      <div className='w-full flex items-center justify-between mb-6'>
                        <h3 className='text-md md:text-xl font-semibold text-gray-700'>
                          {(notification.type).charAt(0).toUpperCase() + (notification.type).slice(1).toLowerCase()}
                        </h3>
                        <p className='text-xs sm:text-sm font-base text-gray-400'>
                          {moment(new Date(notification.createdAt)).format('MMM DD, YYYY') }
                        </p>
                      </div> 

                      <p className='text-gray-600 mb-2'>
                        {notification.title}
                      </p>

                      <p className='text-gray-500 mb-3'>
                        {notification.message}
                      </p> 

                      {
                        !notification.isRead && (
                          <div className='flex items-center justify-end mb-2'>
                            <button onClick={() => handleMarkAsRead(notification._id, notification.isRead)} className='py-2 px-3 rounded bg-indigo-200 text-gray-800 hover:bg-indigo-400 text-xs md:text-sm transition-all duration-300' >
                              Mark as read
                            </button>
                          </div>
                        )
                      }
                      
                      <hr />
                    </div>
                  </div>
                ))
              }
            </div>           
          </div>
        )
      }
    </div>
  )
}

export default Notification