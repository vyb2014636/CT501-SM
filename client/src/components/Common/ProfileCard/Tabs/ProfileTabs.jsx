import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

const ProfileTabs = ({ value, handleChange }) => {
  // const [value, setValue] = useState(0)
  // const handleChange = (event, newValue) => {
  //   setValue(newValue)
  // }
  return (
    <Box mt='auto' mb={2} pt={0} sx={{ bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} variant='scrollable' scrollButtons='auto' textColor='primary' indicatorColor='primary'>
        <Tab label='Bài viết' />
        <Tab label='Bạn bè' />
        <Tab label='Ảnh' />
        <Tab label='Video' />
      </Tabs>
    </Box>
  )
}

export default ProfileTabs
