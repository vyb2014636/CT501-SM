import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { formatFullname } from '@/utils/helpers'
import { useSelector } from 'react-redux'
import { cancelFriendAPI, getRequests, sendFriendAPI } from '@/apis/user/userAPI'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const FollowerCard = ({ userNoFriend, id }) => {
  const [existRequest, setExistRequest] = useState(null)
  const [changeButton, setChangeButton] = useState(true)
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const handleSendFriendRequest = async () => {
    try {
      await sendFriendAPI({ to: userNoFriend._id })
      setChangeButton(false)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleCancelFriendRequest = async () => {
    try {
      await cancelFriendAPI({ to: userNoFriend._id })
      setChangeButton(true)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <List sx={{ bgcolor: 'background.paper' }} key={id}>
      <ListItem>
        <ListItemAvatar
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          onClick={() => navigate(`/${userNoFriend._id}`)}>
          <Avatar alt={userNoFriend.lastname} src={userNoFriend.avatar} sx={{ height: 46, width: 46 }} />
        </ListItemAvatar>
        <ListItemText primary={formatFullname(userNoFriend.firstname, userNoFriend.lastname)} secondary={`@${userNoFriend.firstname}`} />
        {/* {renderButton(existRequest)} */}
        {changeButton ? (
          <Button variant='contained' sx={{ borderRadius: 12 }} onClick={handleSendFriendRequest}>
            Kết bạn
          </Button>
        ) : (
          <Button variant='outlined' sx={{ borderRadius: 12 }} onClick={handleCancelFriendRequest}>
            Hủy kết bạn
          </Button>
        )}
      </ListItem>
    </List>
  )
}

export default FollowerCard
