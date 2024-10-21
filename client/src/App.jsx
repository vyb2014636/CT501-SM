import { BrowserRouter } from 'react-router-dom'
import Routing from '@/routes/Routing'
import BackdropLoad from './components/Common/Backdrop/BackdropLoad'
import { useDispatch, useSelector } from 'react-redux'
import socket, { connectUser, disconnectUser } from './services/socket'
import { useEffect } from 'react'

function App() {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (user) {
      connectUser(user._id)

      // socket.on('user_connected', (userId) => {
      //   console.log(userId)
      //   dispatch(setUserOnline(userId))
      // })
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
