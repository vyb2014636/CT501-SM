import React, { useState } from 'react'
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { scrollbarStyleMui } from '@/styles/styles'
import ModalWrapper from '@/components/Common/Modal/ModalWrapper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FlexRow from '@/components/Common/Flex/FlexRow'
import ViewReportButton from './ViewReportButton'

const ViewReplyReportButton = ({ report, setReports }) => {
  const [openReplyReport, setOpenReplyReport] = useState(false)

  const handleOpenReplyReport = () => setOpenReplyReport(true)
  const handleCloseReplyReport = () => setOpenReplyReport(false)

  const handleViewReport = () => {
    handleCloseReplyReport(false)
  }

  return (
    <>
      <Tooltip title='Xem phản hồi'>
        <IconButton onClick={handleOpenReplyReport}>
          <ReplyOutlinedIcon />
        </IconButton>
      </Tooltip>
      <ModalWrapper open={openReplyReport} onClose={handleCloseReplyReport} title='Danh sách phản hồi cho báo cáo'>
        <Box overflow='auto' p={4} sx={{ ...scrollbarStyleMui }}>
          {report.replies && report.replies.length > 0 ? (
            <>
              {report.replies.map((reply) => (
                <Box key={reply._id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                  <FlexRow gap={2}>
                    <Typography variant='body1' fontWeight='bold'>
                      {reply.user?.fullname || 'Người dùng không xác định'}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {new Date(reply.createdAt).toLocaleString()}
                    </Typography>
                  </FlexRow>
                  <Typography variant='body2' sx={{ mt: 1 }}>
                    {reply.content}
                  </Typography>
                </Box>
              ))}
              <FlexRow>
                <ViewReportButton report={report} setReports={setReports}>
                  <Button>Xem lại báo cáo</Button>
                </ViewReportButton>
              </FlexRow>
            </>
          ) : (
            <Typography variant='body2' color='textSecondary'>
              Chưa có phản hồi nào cho báo cáo này.
            </Typography>
          )}
        </Box>
      </ModalWrapper>
    </>
  )
}

export default ViewReplyReportButton
