import React, { memo } from 'react'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Avatar, ListItemAvatar } from '@mui/material'
import { useProfileNavigation } from '@/hooks/useProfileNavigation'
import { useDispatch, useSelector } from 'react-redux'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import FlexRow from '@/components/Common/Flex/FlexRow'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import CircularProgress from '@mui/material/CircularProgress'
import { deleteHistorySearch } from '@/apis/user/userAPI'
import { removeHistorySearch } from '@/features/auth/authSlice'
import { scrollbarStyleMui } from '@/styles/styles'

const SearchList = ({ loading, users, query, setQuery, handleSearch }) => {
  const handleProfileClick = useProfileNavigation()
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleHistorySearchClick = (content) => {
    setQuery(content)
    handleSearch(content)
  }

  const handleDeleteSearch = async (query) => {
    try {
      await deleteHistorySearch(query)
      dispatch(removeHistorySearch(query))
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <Box sx={{ backgroundColor: 'background.paper', width: 1, borderRadius: 2, mt: 2, maxHeight: 500, overflowY: 'auto', ...scrollbarStyleMui }}>
      <List sx={{ p: 0 }}>
        {!query ? (
          user.historySearch?.length > 0 ? (
            user.historySearch.map((item, index) => (
              <ListItemButton key={index}>
                <FlexRow gap={2} onClick={() => handleHistorySearchClick(item.content)} flex={4}>
                  <AccessTimeOutlinedIcon />
                  <Typography
                    variant='body1'
                    fontWeight='medium'
                    noWrap
                    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: { xs: '300px', sm: '280px' } }}>
                    {item.content}
                  </Typography>
                </FlexRow>
                <IconButton sx={{ ml: 'auto' }} onClick={() => handleDeleteSearch(item.content)} flex={1}>
                  <CloseOutlinedIcon />
                </IconButton>
              </ListItemButton>
            ))
          ) : (
            <ListItem alignItems='center'>
              <Typography variant='body1' fontWeight='bold' align='center' p={3}>
                Bạn chưa có bất kỳ tìm kiếm nào
              </Typography>
            </ListItem>
          )
        ) : loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <CircularProgress color='primary' />
          </Box>
        ) : users.length > 0 ? (
          users.map((userSearch) => (
            <ListItemButton key={userSearch._id} onClick={() => handleProfileClick(userSearch._id)}>
              <ListItemAvatar>
                <Avatar src={userSearch.avatar} />
              </ListItemAvatar>
              <ListItemText primary={`${userSearch.firstname} ${userSearch.lastname}`} />
            </ListItemButton>
          ))
        ) : (
          <ListItem alignItems='center'>
            <Typography variant='body1' fontWeight='bold' align='center' p={3}>
              Không tìm thấy kết quả
            </Typography>
          </ListItem>
        )}
      </List>
    </Box>
  )
}

export default memo(SearchList)
