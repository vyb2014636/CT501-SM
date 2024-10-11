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
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import FlexRow from '@components/Common/Flex/FlexRow'
import { formatFullname } from '@/utils/helpers'
import { acceptAddFriendAPI, getRequests, rejectAddFriendAPI } from '@/apis/user/userAPI'
import { acceptFriendRequest, fetchFriendRequests, rejectFriendRequest } from '@/features/request/requestThunk'
import { useDispatch, useSelector } from 'react-redux'
import { updateFriends } from '@/features/auth/authSlice'

const RequestButton = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { requests } = useSelector((state) => state.request)
  const [error, setError] = useState(false)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    dispatch(fetchFriendRequests())
  }, [])

  const handleAcceptAddFriend = async (from) => {
    try {
      dispatch(acceptFriendRequest(from)).unwrap()
      // dispatch(updateFriends({ user: response.request.from, actionType: 'add' }))
      toast.success('Đồng ý thành công')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleRejectAddFriend = async (from) => {
    try {
      dispatch(rejectFriendRequest(from))
      toast.info('Đã hủy kết bạn')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
      <Tooltip title='Lời mời'>
        <IconButton
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
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <List sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper' }}>
          {!error ? (
            requests?.length > 0 ? (
              requests.map((request) => (
                <ListItem alignItems='flex-start' key={request._id} sx={{ cursor: 'pointer' }}>
                  <ListItemAvatar onClick={() => navigate(`/personal/${request.from._id}`)}>
                    <Avatar alt='Remy Sharp' src={request.from?.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${formatFullname(request.from?.firstname, request.from?.lastname) || 'Người dùng'} đã gửi cho bạn lời mời kết bạn`}
                    secondary={
                      <FlexRow gap={2} alignItems='center'>
                        <Button variant='contained' sx={{ flex: 1 }} onClick={() => handleAcceptAddFriend(request.from)}>
                          Đồng ý
                        </Button>
                        <Button variant='outlined' sx={{ flex: 1 }} onClick={() => handleRejectAddFriend(request.from)}>
                          Từ chối
                        </Button>
                      </FlexRow>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <List sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper' }}>
                <ListItem alignItems='flex-start'>
                  <ListItemText primary='Không có yêu cầu kết bạn nào' />
                </ListItem>
              </List>
            )
          ) : (
            <div>Lỗi khi tải yêu cầu</div>
          )}
        </List>
      </Menu>
    </>
  )
}

export default RequestButton
