import ModalWrapper from '@/components/Common/Modal/ModalWrapper'
import PostCard from '@/components/Common/PostCard/PostCard'
import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { RemoveRedEye } from '@mui/icons-material'

const ViewPostLog = ({ postLog }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <Tooltip title='Xem bài đăng'>
        <IconButton onClick={handleOpen}>
          <RemoveRedEye />
        </IconButton>
      </Tooltip>
      <ModalWrapper open={open} onClose={handleClose} title='Lịch sử bài đăng'>
        <Box overflow='auto' p={4}>
          <PostCard post={postLog} />
        </Box>
      </ModalWrapper>
    </>
  )
}

export default ViewPostLog
