// src/components/ConfirmationDialog.js
import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'

const ConfirmationDialog = ({ open, onClose, onConfirm, title, message, name }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
          <strong>{name}</strong>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color='primary' variant='contained'>
          Xác nhận
        </Button>
        <Button onClick={onClose} color='primary'>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
