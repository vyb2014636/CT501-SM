// src/routes/PrivateRoute.js
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  return isAuthenticated && !user?.isAdmin ? <Outlet /> : user?.isAdmin ? <Navigate to='/admin' /> : <Navigate to='/auth' />
}

export default PrivateRoute
