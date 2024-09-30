import { BrowserRouter } from 'react-router-dom'
import Routing from '@/routes/Routing'
import BackdropLoad from './components/Common/Backdrop/BackdropLoad'

function App() {
  return (
    <BrowserRouter>
      <BackdropLoad />
      <Routing />
    </BrowserRouter>
  )
}

export default App
