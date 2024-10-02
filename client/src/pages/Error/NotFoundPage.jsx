import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        flex: 3,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
      <Typography variant='h1' component='div' gutterBottom>
        404
      </Typography>
      <Typography variant='h5' component='div' gutterBottom>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button variant='contained' color='primary' component={Link} to='/'>
        Go back to Home
      </Button>
    </Box>
  )
}

export default NotFoundPage
