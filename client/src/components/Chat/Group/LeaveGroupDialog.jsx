import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, FormControl, Select, MenuItem } from '@mui/material'

const LeaveGroupDialog = ({ open, onClose, users, chat, currentUser, newAdmin, setNewAdmin, onLeaveGroup }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận rời nhóm</DialogTitle>
      <DialogContent>
        <Typography>
          {users?.length === 1 ? 'Vì chỉ còn bạn trong nhóm bạn có muốn giải tán nhóm' : 'Bạn có chắc chắn muốn rời khỏi nhóm này không'}
        </Typography>
        {users?.length > 1 && chat?.groupAdmin?._id === currentUser?._id && (
          <>
            Vui lòng chọn trưởng nhóm mới nếu bạn rời khỏi nhóm
            <FormControl fullWidth>
              <Select value={newAdmin ? newAdmin._id : ''} onChange={(e) => setNewAdmin(users.find((user) => user._id === e.target.value))}>
                {users
                  .filter((user) => user._id !== currentUser._id)
                  .map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.fullname}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Hủy
        </Button>
        <Button onClick={onLeaveGroup} color='secondary'>
          Rời
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LeaveGroupDialog
