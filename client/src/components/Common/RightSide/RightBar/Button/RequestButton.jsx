import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import List from '@mui/material/List'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import FlexRow from '@components/Common/Flex/FlexRow'
import { formatFullname } from '@/utils/helpers'
import { acceptAddFriendAPI, getRequests, rejectAddFriendAPI } from '@/apis/user/userAPI'

const RequestButton = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [requests, setRequests] = useState([])
  const [error, setError] = useState(false)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
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
      const response = await acceptAddFriendAPI(requestId)
      toast.success(response.message)
      fetchRequests()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleRejectAddFriend = async (requestId) => {
    try {
      console.log(requestId)
      const response = await rejectAddFriendAPI(requestId)
      toast.info(response.message)
      fetchRequests()
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
          <PeopleAltOutlinedIcon color='primary' fontSize='medium' />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <List sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper' }}>
          {!error ? (
            requests?.length > 0 ? (
              requests.map((request) => (
                <ListItem alignItems='flex-start' key={request._id} sx={{ cursor: 'pointer' }}>
                  <ListItemAvatar onClick={() => navigate(`/${request.from._id}`)}>
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
