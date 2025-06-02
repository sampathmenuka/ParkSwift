import { Search } from 'lucide-react';
import { useContext, useState, useEffect } from 'react';
import {AuthContext} from '../../contexts/AuthContext'
import { toast } from 'react-toastify';
import axios from 'axios';

const ParkingSlots = () => {

  const {backendUrl} = useContext(AuthContext)
  
  const [slots, setSlots] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getSlots = async () => {

    try {
      const { data } = await axios.get(backendUrl + '/api/admin/');

      if (data) {
        setSlots(data.slots);
      } else{
          toast.error(data.message);
      }
      
    } catch (error) {
        toast.error(error.message);
    }
  };

  const handleAction = async (slotId, action) => {

    try {

      const {data} = await axios.patch(backendUrl + `/api/admin/${slotId}/status`, { available: action === 'deactivate' ? false : true });

      if (data.success) {
        toast.success(data.message);
        getSlots();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
        toast.error(error.message);
    }
  };

  const handleDelete = async (slotId) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this slot?")

    if (!confirmDelete) {
      return 
    }

    try {

      const {data} = await axios.delete(backendUrl + `/api/admin/${slotId}`);

      if (data.success) {
        toast.success(data.message);
        getSlots()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
        toast.error(error.message);
    }
  };

  const filteredSlots = slots.filter(slot =>
    slot.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slot.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // export slot data to excel 
  const exportToCSV = () => {
    if (!Array.isArray(filteredSlots) || filteredSlots.length === 0) {
      alert("No slot data to export.");
      return;
    }

    const headers = ['Name', 'Address', 'Type', 'Hourly Rate', 'Status'];

    const rows = filteredSlots.map(slot => [
      slot.location,
      slot.address,
      slot.slotType,
      slot.pricePerHour,
      slot.available ? "Active" : "Inactive"
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'slots.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  useEffect(() => {
    getSlots();
  }, [])

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-5 sm:items-center">
        <h3 className="text-xl tracking-wide font-semibold text-indigo-600">
          Manage Parking Slots
        </h3>
        <div className="relative flex items-center">
          <input type="text" placeholder="Search slots..." className="w-3/4 sm:w-full pl-8 pr-4 py-1.5 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <Search className="absolute w-4 h-4 left-2 text-gray-500" />
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className="min-w-full border-collapse divide-y divide-gray-200">
          <thead className='bg-indigo-50'>
            <tr className="text-indigo-500">
              <th className="text-left min-w-[200px] p-2 text-sm font-semibold">Name</th>
              <th className="text-left min-w-[200px] py-2 text-sm font-semibold">Address</th>
              <th className="text-center min-w-[120px] py-2 text-sm font-semibold">Type</th>
              <th className="text-center min-w-[120px] py-2 text-sm font-semibold">Hourly Rate</th>
              <th className="text-center min-w-[120px] py-2 text-sm font-semibold">Status</th>
              <th className="text-center min-w-[200px] py-2 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {
              filteredSlots.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No Slot found.
                  </td>
                </tr>
              ) : (
                filteredSlots.map((slot, index) => (
                  <tr key={index}>
                    <td className="py-2 flex w-[200px] items-center">
                      {slot.location}
                    </td>
                    <td className="py-2 text-sm w-[200px] text-gray-700">
                      {slot.address}
                    </td>
                    <td className="py-2 w-[120px] text-center text-gray-700">
                      {slot.slotType}
                    </td>
                    <td className="py-2 w-[120px] text-center text-sm text-gray-700">
                      LKR. {slot.pricePerHour}
                    </td>
                    <td className="py-2 text-center w-[120px] text-sm">
                      <span className={`px-2 py-1 rounded-full text-sm ${ slot.available ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600' }`}
                      >
                        {slot.available ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-2 text-center min-w-[200px] flex items-center justify-center gap-2 text-sm">
                      {slot.available ? (
                        <button onClick={() => handleAction(slot._id, 'deactivate')} className="px-3 py-1 rounded-lg bg-pink-500 text-white hover:bg-pink-600" >
                          Deactivate
                        </button>
                      ) : (
                        <button onClick={() => handleAction(slot._id, 'activate')} className="px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600" >
                          Activate
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(slot._id)}
                        className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-right">
        <button onClick={exportToCSV} className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
          Export Slot Data
        </button>
      </div>
    </div>
  );
};

export default ParkingSlots;