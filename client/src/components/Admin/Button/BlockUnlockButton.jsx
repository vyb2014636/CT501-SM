import React, { useState } from 'react'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import { updateStatusAPI } from '@/apis/user/userAPI'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import ConfirmationDialog from '@/components/Common/ConfirmationDialog/ConfirmationDialog'

const BlockUnlockButton = ({ status, isSet, setStatus, userId, setUsers, sx }) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleBlockUser = async (thisStatus) => {
    try {
      const response = await updateStatusAPI(userId, thisStatus)
      setDialogOpen(false)
      if (isSet) setStatus(thisStatus)
      setUsers((prevUsers) => prevUsers.map((user) => (user?._id === userId ? { ...user, status: thisStatus } : user)))
      toast.success(response.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      {status === 'Active' ? (
        <Button variant='contained' color='error' onClick={() => setDialogOpen(true)} sx={sx}>
          Khóa tài khoản
        </Button>
      ) : (
        <Button variant='contained' color='success' onClick={() => setDialogOpen(true)} sx={sx}>
          Mở tài khoản
        </Button>
      )}

      <ConfirmationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={status === 'Active' ? () => handleBlockUser('Banned') : () => handleBlockUser('Active')}
        title={status === 'Active' ? 'Xác nhận khóa' : 'Xác nhận mở tài khoản'} // Tiêu đề khác nhau cho mỗi hành động
        message={`Bạn có chắc chắn muốn ${status === 'Active' ? 'khóa' : 'mở'} tài khoản người dùng này?`}
      />
    </>
  )
}

export default BlockUnlockButton
