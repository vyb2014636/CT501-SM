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
const ViewReportButton = ({ report, setReports }) => {
  const [openPost, setOpenPost] = useState(false)

  const handleOpenPost = () => setOpenPost(true)
  const handleClosePost = () => setOpenPost(false)

  const handleDeletePostOfUser = async (report) => {
    try {
      const response = await deletePostByAdmin(report._id)
      toast.success(response.message)
      setReports((prevReports) =>
        prevReports.map(
          (r) =>
            r?.post?._id === response.report.post._id
              ? { ...r, status: response.report.status } // Cập nhật trạng thái
              : r // Giữ nguyên báo cáo không thay đổi
        )
      )
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <Tooltip title='Xem bài đăng'>
        <IconButton onClick={handleOpenPost}>
          <RemoveRedEye />
        </IconButton>
      </Tooltip>
      <ModalWrapper open={openPost} onClose={handleClosePost} title='Bài đăng bị khiếu nại'>
        <Button color='warning' variant='contained' sx={{ position: 'absolute', right: 6, top: 6 }} onClick={() => handleDeletePostOfUser(report)}>
          Gỡ bài đăng
        </Button>
        <Button color='warning' variant='contained' sx={{ position: 'absolute', left: 6, top: 6 }} onClick={() => handleDeletePostOfUser(report)}>
          Cảnh báo người gửi
        </Button>
        <Box overflow='auto' p={4} sx={{ ...scrollbarStyleMui }}>
          <ReportCard reportPost={report.post} />
        </Box>
      </ModalWrapper>
    </>
  )
}

export default ViewReportButton
