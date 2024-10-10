import React from 'react'
import { Box, Avatar, Skeleton, Button, Divider, Typography } from '@mui/material'
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import FlexColumn from '../Flex/FlexColumn'
import FlexRow from '../Flex/FlexRow'

const PostCreationSkeleton = () => {
  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.paper', borderRadius: '12px', p: 4, gap: 3, mb: 2 }}>
      <FlexColumn sx={{ width: '100%', gap: 3 }}>
        <FlexRow>
          <Skeleton variant='circular' width={48} height={48} />
          <Skeleton
            variant='rectangular'
            width='100%'
            sx={{
              ml: 2,
              height: '100%',
              borderRadius: '12px',
              bgcolor: 'neutral.primary'
            }}
          />
        </FlexRow>

        <Divider />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mr: 2 }}>
          <Skeleton variant='text' width={80} height={40} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PhotoOutlinedIcon color='primary' />
          </Skeleton>

          <Skeleton variant='text' width={80} height={40} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PlayCircleOutlineIcon color='primary' />
          </Skeleton>

          <Skeleton variant='text' width={80} height={40} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocationOnOutlinedIcon color='primary' />
          </Skeleton>
        </Box>
      </FlexColumn>
    </Box>
  )
}

export default PostCreationSkeleton
