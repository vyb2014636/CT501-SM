import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import RemoveRedEye from '@mui/icons-material/RemoveRedEye'
import ModalWrapper from '@/components/Common/Modal/ModalWrapper'
import FlexRow from '@/components/Common/Flex/FlexRow'
import ViewReportButton from './ViewReportButton'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import { Chip } from '@mui/material'

const ViewViolationReportsButton = ({ ViolationReports }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  console.log(ViolationReports)
  return (
    <>
      <Tooltip title='Xem danh sách báo cáo sai'>
        <IconButton onClick={handleOpen}>
          <RemoveRedEye />
        </IconButton>
      </Tooltip>
      <ModalWrapper open={open} onClose={handleClose} title='Danh sách báo cáo sai'>
        {ViolationReports.length > 0 && (
          <FlexColumn p={2} gap={2}>
            {ViolationReports.map((violationReport, index) => (
              <FlexRow>
                <Box flex={1} p={4}>
                  {index + 1}
                </Box>
                <Box flex={9}>{violationReport.reason}</Box>
                <Box flex={4}>
                  <Chip label={violationReport.isValidation ? 'Vi phạm' : 'Không vi phạm'} color='error' />
                </Box>
                <Box flex={1}>
                  <ViewReportButton report={violationReport} view>
                    <Tooltip title='Xem bài đăng'>
                      <IconButton>
                        <RemoveRedEye />
                      </IconButton>
                    </Tooltip>
                  </ViewReportButton>
                </Box>
              </FlexRow>
            ))}
          </FlexColumn>
        )}
      </ModalWrapper>
    </>
  )
}

export default ViewViolationReportsButton
