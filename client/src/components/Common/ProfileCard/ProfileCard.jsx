import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FlexRow from '@/components/Common/Flex/FlexRow'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import ProfileStat from './Stat/ProfileStat'
import ProfileTabs from './Tabs/ProfileTabs'
import { formatFullname, isMe } from '@/utils/helpers'
import EditInfoButton from './Button/EditInfoButton'
import MyAvartarBackground from './Avatar/MyAvartarBackground'
import OtherAvartarBackground from './Avatar/OtherAvartarBackground'
import FriendshipButton from './Button/FriendshipButton'
import { useSelector } from 'react-redux'
import FriendShip from '@/components/Search/Button/FriendShip'
import { Button } from '@mui/material'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'

const styleFlexCenterButton = { display: 'flex', alignItems: 'center', gap: 2 }

const ProfileCard = ({ user, totalPosts }) => {
  const currentUser = useSelector((state) => state.auth.user)
  const { friends } = user || {}

  return (
    <FlexColumn sx={{ backgroundColor: 'background.paper', height: 400, borderRadius: '12px 12px 0 0' }}>
      {isMe(currentUser._id, user._id) ? <MyAvartarBackground user={user} /> : <OtherAvartarBackground user={user} />}

      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant='h5' fontWeight='bold'>
          {user.fullname}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        {isMe(currentUser._id, user._id) ? <EditInfoButton user={user} /> : <FriendShip user={user} inProfile />}
      </Box>

      <ProfileStat friendsCount={friends?.length} totalPosts={totalPosts} />
    </FlexColumn>
  )
}

export default ProfileCard
