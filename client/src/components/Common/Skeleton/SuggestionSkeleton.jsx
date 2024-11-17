import React from 'react'
import { Skeleton, List, ListItem, Typography } from '@mui/material'
import FlexColumn from '../Flex/FlexColumn'

const SuggestionSkeleton = () => {
  return (
    <FlexColumn
      sx={{
        mt: '15px',
        flex: 10
      }}>
      <List sx={{ bgcolor: 'background.paper', borderRadius: '18px', display: 'flex', flexDirection: 'column' }}>
        <ListItem>
          <Typography variant='h6' gutterBottom color='primary' fontWeight='bold'>
            Những người bạn có thể biết
          </Typography>
        </ListItem>
        {[...Array(2)].map((_, index) => (
          <ListItem key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Skeleton variant='circular' width={50} height={50} sx={{ marginRight: 2 }} />
            <FlexColumn sx={{ flex: 1 }}>
              <Skeleton variant='text' width='60%' height={20} sx={{ marginBottom: 1 }} />
              <Skeleton variant='text' width='50%' height={20} />
            </FlexColumn>
          </ListItem>
        ))}
      </List>
    </FlexColumn>
  )
}

export default SuggestionSkeleton
