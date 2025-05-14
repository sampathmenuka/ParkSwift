import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import { Menu, UserRound, LogOut, X } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {

  const { isAuthenticated, logout } = useContext(AuthContext)

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <div className='bg-white border-b border-gray-300 fixed w-full z-20 shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex justify-center items-center'>
            <NavLink to='/' >
              <img src={logo} alt="logo" className='w-28 sm:w-[132px]' /> 
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-4'>
            <NavLink to="/search" onClick={() => scrollTo(0,0)} className="text-gray-600 hover:text-indigo-500 px-3 py-2 font-medium transition-all duration-300 group">
              Find Parking
              <hr className='border-none outline-none h-0.5 bg-indigo-400 w-3/5 mx-auto opacity-0 group-hover:opacity-100 transition-all duration-300'/>
            </NavLink>

            <NavLink to="/about" onClick={() => scrollTo(0,0)} className="text-gray-600 hover:text-indigo-500 px-3 py-2 font-medium transition-all duration-300 group">
              About
              <hr className='border-none outline-none h-0.5 bg-indigo-400 w-3/5 mx-auto opacity-0 group-hover:opacity-100 transition-all duration-300'/>
            </NavLink>

            <NavLink to="/faq" onClick={() => scrollTo(0,0)} className="text-gray-600 hover:text-indigo-500 px-3 py-2 font-medium transition-all duration-300 group">
              FAQ
              <hr className='border-none outline-none h-0.5 bg-indigo-400 w-3/5 mx-auto opacity-0 group-hover:opacity-100 transition-all duration-300'/>
            </NavLink>

            <NavLink to="/contact" onClick={() => scrollTo(0,0)} className="text-gray-600 hover:text-indigo-500 px-3 py-2 font-medium transition-all duration-300 group">
              Contact
              <hr className='border-none outline-none h-0.5 bg-indigo-400 w-3/5 mx-auto opacity-0 group-hover:opacity-100 transition-all duration-300'/>
            </NavLink>


            {
              isAuthenticated && (
                <NavLink to="/dashboard" onClick={() => scrollTo(0,0)} className="text-gray-600 hover:text-indigo-500 px-3 py-2 font-medium transition-all duration-300 group">
                  Dashboard
                  <hr className='border-none outline-none h-0.5 bg-indigo-400 w-3/5 mx-auto opacity-0 group-hover:opacity-100 transition-all duration-300'/>
                </NavLink>
              )
            }
            


            {
              isAuthenticated ? (
                <button onClick={handleLogout} className='flex items-center outline-none px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 transition-all duration-300'>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              ) : (
                <NavLink to='/login' onClick={() => scrollTo(0,0)} >
                  <button className='flex items-center outline-none px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 transition-all duration-300'>
                    <UserRound className="h-4 w-4 mr-2" />
                    Account
                  </button>
                </NavLink>
              )
            }
            
          </div>


          {/* Mobile view  */}

          <div className='flex items-center md:hidden'>
            <Menu onClick={() => setShowMenu(true)} className='w-6 h-6 cursor-pointer'/>
          </div>

          {
            showMenu &&  (
              <div className={`${showMenu ? 'fixed w-[280px]' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-30 overflow-hidden bg-gray-50`}>
                <div className='flex justify-end p-6'>
                  <X className='h-6 w-6 cursor-pointer text-indigo-500' onClick={() => setShowMenu(false)} alt="close" />
                </div>

                <ul className='flex flex-col items-center gap-2 mt-1 px-5 text-lg font-medium text-gray-700'>
                  <NavLink onClick={() => setShowMenu(false)} to='/'>
                    <p className='px-4 py-2 rounded-md inline-block hover:bg-indigo-500 hover:text-white transition-all duration-300'>
                      Home
                    </p>
                  </NavLink>

                  <NavLink onClick={() => setShowMenu(false)} to='/search'>
                    <p className='px-4 py-2 rounded-md inline-block hover:bg-indigo-500 hover:text-white transition-all duration-300'>
                      Find Parking
                    </p>
                  </NavLink>

                  <NavLink onClick={() => setShowMenu(false)} to='/about'>
                    <p className='px-4 py-2 rounded-md inline-block hover:bg-indigo-500 hover:text-white transition-all duration-300'>
                      About
                    </p>
                  </NavLink>

                  <NavLink onClick={() => setShowMenu(false)} to='/faq'>
                    <p className='px-4 py-2 rounded-md inline-block hover:bg-indigo-500 hover:text-white transition-all duration-300'>
                      FAQ
                    </p>
                  </NavLink>

                  <NavLink onClick={() => setShowMenu(false)} to='/contact'>
                    <p className='px-4 py-2 rounded-md inline-block hover:bg-indigo-500 hover:text-white transition-all duration-300'>
                      Contact
                    </p>
                  </NavLink>

                  {isAuthenticated && (
                    <NavLink onClick={() => setShowMenu(false)} to='/dashboard'>
                      <p className='px-4 py-2 rounded-md inline-block hover:bg-indigo-500 hover:text-white transition-all duration-300'>
                        Dashboard
                      </p>
                    </NavLink>
                  )}

                  {
                    isAuthenticated ? (
                      <button onClick={handleLogout} className='mt-10 flex items-center outline-none px-4 py-2 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 transition-all duration-300'>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    ) : (
                      <NavLink to='/login' >
                        <button className='mt-10 flex items-center outline-none px-4 py-2 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 transition-all duration-300'>
                          <UserRound className="h-4 w-4 mr-2" />
                          Account
                        </button>
                      </NavLink>
                    )
                  }
                </ul>
              </div>
            )
          }

        </div>
      </div>
    </div>
  )
}

export default Navbar