import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined'
import ModalWrapper from '@/components/Common/Modal/ModalWrapper'
import { getHistoryForUser } from '@/apis/user/userAPI'
import FlexRow from '@/components/Common/Flex/FlexRow'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import ViewPostLog from './ViewPostLog'
import FlexBetween from '@/components/Common/Flex/FlexBetween'
import BlockUnlockButton from './BlockUnlockButton'
import { TextField } from '@mui/material'

const ViewHistoryButton = ({ user, setUsers }) => {
  const [open, setOpen] = useState(false)
  const [userLogs, setUserLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [status, setStatus] = useState('')
  const [startDate, setStartDate] = useState(null) // Start date for filter
  const [endDate, setEndDate] = useState(null) // End date for filter
  const [dateError, setDateError] = useState('') // Error message for date validation

  const today = new Date().toISOString().split('T')[0] // Get today date in YYYY-MM-DD format

  const handleOpen = async (userId) => {
    setOpen(true)
    setLoading(true)
    try {
      const response = await getHistoryForUser(userId)
      setUserLogs(response.activities)
      setStatus(user.status)
      setLoading(false)
    } catch (error) {
      console.log(error.message)
      setError(true)
    }
  }

  const renderAction = (log) => {
    if (log.action === 'CREATE_POST' || log.action === 'REPORT_POST' || log.action === 'CREATE_POST') {
      return <ViewPostLog postLog={log?.post} />
    }
    return null
  }

  const handleClose = () => setOpen(false)

  // Function to filter logs based on selected date range
  const filterLogsByDate = (logs) => {
    if (!startDate && !endDate) return logs // No filtering if both dates are null

    return logs.filter((log) => {
      const logDate = new Date(log._id)
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate) : null

      return (!start || logDate >= start) && (!end || logDate <= end)
    })
  }

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value
    setStartDate(newStartDate)

    // Check if startDate is greater than endDate
    if (endDate && new Date(newStartDate) > new Date(endDate)) {
      setDateError('Ngày bắt đầu không thể lớn hơn ngày kết thúc.')
    } else {
      setDateError('')
    }
  }

  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value
    setEndDate(newEndDate)

    // Check if endDate is smaller than startDate
    if (startDate && new Date(newEndDate) < new Date(startDate)) {
      setDateError('Ngày kết thúc không thể nhỏ hơn ngày bắt đầu.')
    } else {
      setDateError('')
    }
  }

  if (loading) return <Typography>...loading</Typography>

  if (error) return <Typography>Lỗi không lấy được dữ liệu</Typography>

  const filteredLogs = filterLogsByDate(userLogs)

  return (
    <>
      <IconButton onClick={() => handleOpen(user._id)}>
        <ScheduleOutlinedIcon />
      </IconButton>
      <ModalWrapper open={open} onClose={handleClose} title='Lịch sử hoạt động'>
        {!loading && (
          <BlockUnlockButton
            status={status}
            isSet
            setStatus={setStatus}
            userId={user._id}
            sx={{ position: 'absolute', right: 2, top: 2 }}
            setUsers={setUsers}
          />
        )}
        <FlexColumn overflow='auto' height={700} bgcolor='background.default'>
          {/* Date filter inputs */}
          <FlexRow gap={2} mb={2} p={3}>
            <TextField
              label='Từ ngày'
              type='date'
              value={startDate || ''}
              onChange={handleStartDateChange}
              InputLabelProps={{ shrink: true }}
              sx={{ width: '200px' }}
              max={today} // Max date should be today
            />
            <TextField
              label='Đến ngày'
              type='date'
              value={endDate || ''}
              onChange={handleEndDateChange}
              InputLabelProps={{ shrink: true }}
              sx={{ width: '200px' }}
              max={today} // Max date should be today
            />
          </FlexRow>

          {dateError && <Typography color='error'>{dateError}</Typography>}

          {filteredLogs.length > 0 ? (
            filteredLogs.map((userLog) => (
              <FlexColumn key={userLog._id} sx={{ mb: 2, p: 2, bgcolor: 'background.paper' }}>
                <Typography p={2} fontWeight='bold'>
                  {userLog._id}
                </Typography>
                {userLog.activities?.map((active) => (
                  <FlexBetween sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, mb: 2, ml: 2 }} key={active._id}>
                    <Box>
                      <FlexRow gap={2}>
                        <Typography variant='body1' fontWeight='bold'>
                          {active.user?.fullname || 'Người dùng không xác định'}
                        </Typography>
                        <Typography variant='body2' color='textSecondary'>
                          {new Date(active.createdAt).toLocaleString()}
                        </Typography>
                      </FlexRow>
                      <Typography variant='body2' sx={{ mt: 1 }}>
                        {active.details}
                      </Typography>
                    </Box>
                    {renderAction(active)}
                  </FlexBetween>
                ))}
              </FlexColumn>
            ))
          ) : (
            <Typography>Không có hoạt động nào trong khoảng thời gian này</Typography>
          )}
        </FlexColumn>
      </ModalWrapper>
    </>
  )
}

export default ViewHistoryButton
