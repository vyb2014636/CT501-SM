import React from 'react'
import Skeleton from '@mui/material/Skeleton'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import FlexRow from '@/components/Common/Flex/FlexRow'
import Box from '@mui/material/Box'

const FavoriteCardSkeleton = () => {
  return (
    <FlexColumn height={130} bgcolor='background.paper' p={3} borderRadius={3} my={3}>
      <FlexRow display='flex' alignItems='stretch' sx={{ width: 1, height: 1 }} gap={4}>
        <Skeleton
          variant='rectangular'
          width={100}
          height='100%'
          sx={{
            borderRadius: 3,
            boxShadow: 2
          }}
        />
        <FlexColumn sx={{ height: 1, flex: 1, justifyContent: 'space-between' }}>
          <FlexColumn>
            <Skeleton variant='text' height={32} width='70%' />
            <Skeleton variant='text' height={20} width='50%' />
          </FlexColumn>
          <FlexRow gap={2} height={44} justifyContent='end'>
            <Skeleton variant='rectangular' width={50} height='100%' />
            <Skeleton variant='rectangular' width={120} height='100%' />
          </FlexRow>
        </FlexColumn>
      </FlexRow>
    </FlexColumn>
  )
}

export default FavoriteCardSkeleton
