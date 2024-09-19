// src/routes/PrivateRoute.js
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  return isAuthenticated ? <Outlet /> : <Navigate to='/auth' />
}

export default PrivateRoute
