// ModalWrapper.jsx
import React from 'react'
import Modal from '@mui/material/Modal'
import Divider from '@mui/material/Divider'
import FlexColumn from '../Flex/FlexColumn'
import { styleModal } from '@/styles/styles'
import { Typography } from '@mui/material'

const ModalWrapper = ({ open, onClose, title, modal, height, maxHeight = 650, width = 600, maxWidth = 600, style, children }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby={`modal-${modal}-label`} aria-describedby={`modal-${modal}-description`}>
      <FlexColumn
        sx={{
          ...styleModal,
          height: height,
          maxHeight: maxHeight,
          width: width,
          maxWidth: { xs: 400, md: maxWidth },
          p: 0,
          pb: 2,
          overflow: 'hidden',
          boxShadow: 4,
          ...style
        }}>
        <Typography align='center' fontWeight={900} variant='h6' my={2} padding={0}>
          {title}
        </Typography>

        <Divider />
        {children}
      </FlexColumn>
    </Modal>
  )
}

export default ModalWrapper
