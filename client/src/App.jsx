import { BrowserRouter } from 'react-router-dom'
import Routing from '@/routes/Routing'
import BackdropLoad from './components/Common/Backdrop/BackdropLoad'
import { useDispatch, useSelector } from 'react-redux'
import socket, { connectUser, disconnectUser } from './services/socket'
import { useEffect } from 'react'
import { setOnlineUsers } from './features/online/onlineSlice'
import { fetchUsersOnline } from './apis/auth/authAPI'

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      connectUser(user._id)
    } else {
      disconnectUser()
    }
  }, [user])

  return (
    <BrowserRouter>
      <BackdropLoad />
      <Routing />
    </BrowserRouter>
  )
}

export default App
