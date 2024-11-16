import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import List from '@mui/material/List'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import FlexRow from '@components/Common/Flex/FlexRow'
import { formatFullname } from '@/utils/helpers'
import { acceptAddFriendAPI, getRequests, rejectAddFriendAPI } from '@/apis/user/userAPI'
import { acceptFriendRequest, fetchFriendRequests, rejectFriendRequest } from '@/features/request/requestThunk'
import { useDispatch, useSelector } from 'react-redux'
import { updateFriends } from '@/features/auth/authSlice'
import { Box, MenuItem, Typography } from '@mui/material'
import FriendRequestCard from '../Card/FriendRequestCard'
import { SentimentDissatisfied } from '@mui/icons-material' // Biểu tượng không có yêu cầu
import FlexCenter from '@/components/Common/Flex/FlexCenter'

const RequestButton = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { requests } = useSelector((state) => state.request)
  const open = Boolean(anchorEl)
  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    dispatch(fetchFriendRequests())
  }, [dispatch])

  return (
    <>
      <Tooltip title='Lời mời'>
        <MenuItem
          onClick={handleClick}
          aria-controls={open ? 'friends' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          size='small'>
          {requests?.length > 0 ? (
            <Badge color='secondary' variant='dot'>
              <PeopleAltOutlinedIcon color='primary' fontSize='medium' />
            </Badge>
          ) : (
            <PeopleAltOutlinedIcon color='primary' fontSize='medium' />
          )}
        </MenuItem>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}>
        <Box sx={{ minWidth: 350, maxHeight: 200, maxWidth: 440, width: 350 }}>
          {requests.length > 0 ? (
            requests.map((request) => <FriendRequestCard user={request.from} key={request._id} handleClose={handleClose} />)
          ) : (
            <FlexCenter flexDirection='column'>
              <SentimentDissatisfied sx={{ fontSize: 50, color: 'gray' }} /> {/* Biểu tượng không có yêu cầu */}
              <Typography variant='body2' color='text.secondary'>
                Không có yêu cầu kết bạn nào
              </Typography>
            </FlexCenter>
          )}
        </Box>
      </Menu>
    </>
  )
}

export default RequestButton
