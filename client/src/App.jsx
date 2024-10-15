import { BrowserRouter } from 'react-router-dom'
import Routing from '@/routes/Routing'
import BackdropLoad from './components/Common/Backdrop/BackdropLoad'
import { useSelector } from 'react-redux'
import { connectUser } from './services/socket'
import { useEffect } from 'react'

function App() {
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      connectUser(user._id) // Kết nối socket khi đăng nhập
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
