import React, { memo } from 'react'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { Avatar, ListItemAvatar } from '@mui/material'

const SearchList = ({ loading, users, userCurrent }) => {
  return (
    <Box
      position='absolute'
      sx={{ backgroundColor: 'background.paper', width: 1, borderRadius: 2, mt: 2, top: (theme) => theme.myApp.heighHeader }}
      zIndex={1300}>
      <List sx={{ p: 0 }}>
        {loading ? (
          <ListItem>
            <CircularProgress />
          </ListItem>
        ) : !loading && users.length === 0 ? (
          <ListItem>Không tìm thấy </ListItem>
        ) : (
          users.map((userSearch) => (
            <ListItemButton key={userSearch._id} onClick={() => handleProfileClick(userSearch._id, userCurrent._id)}>
              <ListItemAvatar>
                <Avatar src={userSearch.avatar} />
              </ListItemAvatar>
              <ListItemText primary={`${userSearch.firstname} ${userSearch.lastname}`} />
            </ListItemButton>
          ))
        )}
      </List>
    </Box>
  )
}

export default memo(SearchList)
