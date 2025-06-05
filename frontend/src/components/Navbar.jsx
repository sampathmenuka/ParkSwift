import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Menu, UserRound, LogOut, X } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { backendUrl, setIsAuthenticated, isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      if (data.success) {
        setIsAuthenticated(false);
        navigate('/');
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashboardLabel = () => {
    switch (user?.role) {
      case 'user':
        return 'Dashboard';
      case 'admin':
        return 'Admin Dashboard';
      case 'owner':
        return 'Owner Dashboard';
      default:
        return null;
    }
  };

  const getDashboardLink = () => {
    switch (user?.role) {
      case 'user':
        return '/dashboard/user';
      case 'admin':
        return '/dashboard/admin';
      case 'owner':
        return '/dashboard/owner';
      default:
        return null;
    }
  };

  const dashboardLabel = getDashboardLabel();
  const dashboardLink = getDashboardLink();

  return (
    <div className='bg-white border-b border-gray-300 fixed w-full z-20 shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex justify-center items-center'>
            <NavLink to='/'>
              <img
                src={logo}
                alt='logo'
                className='w-28 sm:w-[132px] hover:scale-105 transition-transform duration-300'
              />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-4'>
            <NavLink
              to='/search'
              onClick={() => scrollTo(0, 0)}
              className={({ isActive }) =>
                `relative text-gray-600 font-medium px-3 py-2 transition-all duration-300 group hover:-translate-y-0.5 ${
                  isActive ? 'text-indigo-700 -translate-y-1' : 'hover:text-indigo-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Find Parking
                  <span
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-indigo-400 transition-all duration-300 ease-out ${
                      isActive ? 'w-3/5' : 'w-0 group-hover:w-3/5'
                    }`}
                  />
                </>
              )}
            </NavLink>

            <NavLink
              to='/about'
              onClick={() => scrollTo(0, 0)}
              className={({ isActive }) =>
                `relative text-gray-600 font-medium px-3 py-2 transition-all duration-300 group hover:-translate-y-0.5 ${
                  isActive ? 'text-indigo-700 -translate-y-1' : 'hover:text-indigo-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  About
                  <span
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-indigo-400 transition-all duration-300 ease-out ${
                      isActive ? 'w-3/5' : 'w-0 group-hover:w-3/5'
                    }`}
                  />
                </>
              )}
            </NavLink>

            <NavLink
              to='/faq'
              onClick={() => scrollTo(0, 0)}
              className={({ isActive }) =>
                `relative text-gray-600 font-medium px-3 py-2 transition-all duration-300 group hover:-translate-y-0.5 ${
                  isActive ? 'text-indigo-700 -translate-y-1' : 'hover:text-indigo-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  FAQ
                  <span
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-indigo-400 transition-all duration-300 ease-out ${
                      isActive ? 'w-3/5' : 'w-0 group-hover:w-3/5'
                    }`}
                  />
                </>
              )}
            </NavLink>

            <NavLink
              to='/contact'
              onClick={() => scrollTo(0, 0)}
              className={({ isActive }) =>
                `relative text-gray-600 font-medium px-3 py-2 transition-all duration-300 group hover:-translate-y-0.5 ${
                  isActive ? 'text-indigo-700 -translate-y-1' : 'hover:text-indigo-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Contact
                  <span
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-indigo-400 transition-all duration-300 ease-out ${
                      isActive ? 'w-3/5' : 'w-0 group-hover:w-3/5'
                    }`}
                  />
                </>
              )}
            </NavLink>

            {isAuthenticated && (
              <NavLink
                to={dashboardLink}
                onClick={() => scrollTo(0, 0)}
                className={({ isActive }) =>
                  `relative text-gray-600 font-medium px-3 py-2 transition-all duration-300 group hover:-translate-y-0.5 ${
                    isActive ? 'text-indigo-700 -translate-y-1' : 'hover:text-indigo-500'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {dashboardLabel}
                    <span
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-indigo-400 transition-all duration-300 ease-out ${
                        isActive ? 'w-3/5' : 'w-0 group-hover:w-3/5'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            )}

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className='flex items-center outline-none px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 hover:scale-105 hover:shadow-md transition-all duration-300'
              >
                <LogOut className='h-4 w-4 mr-2' />
                Logout
              </button>
            ) : (
              <NavLink to='/login' onClick={() => scrollTo(0, 0)}>
                <button className='flex items-center outline-none px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 hover:scale-105 hover:shadow-md transition-all duration-300'>
                  <UserRound className='h-4 w-4 mr-2' />
                  Account
                </button>
              </NavLink>
            )}
          </div>

          {/* Mobile View */}
          <div className='flex items-center md:hidden'>
            <Menu
              onClick={() => setShowMenu(true)}
              className='w-6 h-6 cursor-pointer hover:text-indigo-500 hover:scale-110 transition-all duration-300'
            />
          </div>

          {showMenu && (
            <div
              className={`${
                showMenu ? 'fixed w-[280px]' : 'w-0'
              } md:hidden right-0 top-0 bottom-0 z-30 overflow-hidden bg-gray-50 transform transition-transform duration-300 ease-in-out ${
                showMenu ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className='flex justify-end p-6'>
                <X
                  className='h-6 w-6 cursor-pointer text-indigo-500 hover:scale-110 transition-all duration-300'
                  onClick={() => setShowMenu(false)}
                  alt='close'
                />
              </div>

              <ul className='flex flex-col items-center gap-2 mt-1 px-5 text-lg font-medium text-gray-700'>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to='/'
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md inline-block hover:bg-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ${
                      isActive ? 'bg-indigo-500 text-white' : ''
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  onClick={() => setShowMenu(false)}
                  to='/search'
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md inline-block hover:bg-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ${
                      isActive ? 'bg-indigo-500 text-white' : ''
                    }`
                  }
                >
                  Find Parking
                </NavLink>

                <NavLink
                  onClick={() => setShowMenu(false)}
                  to='/about'
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md inline-block hover:bg-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ${
                      isActive ? 'bg-indigo-500 text-white' : ''
                    }`
                  }
                >
                  About
                </NavLink>

                <NavLink
                  onClick={() => setShowMenu(false)}
                  to='/faq'
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md inline-block hover:bg-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ${
                      isActive ? 'bg-indigo-500 text-white' : ''
                    }`
                  }
                >
                  FAQ
                </NavLink>

                <NavLink
                  onClick={() => setShowMenu(false)}
                  to='/contact'
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md inline-block hover:bg-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ${
                      isActive ? 'bg-indigo-500 text-white' : ''
                    }`
                  }
                >
                  Contact
                </NavLink>

                {isAuthenticated && (
                  <NavLink
                    onClick={() => setShowMenu(false)}
                    to={dashboardLink}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-md inline-block hover:bg-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ${
                        isActive ? 'bg-indigo-500 text-white' : ''
                      }`
                    }
                  >
                    {dashboardLabel}
                  </NavLink>
                )}

                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className='mt-10 flex items-center outline-none px-4 py-2 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 hover:scale-105 hover:shadow-md transition-all duration-300'
                  >
                    <LogOut className='h-4 w-4 mr-2' />
                    Logout
                  </button>
                ) : (
                  <NavLink to='/login'>
                    <button className='mt-10 flex items-center outline-none px-4 py-2 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 hover:scale-105 hover:shadow-md transition-all duration-300'>
                      <UserRound className='h-4 w-4 mr-2' />
                      Account
                    </button>
                  </NavLink>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;