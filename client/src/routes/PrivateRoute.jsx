// src/routes/PrivateRoute.js
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth)
  return user ? <Outlet /> : <Navigate to='/auth' />
}

export default PrivateRoute
