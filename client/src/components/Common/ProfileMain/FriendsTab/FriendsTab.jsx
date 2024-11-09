import React, { useState } from 'react'
import { Box, Card, CardContent, Avatar, Typography, IconButton, InputBase } from '@mui/material'
import FriendCard from './FriendCard/FriendCard'
import { useSelector } from 'react-redux'
import SearchIcon from '@mui/icons-material/Search'
import FlexCenter from '../../Flex/FlexCenter'
import FlexRow from '../../Flex/FlexRow'

const FriendsTab = ({ user }) => {
  const [search, setSearch] = useState('')
  const currentUser = useSelector((state) => state.auth.user)
  const filteredFriends = user.friends.filter(
    (friend) => friend._id !== currentUser._id && friend.fullname.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <Box bgcolor='background.paper' borderRadius={2} p={4}>
      <FlexRow p={2} mb={4}>
        <Typography fontWeight='bold' variant='h6' flex={3}>
          Bạn bè
        </Typography>
        <FlexCenter sx={{ backgroundColor: 'background.default', borderRadius: 2, p: 1 }} flex={2}>
          <SearchIcon />
          <InputBase placeholder='Tìm kiếm' sx={{ marginLeft: 1, flex: 1 }} value={search} onChange={(e) => setSearch(e.target.value)} />
        </FlexCenter>
      </FlexRow>
      <Box display='flex' sx={{ flexWrap: 'wrap', gap: 2 }}>
        {filteredFriends?.length > 0 ? (
          filteredFriends.map((user) => <FriendCard user={user} />)
        ) : (
          <Typography fontWeight='bold' textAlign='center'>
            Không có bạn bè
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default FriendsTab
