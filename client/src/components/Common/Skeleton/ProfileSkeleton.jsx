import React from 'react'
import { Box, Skeleton, Button, Divider } from '@mui/material'

import PostCreationSkeleton from './PostCreationSkeleton'

const ProfileSkeleton = () => {
  return (
    <>
      <Box sx={{ backgroundColor: 'background.paper', height: 500, borderRadius: '12px 12px 0 0', mb: 2 }}>
        <Box
          sx={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '200px',
            borderRadius: '12px 12px 0 0',
            position: 'relative'
          }}>
          <Skeleton
            variant='rectangular'
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '12px 12px 0 0'
            }}
          />
          <Skeleton
            variant='circular'
            width={80}
            height={80}
            sx={{
              position: 'absolute',
              bottom: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              border: '2px solid',
              borderColor: 'background.paper',
              bgcolor: 'background.default'
            }}
          />
        </Box>

        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Skeleton variant='text' width={200} height={30} sx={{ mb: 1, mx: 'auto' }} />
        </Box>

        <Button variant='contained' sx={{ display: 'flex', alignItems: 'center', width: 210, mx: 'auto', my: 2 }} disabled>
          <Skeleton variant='text' width={150} height={20} sx={{ mr: 1 }} />
          <Skeleton variant='circular' width={20} height={20} />
        </Button>

        <Box borderTop={2} borderBottom={2} borderColor='divider' py={4} my={2}>
          <Box display='flex' gap={4} justifyContent='center'>
            <Box textAlign='center' width='30%'>
              <Skeleton variant='text' width={50} height={30} sx={{ mx: 'auto' }} />
            </Box>
            <Divider orientation='vertical' flexItem />
            <Box textAlign='center' width='30%'>
              <Skeleton variant='text' width={50} height={30} sx={{ mx: 'auto' }} />
            </Box>
          </Box>
        </Box>
      </Box>

      <PostCreationSkeleton />
    </>
  )
}

export default ProfileSkeleton
