// src/routes.js
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import Main from '@/pages/HomePage/Main/Main'
import Contact from '@/pages/HomePage/Contact/Contact'
import AdminPage from '@/pages/AdminPage'
import Dashboard from '@/pages/AdminPage/Dashboard/Dashboard'
import Setting from '@/pages/AdminPage/Setting/Setting'
import Posts from '@/components/Posts/Posts/Posts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      {
        path: '/',
        element: <Posts />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'profile/:userId',
        element: <Posts />
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
