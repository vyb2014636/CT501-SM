import React, { useState } from 'react'
import ModalWrapper from '@/components/Common/Modal/ModalWrapper'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PostCard from '@/components/Common/PostCard/PostCard'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { RemoveRedEye } from '@mui/icons-material'
import ReportCard from '../Card/ReportCard'
import { scrollbarStyleMui } from '@/styles/styles'
import { Button } from '@mui/material'
import { deletePostByAdmin } from '@/apis/report/reportAPI'
import { toast } from 'react-toastify'

const ViewWarningsButton = () => {
  const [openPost, setOpenWarnings] = useState(false)

  const handleOpenWarnings = () => setOpenWarnings(true)
  const handleClosePost = () => setOpenWarnings(false)

  return (
    <>
      <Tooltip title='Xem danh sách các vi phạm'>
        <IconButton onClick={handleOpenWarnings}>
          <RemoveRedEye />
        </IconButton>
      </Tooltip>
      <ModalWrapper open={openPost} onClose={handleClosePost} title='Bài đăng bị khiếu nại'></ModalWrapper>
    </>
  )
}

export default ViewWarningsButton
