import React from 'react'
import FlexRow from '../../Common/Flex/FlexRow'
import { Avatar, Typography } from '@mui/material'
import FlexColumn from '../../Common/Flex/FlexColumn'
import FriendshipButton from '../../Common/Button/FriendshipButton'
import { useProfileNavigation } from '@/hooks/useProfileNavigation'
import { avatarStyleMui, titleAvatarStyleMui } from '@/styles/styles'
const SearchCard = ({ user }) => {
  const handleProfileClick = useProfileNavigation()
  return (
    <FlexRow key={user._id} sx={{ alignItems: 'center', gap: '12px', p: 2 }}>
      <Avatar alt={user.lastname} src={user.avatar} sx={{ width: 44, height: 44, ...avatarStyleMui }} onClick={() => handleProfileClick(user._id)} />
      <FlexColumn>
        <Typography variant='subtitle1' sx={titleAvatarStyleMui} onClick={() => handleProfileClick(user._id)}>
          {user.fullname}
        </Typography>
        <Typography variant='body2'>4 bài viết</Typography>
      </FlexColumn>
      <FlexRow ml='auto'>
        <FriendshipButton userId={user._id} />
      </FlexRow>
    </FlexRow>
  )
}

export default SearchCard
