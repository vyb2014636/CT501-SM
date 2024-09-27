import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

const ProfileTabs = ({ value, handleChange }) => (
  <Box mt='auto'>
    <Tabs value={value} onChange={handleChange} variant='scrollable' scrollButtons='auto' textColor='primary' indicatorColor='primary'>
      <Tab label='Bài viết' />
      <Tab label='Bạn bè' />
      <Tab label='Ảnh' />
      <Tab label='Video' />
    </Tabs>
  </Box>
)

export default ProfileTabs
