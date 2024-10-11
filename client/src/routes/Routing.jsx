// src/routes.js
import { Routes, Route } from 'react-router-dom'
import Admin from '@/pages/Admin'
import Home from '@/pages/Home'
import Auth from '@/pages/Auth'
import Personal from '@/pages/Personal'
import Dashboard from '@/pages/Admin/Dashboard/Dashboard'
import Setting from '@/pages/Admin/Setting/Setting'
import Login from '@/pages/Auth/Login/Login'
import Register from '@/pages/Auth/Register/Register'
import Favorites from '@/pages/Home/Favorites/Favorites'
import Main from '@/pages/Home/Main/Main'
import PrivateRoute from './PrivateRoute'
import Verify from '@/pages/Auth/Verify/Verify'
import NotFoundPage from '@/pages/Error/NotFoundPage'
import PublicRoute from './PublicRoute'
import Search from '@/pages/Search'
import Summary from '@/pages/Search/Summary/Summary'
import AllUser from '@/pages/Search/AllUsers/AllUser'
import ViewPost from '@/pages/Home/ViewPost/ViewPost'
import MyPersonal from '@/pages/Personal/MyProfile/MyPersonal'
import UserPersonal from '@/pages/Personal/Other/UserPersonal'

function Routing() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<Home />}>
          <Route path='/' element={<Main />} />
          <Route path='/post/:postId' element={<ViewPost />} />
          <Route path='favorite' element={<Favorites />} />
        </Route>
        <Route path='/admin' element={<Admin />}>
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/admin/setting' element={<Setting />} />
        </Route>
        <Route path='/personal' element={<Personal />}>
          <Route path='/personal' element={<MyPersonal />} />
          <Route path='/personal/:userId' element={<UserPersonal />} />
        </Route>
        <Route path='/search/:query' element={<Search />}>
          <Route path='/search/:query' element={<Summary />} />
          <Route path='/search/:query/people' element={<AllUser />} />
        </Route>
      </Route>
      <Route element={<PublicRoute />}>
        <Route path='/auth' element={<Auth />}>
          <Route path='/auth' element={<Login />} />
          <Route path='/auth/signup' element={<Register />} />
          <Route path='/auth/verify' element={<Verify />} />
        </Route>
      </Route>
      {/* Route for 404 Not Found */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default Routing
