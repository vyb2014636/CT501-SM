import FlexRow from '@/components/Common/Flex/FlexRow'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

const ProfileStat = ({ friendsCount, totalPosts }) => (
  <Box borderTop={2} borderBottom={2} borderColor='divider' py={4} my={2}>
    <FlexRow gap={4} justifyContent='center'>
      <Box textAlign='center' width='30%'>
        <Typography variant='h6'>{friendsCount}</Typography>
        <Typography variant='body2'>Bạn bè</Typography>
      </Box>
      <Divider orientation='vertical' flexItem />
      <Box textAlign='center' width='30%'>
        <Typography variant='h6'>{totalPosts}</Typography>
        <Typography variant='body2'>Bài viết</Typography>
      </Box>
    </FlexRow>
  </Box>
)

export default ProfileStat
