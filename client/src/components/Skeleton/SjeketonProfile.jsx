import React from 'react'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import img from '@/assets/postPic1.jpg'
import FlexRow from '@/components/Flex/FlexRow'
import FlexColumn from '@/components/Flex/FlexColumn'
import Skeleton from '@mui/material/Skeleton'

const SkeletonProfile = () => {
  return (
    <FlexColumn sx={{ backgroundColor: 'background.paper', height: 500, borderRadius: '12px 12px 0 0 ', mb: 2 }}>
      <Box
        sx={{
          backgroundImage: `url('${img}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50%',
          borderRadius: '12px 12px 0 0',
          position: 'relative'
        }}>
        <Skeleton
          animation='wave'
          variant='circular'
          width={80}
          height={80}
          sx={{
            width: 80,
            height: 80,
            border: '4px solid',
            borderColor: 'background.paper',
            position: 'absolute',
            bottom: '-40px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        />
      </Box>

      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant='h5' fontWeight='bold'>
          <Skeleton animation='wave' height={10} width='80%' />
        </Typography>
      </Box>

      <Box borderTop={2} borderBottom={2} borderColor='divider' py={4} my={2}>
        <FlexRow gap={4} justifyContent='center'>
          <Skeleton sx={{ height: 190, width: '30%' }} animation='wave' variant='rectangular' />

          <Divider orientation='vertical' flexItem />
          <Skeleton sx={{ height: 190, width: '30%' }} animation='wave' variant='rectangular' />
        </FlexRow>
      </Box>
    </FlexColumn>
  )
}

export default SkeletonProfile
