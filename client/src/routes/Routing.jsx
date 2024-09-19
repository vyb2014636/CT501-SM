// src/routes.js
import { Routes, Route } from 'react-router-dom'
import Admin from '@/pages/Admin'
import Home from '@/pages/Home'
import Auth from '@/pages/Auth'
import Profile from '@/pages/Profile'
import Dashboard from '@/pages/Admin/Dashboard/Dashboard'
import Setting from '@/pages/Admin/Setting/Setting'
import Login from '@/pages/Auth/Login/Login'
import SignUp from '@/pages/Auth/SignUp/SignUp'
import Favorites from '@/pages/Home/Content/Favorites/Favorites'
import Main from '@/pages/Home/Content/Main/Main'
import PrivateRoute from './PrivateRoute'
import Verify from '@/pages/Auth/Verify/Verify'
import NotFoundPage from '@/pages/Error/NotFoundPage'
import PublicRoute from './PublicRoute'

function Routing() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<Home />}>
          <Route path='/' element={<Main />} />
          <Route path='favorite' element={<Favorites />} />
        </Route>
        <Route path='/admin' element={<Admin />}>
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/admin/setting' element={<Setting />} />
        </Route>
        <Route path='/:userId' element={<Profile />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path='/auth' element={<Auth />}>
          <Route path='/auth' element={<Login />} />
          <Route path='/auth/signup' element={<SignUp />} />
          <Route path='/auth/verify' element={<Verify />} />
        </Route>
      </Route>
      {/* Route for 404 Not Found */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default Routing
