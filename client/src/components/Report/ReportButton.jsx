import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import { IconButton, List, ListItemButton, ListItemSecondaryAction, ListItemText, Typography, TextField, Collapse, Button, Box } from '@mui/material'
import ModalWrapper from '../Common/Modal/ModalWrapper'
import CloseIcon from '@mui/icons-material/Close'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore' // Biểu tượng đổ xuống
import { sendReport } from '@/apis/report/reportAPI'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const reasons = ['Nội dung không phù hợp', 'Ngôn từ thù địch', 'Spam', 'Vấn đề liên quan đến người dưới 18 tuổi', 'Khác']

const ReportButton = ({ setAnchorEl, post, userPost }) => {
  const [openReport, setOpenReport] = useState(false)
  const [selectedReason, setSelectedReason] = useState('')
  const [customReason, setCustomReason] = useState('')
  const [showCustomReason, setShowCustomReason] = useState(false)
  const { user } = useSelector((state) => state.auth)

  const handleOpenReport = () => {
    setOpenReport(true)
  }

  const handleCloseReport = () => {
    setCustomReason('')
    setShowCustomReason(false)
    setAnchorEl(null)
    setOpenReport(false)
  }

  const handleReasonSelect = async (reason) => {
    if (reason === 'Khác') {
      setShowCustomReason(!showCustomReason)
    } else {
      try {
        const response = await sendReport(user._id, userPost._id, post._id, reason)
        toast.success(response.message)
        handleCloseReport()
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  const handleSubmit = async () => {
    const reasonToSend = customReason

    try {
      const response = await sendReport(user._id, userPost._id, post._id, reasonToSend)
      toast.success(response.message)
      handleCloseReport()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <MenuItem onClick={handleOpenReport}>
        <ReportProblemOutlinedIcon />
        <Typography ml={1}>Báo cáo</Typography>
      </MenuItem>

      <ModalWrapper open={openReport} onClose={handleCloseReport} title='Báo cáo'>
        <IconButton
          aria-label='close'
          onClick={handleCloseReport}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}>
          <CloseIcon />
        </IconButton>
        <Typography variant='body1' sx={{ marginBottom: 2, p: 3 }}>
          <strong>Tại sao bạn báo cáo quảng cáo này?</strong> Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy tìm sự giúp đỡ trước
          khi báo cáo với chúng tôi.
        </Typography>
        <List>
          {reasons.map((reason, index) => (
            <ListItemButton key={index} onClick={() => handleReasonSelect(reason)}>
              <ListItemText primary={reason} />
              <ListItemSecondaryAction>
                {reason === 'Khác' ? showCustomReason ? <ExpandMoreIcon /> : <ChevronRightIcon /> : <ChevronRightIcon />}
              </ListItemSecondaryAction>
            </ListItemButton>
          ))}
        </List>

        <Collapse in={showCustomReason}>
          <Box p={2}>
            <TextField
              label='Lý do khác'
              variant='outlined'
              fullWidth
              required
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              sx={{ mt: 2 }} // Thêm margin-top để tạo khoảng cách
            />
            <Button variant='contained' onClick={handleSubmit} fullWidth sx={{ mt: 2 }}>
              Gửi
            </Button>
          </Box>
        </Collapse>
      </ModalWrapper>
    </>
  )
}

export default ReportButton
