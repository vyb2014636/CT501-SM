import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import List from '@mui/material/List'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { formatFullname } from '@/utils/helpers'
import { useDispatch } from 'react-redux'
import { cancelFriendRequest, sendFriendRequest } from '@/features/request/requestThunk'

const SuggestionCard = ({ userNoFriend }) => {
  const [changeButton, setChangeButton] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSendFriendRequest = async () => {
    try {
      dispatch(sendFriendRequest(userNoFriend._id))
      setChangeButton(false)
    } catch (error) {
      setChangeButton(true)
      toast.error(error.message)
    }
  }

  const handleCancelFriendRequest = async () => {
    try {
      dispatch(cancelFriendRequest(userNoFriend._id))
      setChangeButton(true)
    } catch (error) {
      setChangeButton(false)
      toast.error(error.message)
    }
  }

  return (
    <ListItem sx={{ width: 1, gap: 2 }}>
      <ListItemAvatar
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        onClick={() => navigate(`/personal/${userNoFriend._id}`)}>
        <Avatar alt={userNoFriend.lastname} src={userNoFriend.avatar} />
      </ListItemAvatar>
      <ListItemText primary={formatFullname(userNoFriend.firstname, userNoFriend.lastname)} secondary={`@${userNoFriend.firstname}`} />
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
  )
}

export default SuggestionCard
