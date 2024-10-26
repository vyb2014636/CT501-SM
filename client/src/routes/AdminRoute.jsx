// src/routes/PrivateRoute.js
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminRoute = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  return user?.isAdmin && isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default AdminRoute
