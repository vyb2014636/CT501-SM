// src/routes.js
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import AdminPage from '@/pages/AdminPage'
import Dashboard from '@/pages/AdminPage/Dashboard/Dashboard'
import Setting from '@/pages/AdminPage/Setting/Setting'
import ProfilePage from '@/pages/ProfilePage'
import Auth from '@/pages/Auth'
import Login from '@/pages/Auth/Login/Login'
import SignUp from '@/pages/Auth/SignUp/SignUp'
import Main from '@/pages/HomePage/Content/Main/Main'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      {
        path: '/',
        element: <Main />
      }
    ]
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: '/auth',
        element: <Login />
      },
      {
        path: '/auth/signup',
        element: <SignUp />
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminPage />,
    children: [
      {
        path: '/admin',
        element: <Dashboard />
      },
      {
        path: '/admin/setting',
        element: <Setting />
      }
    ]
  }
])

export default router
