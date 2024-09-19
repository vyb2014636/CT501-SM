import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Menu, Tooltip, Typography } from '@mui/material'
import FlexBetween from '../Flex/FlexBetween'
import FlexArrow from '../Flex/FlexArround'
import FlexRow from '../Flex/FlexRow'
import { acceptAddFriendAPI, getRequests } from '@/apis/user/userAPI'
import { formatFullname } from '@/utils/helpers'
import { toast } from 'react-toastify'
const ChatButton = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [requests, setRequests] = useState([])
  const [error, setError] = useState(false)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const fetchRequests = async () => {
    try {
      const response = await getRequests()
      setRequests(response.listRequest)
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleAcceptAddFriend = async (requestId) => {
    try {
      const respone = await acceptAddFriendAPI(requestId)
      fetchRequests()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleRejectAddFriend = async (requestId) => {
    console.log(requestId)
    // try {
    //   await acceptAddFriendAPI()
    //   fetchRequests()
    // } catch (error) {
    //   toast.error(error.message)
    // }
  }
  return (
    <>
      <Tooltip title='Bạn bè'>
        <IconButton
          onClick={handleClick}
          aria-controls={open ? 'friends' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          size='small'>
          <PeopleAltOutlinedIcon color='primary' fontSize='medium' />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <List sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper' }}>
          {!error ? (
            requests?.length > 0 ? (
              requests.map((request) => (
                <ListItem alignItems='flex-start' key={request._id}>
                  <ListItemAvatar>
                    <Avatar alt='Remy Sharp' src={request.from?.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${formatFullname(request.from?.firstname, request.from?.lastname) || 'Người dùng'} đã gửi cho bạn lời mời kết bạn`}
                    secondary={
                      <FlexRow gap={2} alignItems='center'>
                        <Button variant='contained' sx={{ flex: 1 }} onClick={() => handleAcceptAddFriend(request._id)}>
                          Đồng ý
                        </Button>
                        <Button variant='outlined' sx={{ flex: 1 }} onClick={() => handleRejectAddFriend(request._id)}>
                          Xóa
                        </Button>
                      </FlexRow>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <div>Không có yêu cầu nào</div>
            )
          ) : (
            <div>Lỗi khi tải yêu cầu</div>
          )}
          <Divider variant='inset' component='li' />
        </List>
      </Menu>
    </>
  )
}

export default ChatButton
