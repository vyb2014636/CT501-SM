import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FlexRow from '@/components/Common/Flex/FlexRow'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import ProfileStat from './Stat/ProfileStat'
import ProfileTabs from './Tabs/ProfileTabs'
import { formatFullname } from '@/utils/helpers'
import EditInfoButton from './Button/EditInfoButton'
import MyAvartarBackground from './Avatar/MyAvartarBackground'
import OtherAvartarBackground from './Avatar/OtherAvartarBackground'
import FriendshipButton from './Button/FriendshipButton'
import { useSelector } from 'react-redux'
import FriendShip from '@/components/Search/Button/FriendShip'
import { Button } from '@mui/material'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'

const styleFlexCenterButton = { display: 'flex', alignItems: 'center', gap: 2 }

const ProfileCard = ({ user, totalPosts, myCardProfile = false }) => {
  const [value, setValue] = useState(0)
  const { status } = useSelector((state) => state.friendship)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const { firstname, lastname, friends } = user || {}

  return (
    <FlexColumn sx={{ backgroundColor: 'background.paper', height: 500, borderRadius: '12px 12px 0 0', mb: 2 }}>
      {myCardProfile ? <MyAvartarBackground user={user} /> : <OtherAvartarBackground user={user} />}

      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant='h5' fontWeight='bold'>
          {formatFullname(firstname, lastname)}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        {myCardProfile ? <EditInfoButton user={user} /> : <FriendShip user={user} inProfile />}
      </Box>

      <ProfileStat friendsCount={friends?.length} totalPosts={totalPosts} />

      <ProfileTabs value={value} handleChange={handleChange} />
    </FlexColumn>
  )
}

export default ProfileCard
