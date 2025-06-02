import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Search, User } from 'lucide-react'
import moment from 'moment';

const Users = () => {

  const {backendUrl} = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getUsers = async () => {

    try {

      const {data} = await axios.get(backendUrl + '/api/admin/users');

      if (data.success) {
        setUsers(data.users);
      } else {
          toast.error(data.message)
      }
      
    } catch (error) {
        toast.error(error.message);
    }
  }

  const handleToggleStatus = async (id) => {

    try {

      const {data} = await axios.patch(backendUrl + `/api/admin/users/${id}/status`, {});

      if (data.success) {
        setUsers(users.map(user => (user._id === id ? data.user : user)));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleViewUser = async (id) => {

    try {
      const {data} = await axios.get(backendUrl + `/api/admin/${id}`);

      if (data.success) {
        setSelectedUser(data.user);
        setShowModal(true);
      } else {
          toast.error(data.message);
      }
      
    } catch (error) {
        toast.error(error.message);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) || 
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  // export data to excel 
  const exportToCSV = () => {
    if (!Array.isArray(filteredUsers) || filteredUsers.length === 0) {
      alert("No user data to export.");
      return;
    }

    const headers = ['Name', 'Email', 'Role', 'Status', 'Joined Date'];

    const rows = filteredUsers.map(user => [
      user.name,
      user.email,
      user.role,
      user.status,
      moment(new Date(user.createdAt).toLocaleDateString()).format('DD MMM, YYYY')
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-5 sm:items-center">
        <h3 className="text-xl tracking-wide font-semibold text-indigo-600">
          Manage Users
        </h3>
        <div className="relative flex items-center">
          <input type="text" placeholder="Search users using name, email, role,.." className="w-3/4 sm:w-full pl-8 pr-4 py-1.5 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400" value={search} onChange={e => setSearch(e.target.value)} />
          <Search className="absolute w-4 h-4 left-2 text-gray-500" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse divide-y divide-gray-200">
          <thead className='bg-indigo-50'>
            <tr className="text-indigo-500">
              <th className="text-left min-w-[170px] p-2 text-sm font-semibold">User</th>
              <th className="text-left min-w-[170px] py-2 text-sm font-semibold">Email</th>
              <th className="text-center min-w-[100px] py-2 text-sm font-semibold">Role</th>
              <th className="text-center min-w-[100px] py-2 text-sm font-semibold">Status</th>
              <th className="text-center min-w-[100px] py-2 text-sm font-semibold">Joined Date</th>
              <th className="text-center min-w-[100px] py-2 text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200'>
            {
              filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No User found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr key={index}>
                    <td onClick={() => handleViewUser(user._id)} className="w-[170px] py-2 flex items-center">
                      <User className='mr-2 w-4 h-4' />
                      <span className="text-gray-900 hover:underline hover:text-gray-600 hover:cursor-pointer">
                        {(user.name).charAt(0).toUpperCase() + (user.name).slice(1).toLowerCase()}
                      </span>
                    </td>

                    <td className="py-2 w-[170px] text-sm text-gray-700">
                      {user.email}
                    </td>

                    <td className="py-2 w-[100px] text-center">
                      <span className="px-4 py-1 bg-gray-200 rounded-full text-sm text-gray-700">
                        {user.role}
                      </span>
                    </td>

                    <td className="py-2 w-[100px] text-center">
                      <span className={`px-2 py-1 rounded-full text-sm ${ user.status === 'active' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600' }`}>
                        {user.status}
                      </span>
                    </td>

                    <td className="py-2 text-sm text-gray-700 w-[100px] text-center">
                      {moment(new Date(user.createdAt).toLocaleDateString()).format('MMM DD, YYYY')}
                    </td>

                    <td className="py-2 w-[100px] text-center">
                      <button onClick={() => handleToggleStatus(user._id)} className={`px-3 py-1 rounded-lg text-sm ${ user.status === 'active' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600' }`} >
                        {user.status === 'active' ? 'Ban' : 'Unban'}
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
        <button className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50" onClick={exportToCSV}>
          Export User Data
        </button>
      </div>


      {showModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-3 text-gray-500 hover:text-black transition-all duration-300">
              ✖
            </button>
            <h2 className="text-xl text-indigo-500 font-semibold mb-1">
              User Details
            </h2>
            <hr className='mb-4' />
            <p><strong>Name:</strong> {(selectedUser.name).charAt(0).toUpperCase() + (selectedUser.name).slice(1).toLowerCase()}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <p><strong>Status:</strong> {selectedUser.status}</p>
            <p><strong>Phone:</strong> {selectedUser.phone || 'N/A'}</p>
            <p><strong>Vehicle Type:</strong> {selectedUser.vehicleType || 'N/A'}</p>
            <p><strong>License Plate:</strong> {selectedUser.licensePlate || 'N/A'}</p>
            <p><strong>Joined:</strong> {moment(new Date(selectedUser.createdAt).toLocaleDateString()).format('DD MMM, YYYY')}</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default Users;