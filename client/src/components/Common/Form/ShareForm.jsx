import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'
import FlexRow from '../Flex/FlexRow'
import FlexColumn from '../Flex/FlexColumn'
import { formatFullname } from '@/utils/helpers'
import DescibeTextField from '../TextField/DescibeTextField'

const ShareForm = ({ user, descibeShare, setDescribeShare, handleSubmitShare }) => {
  return (
    <Box p={4} sx={{ overflowY: 'auto' }}>
      <FlexRow sx={{ alignItems: 'flex-start', gap: '12px', mb: 2 }}>
        <Avatar alt={user.lastname} src={user.avatar} sx={{ width: 36, height: 36 }} />
        <Typography variant='subtitle1' fontWeight='bold'>
          {formatFullname(user.firstname, user.lastname)}
        </Typography>
      </FlexRow>

      <DescibeTextField placeholder='Hãy nói gì đó về nội dung này (không bắt buộc)' content={descibeShare} setContent={setDescribeShare} />

      <FlexColumn sx={{ justifyContent: 'flex-end', alignItems: 'end', gap: '12px' }}>
        <IconButton>
          <span role='img' aria-label='emoji' style={{ color: '#fff' }}>
            😊
          </span>
        </IconButton>
        <Button variant='contained' color='primary' onClick={handleSubmitShare}>
          Chia sẻ ngay
        </Button>
      </FlexColumn>
    </Box>
  )
}

export default ShareForm
