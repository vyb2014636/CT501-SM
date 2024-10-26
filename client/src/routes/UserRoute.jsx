// src/AdminRoute.js
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserRoute = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  return isAuthenticated && !user.isAdmin ? <Outlet /> : <Navigate to='/' />
}

export default UserRoute
