import React, { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import FlexRow from '@/components/Flex/FlexRow'
import FlexColumn from '@/components/Flex/FlexColumn'
import { formatFullname } from '@/utils/helpers'
import MyAvartarBackground from '../Common/AvatarBackground/MyAvartarBackground'
import OtherAvartarBackground from '../Common/AvatarBackground/OtherAvartarBackground'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
const CardProfile = ({ user, totalPosts, children, myCardProfile = null }) => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <FlexColumn sx={{ backgroundColor: 'background.paper', height: 500, borderRadius: '12px 12px 0 0 ', mb: 2 }}>
      {myCardProfile ? <MyAvartarBackground user={user} /> : <OtherAvartarBackground user={user} />}
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant='h5' fontWeight='bold'>
          {formatFullname(user?.firstname, user?.lastname)}
        </Typography>
      </Box>

      <FlexRow justifyContent='center' gap={2} my={2}>
        {myCardProfile && (
          <Button variant='contained' sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 210 }}>
            <Typography variant='body1' fontWeight='bold'>
              Chỉnh sửa thông tin
            </Typography>
            <BorderColorOutlinedIcon />
          </Button>
        )}
        {children}
      </FlexRow>

      <Box borderTop={2} borderBottom={2} borderColor='divider' py={4} my={2}>
        <FlexRow gap={4} justifyContent='center'>
          <Box textAlign='center' width='30%'>
            <Typography variant='h6'>{user?.friends?.length}</Typography>
            <Typography variant='body2'>Bạn bè</Typography>
          </Box>
          <Divider orientation='vertical' flexItem />
          <Box textAlign='center' width='30%'>
            <Typography variant='h6'>{totalPosts}</Typography>
            <Typography variant='body2'>Bài viết</Typography>
          </Box>
        </FlexRow>
      </Box>

      <Box mt='auto'>
        <Tabs value={value} onChange={handleChange} variant='scrollable' scrollButtons='auto' textColor='primary' indicatorColor='primary'>
          <Tab label='Bài viết' />
          <Tab label='Bạn bè' />
          <Tab label='Ảnh' />
          <Tab label='Video' />
        </Tabs>
      </Box>
    </FlexColumn>
  )
}

export default CardProfile
