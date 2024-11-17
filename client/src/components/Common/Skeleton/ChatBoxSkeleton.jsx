import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import FlexCenter from '../Flex/FlexCenter'
import FlexColumn from '../Flex/FlexColumn'
import { scrollbarStyleMui } from '@/styles/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const ChatBoxSkeleton = () => {
  const isNonScreenMobile = useMediaQuery('(min-width: 1150px)')

  return (
    <FlexColumn sx={{ flex: 3, borderRadius: 4, py: 2, backgroundColor: 'background.paper' }} height={1} justifyContent='space-between'>
      {/* Skeleton cho phần header */}
      <FlexCenter p={3}>
        <Skeleton variant='circle' width={40} height={40} sx={{ marginRight: 2 }} />
        <Skeleton variant='text' width={100} height={30} />
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Skeleton variant='rectangular' width={30} height={30} />
        </Box>
      </FlexCenter>

      {/* Skeleton cho phần tin nhắn */}
      <FlexColumn flex={1} sx={{ px: 2, ...scrollbarStyleMui }}>
        <Skeleton variant='text' width='60%' height={30} sx={{ marginBottom: 1 }} />
        <Skeleton variant='text' width='70%' height={30} sx={{ marginBottom: 1 }} />
        <Skeleton variant='text' width='50%' height={30} sx={{ marginBottom: 1 }} />
        {/* Thêm nhiều skeleton cho các tin nhắn khác */}
      </FlexColumn>

      {/* Skeleton cho phần nhập tin nhắn */}
      <Box display='flex' mt={2} px={4}>
        <Skeleton variant='circular' width={40} height={40} sx={{ marginRight: 2 }} />
        <Skeleton variant='rectangular' width='80%' height={40} sx={{ marginRight: 2 }} />
        <Skeleton variant='circular' width={40} height={40} />
      </Box>
    </FlexColumn>
  )
}
export default ChatBoxSkeleton
