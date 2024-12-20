import React, { cloneElement, useState } from 'react'
import ModalWrapper from '@/components/Common/Modal/ModalWrapper'
import Box from '@mui/material/Box'
import ReportCard from '../Card/ReportCard'
import { scrollbarStyleMui } from '@/styles/styles'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import { hiddenPostByAdminAPI, unVioletAPI } from '@/apis/report/reportAPI'
import FlexCenter from '@/components/Common/Flex/FlexCenter'

const ViewReportButton = ({ report, setReports, view, children }) => {
  const [openPost, setOpenPost] = useState(false)

  const handleOpenPost = () => setOpenPost(true)
  const handleClosePost = () => setOpenPost(false)

  const handleHiddenPost = async (report) => {
    try {
      const response = await hiddenPostByAdminAPI(report._id, 'hidden', 'hiddenPost')
      toast.success(response.message)
      setReports((prevReports) =>
        prevReports.map((report) => (report?.post?._id === response.report.post._id ? { ...report, status: response.report.status } : report))
      )
      handleClosePost()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleUnViolation = async (report) => {
    try {
      const response = await unVioletAPI(report._id)
      toast.success(response.message)
      setReports((prevReports) =>
        prevReports.map((report) => (report?.post?._id === response.report.post._id ? { ...report, status: response.report.status } : report))
      )
      handleClosePost()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleRestorePost = async (report) => {
    try {
      const response = await hiddenPostByAdminAPI(report._id, 'normal', 'restorePost')
      toast.success(response.message)
      setReports((prevReports) =>
        prevReports.map((report) => (report?.post?._id === response.report.post._id ? { ...report, status: response.report.status } : report))
      )
      handleClosePost()
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
      {/* <Box onClick={handleOpenPost}>{children}</Box> */}
      {cloneElement(children, { onClick: handleOpenPost })}

      <ModalWrapper open={openPost} onClose={handleClosePost} title='Bài đăng bị khiếu nại'>
        <Box overflow='auto' p={4} sx={{ ...scrollbarStyleMui }}>
          <ReportCard reportPost={report.post} report={report} />
        </Box>
        {!view && (
          <FlexCenter gap={2} p={2}>
            {report.status === 'pending' ? (
              <>
                <Button color='warning' variant='contained' onClick={() => handleHiddenPost(report)}>
                  Xử lý ẩn bài đăng
                </Button>
                <Button color='warning' variant='contained' onClick={() => handleUnViolation(report)}>
                  Không vi phạm
                </Button>
              </>
            ) : (
              <>
                <Button color='primary' variant='contained' onClick={() => handleRestorePost(report)}>
                  Phục hồi bài đăng
                </Button>
              </>
            )}
          </FlexCenter>
        )}
      </ModalWrapper>
    </>
  )
}

export default ViewReportButton
