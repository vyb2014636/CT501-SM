import React, { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'
import ConfirmationDialog from '@/components/Common/ConfirmationDialog/ConfirmationDialog'
import ModalWrapper from '@/components/Common/Modal/ModalWrapper'
import WarningForm from '../Form/WarningForm'

const UserMenu = ({ anchorEl, onClose, user }) => {
  const open = Boolean(anchorEl)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [openWarning, setOpenWarning] = useState(false)
  const [actionType, setActionType] = useState('')

  const navigate = useNavigate()

  const handleConfirm = () => {
    if (actionType === 'edit') {
      navigate(`/admin/user/${user._id}`, { state: { user } })
    } else if (actionType === 'delete') {
      console.log(`Xóa người dùng với ID: ${user._id}`)
    }
    setDialogOpen(false)
  }

  const renderConfirmationDialog = () => (
    <ConfirmationDialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      onConfirm={handleConfirm} // Gọi hàm xử lý xác nhận
      title={actionType === 'edit' ? 'Xác nhận chỉnh sửa' : 'Xác nhận xóa'} // Tiêu đề khác nhau cho mỗi hành động
      message={`Bạn có chắc chắn muốn ${actionType === 'edit' ? 'chỉnh sửa' : 'xóa'} thông tin người dùng này?`}
      name={user?.fullname}
    />
  )

  const renderWarningModal = () => (
    <ModalWrapper open={openWarning} onClose={() => setOpenWarning(false)} title='Cảnh báo'>
      <WarningForm />
    </ModalWrapper>
  )

  return (
    <>
      <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
        <MenuItem
          onClick={() => {
            setActionType('edit')
            setDialogOpen(true)
            onClose()
          }}>
          Chỉnh sửa
        </MenuItem>
        <MenuItem
          onClick={() => {
            setActionType('delete')
            setDialogOpen(true)
            onClose()
          }}>
          Xóa
        </MenuItem>
      </Menu>

      {renderConfirmationDialog()}
      {renderWarningModal()}
    </>
  )
}

export default UserMenu
