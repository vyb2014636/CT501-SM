import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import { toast } from 'react-toastify'
import { respondToReportAPI } from '@/apis/report/reportAPI'

const ReplyWarningForm = ({ reportId }) => {
  const [content, setContent] = useState('')

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error('Vui lòng nhập phản hồi')
      return
    }

    try {
      const response = await respondToReportAPI(reportId, content)
      toast.success(response.message)
      setContent('')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <FlexColumn borderRadius={4} p={2} sx={{ backgroundColor: 'background.paper' }} gap={2}>
      <Typography align='center' variant='body1' fontWeight='bold' color='red'>
        Bài đăng này đã bị ẩn do vi phạm nếu bạn có thắc mắc gì thì vui lòng gửi thông tin vào đây, bạn có thể gửi tối đa 5 phản hồi.
      </Typography>
      <TextField
        type='text'
        multiline
        rows={2}
        variant='outlined'
        placeholder='Vui lòng nhập phản hồi'
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Button variant='contained' sx={{ mx: 'auto' }} onClick={handleSubmit}>
        Gửi
      </Button>
    </FlexColumn>
  )
}

export default ReplyWarningForm
