import React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { styleModal } from '@/styles/styles'

const ModalAvartar = ({ openViewAvatar, setOpenViewAvatar, avatar }) => {
  const handleCloseModal = () => setOpenViewAvatar(false)

  return (
    <Modal open={openViewAvatar} onClose={handleCloseModal} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={styleModal}>
        <img src={avatar} alt='modal-avatar' style={{ objectFit: 'fill', width: '100%' }} />
      </Box>
    </Modal>
  )
}

export default ModalAvartar
