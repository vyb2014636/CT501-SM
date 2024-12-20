import React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { styleModal } from '@/styles/styles'
import avatarDF from '@/assets/avatarDefault.png'

const ViewAvatarModal = ({ openViewAvatar, setOpenViewAvatar, avatar }) => {
  const handleCloseModal = () => setOpenViewAvatar(false)

  return (
    <Modal open={openViewAvatar} onClose={handleCloseModal} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={styleModal}>
        <img src={avatar || avatarDF} alt='modal-avatar' style={{ objectFit: 'fill', width: '100%' }} />
      </Box>
    </Modal>
  )
}

export default ViewAvatarModal
