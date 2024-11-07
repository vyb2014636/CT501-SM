import React from 'react'
import UsersTable from '../../User/Content/UsersTable'
import { Box } from '@mui/material'

const History = () => {
  return (
    <Box sx={{ backgroundColor: 'background.paper', width: '100%', overflow: 'hidden', mt: 4 }}>
      <UsersTable history />
    </Box>
  )
}

export default History
