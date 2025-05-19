import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({ children, allowedRoles }) => {

  const { isAuthenticated, user } = useContext(AuthContext)
  const navigate = useNavigate()

  if (!isAuthenticated || !user) {
    return navigate('/login')
  }

  if(!allowedRoles.includes(user.role)) {
    return
  }

  return children
}

export default PrivateRoute;