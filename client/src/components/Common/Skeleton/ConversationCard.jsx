import React from 'react'
import { Skeleton } from '@mui/material'
import FlexColumn from '../Flex/FlexColumn'
import FlexBetween from '../Flex/FlexBetween'
import FlexCenter from '../Flex/FlexCenter'

const ConversationSkeleton = () => {
  return (
    <FlexColumn height={1}>
      {/* Skeleton cho phần Header */}
      <FlexBetween p={3}>
        <Skeleton variant='text' width={120} height={30} />
        <Skeleton variant='rectangular' width={100} height={30} />
      </FlexBetween>

      {/* Skeleton cho phần tìm kiếm */}
      <FlexCenter sx={{ backgroundColor: 'background.default', borderRadius: '20px', padding: '5px 10px', width: 1 }}>
        <Skeleton variant='circular' width={24} height={24} />
        <Skeleton variant='rectangular' width='80%' height={30} sx={{ marginLeft: 1 }} />
      </FlexCenter>

      {/* Skeleton cho danh sách cuộc trò chuyện */}
      <FlexColumn gap={2} py={2} sx={{ overflowY: 'auto', height: 1 }}>
        {[...Array(5)].map((_, index) => (
          <FlexBetween key={index} sx={{ padding: '10px 0' }}>
            <Skeleton variant='circle' width={40} height={40} />
            <FlexColumn sx={{ flex: 1, marginLeft: 2 }}>
              <Skeleton variant='text' width='60%' height={20} />
              <Skeleton variant='text' width='40%' height={15} />
            </FlexColumn>
            <Skeleton variant='rectangular' width={60} height={20} />
          </FlexBetween>
        ))}
      </FlexColumn>
    </FlexColumn>
  )
}
export default ConversationSkeleton
