import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, Checkbox, Avatar } from '@mui/material'

const AddMembersModal = ({ open, onClose, friends, onAddMembers }) => {
  const [selectedMembers, setSelectedMembers] = useState([])

  const handleToggle = (friendId) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(friendId) ? prevSelected.filter((id) => id !== friendId) : [...prevSelected, friendId]
    )
  }

  const handleAdd = () => {
    onAddMembers(selectedMembers)
    setSelectedMembers([])
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Thêm thành viên</DialogTitle>
      <DialogContent>
        <List>
          {friends?.length > 0 ? (
            friends.map((friend) => (
              <ListItem key={friend._id} button onClick={() => handleToggle(friend._id)}>
                <Avatar src={friend.avatar} />
                <ListItemText primary={friend.fullname} />
                <Checkbox edge='end' checked={selectedMembers.includes(friend._id)} />
              </ListItem>
            ))
          ) : (
            <ListItem>Không có bạn bè nào có thể thêm</ListItem>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleAdd} color='primary' variant='contained'>
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddMembersModal
