import React from 'react'
import { Skeleton, Box, Typography, Avatar } from '@mui/material'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import FlexRow from '@/components/Common/Flex/FlexRow'
import { scrollbarStyles } from '@/styles/styles'

const TrashCardSkeleton = () => {
  return (
    <Box bgcolor='background.paper' py={2} borderRadius={3} my={2}>
      {/* Skeleton cho tiêu đề ngày */}
      <Typography p={2} fontWeight='bold' variant='h6'>
        <Skeleton width='40%' />
      </Typography>
      <FlexColumn gap={2}>
        {/* Giả lập 3 bài viết trong TrashCard */}
        {[...Array(3)].map((_, index) => (
          <FlexRow key={index}>
            <FlexRow gap={3} width={1}>
              {/* Avatar Skeleton */}
              <Skeleton variant='circular'>
                <Avatar sx={{ height: 48, width: 48 }} />
              </Skeleton>

              {/* Nội dung bài viết */}
              <FlexColumn alignItems='start' width={1}>
                <Typography variant='body1'>
                  <Skeleton width='60%' />
                </Typography>
                <Typography variant='body2'>
                  <Skeleton width='40%' />
                </Typography>
              </FlexColumn>
            </FlexRow>
            {/* Nút MoreVert */}
            <Box ml='auto'>
              <Skeleton variant='circular' width={24} height={24} />
            </Box>
          </FlexRow>
        ))}
      </FlexColumn>
    </Box>
  )
}

export default TrashCardSkeleton
