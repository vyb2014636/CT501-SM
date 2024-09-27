import React, { useState } from 'react'
import { Modal, Box, IconButton } from '@mui/material'
import { ArrowBack, ArrowForward, Close } from '@mui/icons-material'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '600px',
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
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%' }}>
          {currentIndex > 0 && (
            <IconButton onClick={handlePrev} sx={{ position: 'absolute', left: 0 }}>
              <ArrowBack />
            </IconButton>
          )}
          {media[currentIndex].isVideo ? (
            <video src={media[currentIndex].url} controls autoPlay style={{ width: '100%', borderRadius: '8px' }} />
          ) : (
            <img src={media[currentIndex].url} alt='modal' style={{ width: '100%', borderRadius: '8px' }} />
          )}
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
