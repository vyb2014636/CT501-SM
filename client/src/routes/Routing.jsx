// src/routes.js
// import { createBrowserRouter } from 'react-router-dom'
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
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Verify from '@/pages/Auth/Verify/Verify'

function Routing() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<Home />}>
          <Route path='/' element={<Main />} />
          <Route path='/favorite' element={<Favorites />} />
        </Route>
        <Route path='/admin' element={<Admin />}>
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/admin/setting' element={<Setting />} />
        </Route>
        <Route path='/:userId' element={<Profile />} />
      </Route>
      {/* <Route path='/' element={<Home />}>
        <Route path='/' element={<Main />} />
        <Route path='/favorite' element={<Favorites />} />
      </Route> */}
      <Route path='/auth' element={<Auth />}>
        <Route path='/auth' element={<Login />} />
        <Route path='/auth/signup' element={<SignUp />} />
        <Route path='/auth/verify' element={<Verify />} />
      </Route>
    </Routes>
  )
}

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//     children: [
//       {
//         path: '/',
//         element: <Main />
//       },
//       {
//         path: '/favorites',
//         element: <Favorites />
//       }
//     ]
//   },
//   {
//     path: '/profile',
//     element: <Profile />
//   },
//   {
//     path: '/auth',
//     element: <Auth />,
//     children: [
//       {
//         path: '/auth',
//         element: <Login />
//       },
//       {
//         path: '/auth/signup',
//         element: <SignUp />
//       }
//     ]
//   },
//   {
//     path: '/admin',
//     element: <Admin />,
//     children: [
//       {
//         path: '/admin',
//         element: <Dashboard />
//       },
//       {
//         path: '/admin/setting',
//         element: <Setting />
//       }
//     ]
//   }
// ])
// export default router
export default Routing
