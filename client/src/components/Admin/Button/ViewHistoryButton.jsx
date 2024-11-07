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

const ViewHistoryButton = ({ user, setUsers }) => {
  const [open, setOpen] = useState(false)
  const [userLogs, setUserLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [status, setStatus] = useState('')

  const handleOpen = async (userId) => {
    setOpen(true)
    setLoading(true)
    try {
      const response = await getHistoryForUser(userId)
      setUserLogs(response.logs)
      setStatus(user.status)
      setLoading(false)
    } catch (error) {
      console.log(error.message)
      setError(true)
    }
  }

  const renderAction = (log) => {
    if (log.action === 'CREATE_POST' || log.action === 'REPORT_POST' || log.action === 'CREATE_POST') return <ViewPostLog postLog={log?.post} />
    else return
  }

  const handleClose = () => setOpen(false)

  if (loading) <Typography>...loading</Typography>

  if (error) <Typography>Lỗi không lấy được dữ liệu</Typography>

  return (
    <>
      <IconButton onClick={() => handleOpen(user._id)}>
        <ScheduleOutlinedIcon />
      </IconButton>
      <ModalWrapper open={open} onClose={handleClose} title='Lịch sử hoạt động'>
        <FlexColumn p={2} overflow='auto' height={1}>
          {userLogs.length > 0 ? (
            userLogs.map((userLog) => (
              <FlexBetween key={userLog._id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                <Box>
                  <FlexRow gap={2}>
                    <Typography variant='body1' fontWeight='bold'>
                      {userLog.user?.fullname || 'Người dùng không xác định'}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {new Date(userLog.createdAt).toLocaleString()}
                    </Typography>
                  </FlexRow>
                  <Typography variant='body2' sx={{ mt: 1 }}>
                    {userLog.details}
                  </Typography>
                </Box>
                {renderAction(userLog)}
              </FlexBetween>
            ))
          ) : (
            <Typography>Không có lịch sử</Typography>
          )}
        </FlexColumn>
        <BlockUnlockButton
          status={status}
          isSet
          setStatus={setStatus}
          userId={user._id}
          sx={{ position: 'absolute', right: 2, top: 2 }}
          setUsers={setUsers}
        />
      </ModalWrapper>
    </>
  )
}

export default ViewHistoryButton
