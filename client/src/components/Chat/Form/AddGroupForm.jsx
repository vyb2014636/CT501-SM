import React, { memo, useState } from 'react'
import FlexBetween from '@/components/Common/Flex/FlexBetween'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'
import { Button, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createGroupChat } from '@/features/chat/chatThunk'
import { toast } from 'react-toastify'
import { closeBackdrop, openBackdrop } from '@/features/loading/loadingSlice'

const AddGroupForm = ({ currentUser, handleCloseAddGroup }) => {
  const [groupName, setGroupName] = useState('')
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const [checked, setChecked] = useState([])
  const [selectedImage, setSelectedImage] = useState(null) // State để lưu hình ảnh đã chọn

  const handleChangeName = (name) => {
    setGroupName(name)
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]
    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreateGroup = async () => {
    if (!groupName.trim() || checked.length === 0) return // Kiểm tra trước khi gửi
    try {
      dispatch(openBackdrop())

      dispatch(createGroupChat({ users: checked, chatName: groupName, avatar: selectedImage }))
      // await dispatch(createGroupChat(formData)).unwrap()
      toast.success('Tạo thành công')
      handleCloseAddGroup()
    } catch (error) {
      console.log(error)
      toast.error('Đã xảy ra lỗi, vui lòng thử lại')
    } finally {
      dispatch(closeBackdrop())
    }
  }

  const listFriend = currentUser.friends
  return (
    <Box sx={{ p: 2 }}>
      <FlexBetween gap={2} p={4} height={80}>
        <label htmlFor='group-image'>
          <input style={{ display: 'none' }} id='group-image' type='file' accept='image/*' onChange={handleImageChange} />
          {selectedImage ? (
            <Avatar src={selectedImage} sx={{ height: 56, width: 56 }} /> // Hiển thị hình ảnh đã chọn
          ) : (
            <IconButton component='span'>
              <CameraAltOutlinedIcon />
            </IconButton>
          )}
        </label>
        <TextField
          placeholder='Tên nhóm (Bắt buộc phải có)'
          variant='standard'
          fullWidth
          value={groupName}
          onChange={(e) => handleChangeName(e.target.value)}
          disabled={disabled}
          InputProps={{
            disableUnderline: true
          }}
        />
        <Box>
          {groupName &&
            (!disabled ? (
              <IconButton onClick={() => setDisabled(true)}>
                <DoneOutlinedIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => setDisabled(false)}>
                <CloseOutlinedIcon />
              </IconButton>
            ))}
        </Box>
      </FlexBetween>
      <FlexColumn>
        <Typography fontWeight='bold' p={3} color='primary' variant='h6'>
          Bạn bè
        </Typography>
        <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {listFriend.map((friend) => {
            const labelId = `checkbox-list-secondary-label-${friend._id}`
            return (
              <ListItem
                key={friend._id} // Sử dụng trường _id duy nhất làm key
                secondaryAction={
                  <Checkbox
                    edge='end'
                    onChange={handleToggle(friend)}
                    checked={checked.includes(friend)}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                }
                disablePadding>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt={`Avatar of ${friend.fullname}`} src={friend.avatar} />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={friend.fullname} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </FlexColumn>
      <Button variant='contained' fullWidth onClick={handleCreateGroup} disabled={checked.length <= 0 || groupName.trim() === '' || !disabled}>
        Tạo
      </Button>
    </Box>
  )
}

export default memo(AddGroupForm)
