import React, { useState } from 'react'
import { Modal, Box, IconButton } from '@mui/material'
import { ArrowBack, ArrowForward, Close } from '@mui/icons-material'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 600,
  height: 600,
  maxHeight: 600,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4
}

const ModalMedia = ({ open, handleClose, media, currentIndex, setCurrentIndex }) => {
  if (!media || media.length === 0) return null

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length)
  }
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
          <Close />
        </IconButton>
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', height: 1 }}>
          {currentIndex > 0 && (
            <IconButton onClick={handlePrev} sx={{ position: 'absolute', left: 0 }}>
              <ArrowBack />
            </IconButton>
          )}

          <Box
            sx={{
              cursor: 'pointer',
              objectFit: 'fill',
              width: 1,
              height: 1,
              border: '1px solid rgba(0, 0, 0, 0.1)' // Thêm border nhẹ
            }}
            component={media[currentIndex].isVideo ? 'video' : 'img'}
            src={media[currentIndex].url}
            controls={media[currentIndex].isVideo}
            loading='lazy'
          />

          {currentIndex < media?.length - 1 && (
            <IconButton onClick={handleNext} sx={{ position: 'absolute', right: 0 }}>
              <ArrowForward />
            </IconButton>
          )}
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalMedia
