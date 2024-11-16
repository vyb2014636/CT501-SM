import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material'

const ConfirmDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận xóa thành viên</DialogTitle>
      <DialogContent>
        <Typography>Bạn có chắc chắn muốn xóa thành viên này khỏi nhóm không?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Hủy
        </Button>
        <Button onClick={onConfirm} color='secondary'>
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
