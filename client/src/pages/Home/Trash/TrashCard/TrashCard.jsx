import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FlexColumn from '@/components/Common/Flex/FlexColumn'
import FlexRow from '@/components/Common/Flex/FlexRow'
import FlexStartButton from '@/components/Common/Flex/FlexStartButton'
import MoreVertButton from '@/components/Common/PostCard/HeaderPostCard/Button/MoreVertButton'
import ModalWrapper from '@/components/Common/Modal/ModalWrapper'
import PostCard from '@/components/Common/PostCard/PostCard'
import { scrollbarStyles } from '@/styles/styles'

const TrashCard = ({ day, setDays }) => {
  const currentUser = useSelector((state) => state.auth.user)
  const [open, setOpen] = useState(false)
  const [post, setPost] = useState(null)
  const handleOpen = (post) => {
    setOpen(true)
    setPost(post)
  }
  const handleClose = () => {
    setOpen(false)
    setPost(null)
  }
  const calculateDaysLeft = (trashDate) => {
    const today = new Date()
    const trashDateObj = new Date(trashDate)
    // Tính số ngày từ trashDate đến hôm nay
    const diffTime = today - trashDateObj
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)) // Chuyển đổi thời gian từ ms sang ngày
    const daysLeft = 30 - diffDays // Giả sử TTL là 30 ngày
    return daysLeft
  }
  return (
    <>
      <Box bgcolor='background.paper' py={2} borderRadius={3} my={2}>
        <Typography p={2} fontWeight='bold' variant='h6'>
          {day._id}
        </Typography>
        <FlexColumn gap={2}>
          {day.posts.map((post) => (
            <FlexRow key={post._id}>
              <FlexStartButton color='inherit' sx={{ width: 1 }} onClick={() => handleOpen(post)}>
                <FlexRow gap={3} width={1}>
                  <Avatar src={post.images?.length > 0 ? post.images[0] : post.byPost.avatar} sx={{ height: 48, width: 48 }} />
                  <FlexColumn alignItems='start'>
                    <Typography variant='body1'>
                      <strong>{post.byPost.fullname} </strong>
                      {post.sharedPost || post.sharedPost === null ? 'Chia sẻ ' : 'Đăng '}
                      <strong>một bài viết</strong>
                    </Typography>
                    <Typography variant='body2'>Còn {calculateDaysLeft(post.trashDate)} ngày</Typography>
                  </FlexColumn>
                </FlexRow>
              </FlexStartButton>
              <Box ml='auto'>
                <MoreVertButton userPost={currentUser} post={post} setDays={setDays} day={day} />
              </Box>
            </FlexRow>
          ))}
        </FlexColumn>
      </Box>
      <ModalWrapper
        open={open}
        onClose={handleClose}
        title={post?.sharedPost ? `Bài viết của ${post?.sharedPost?.byPost.fullname}` : `Bài viết của ${post?.byPost?.fullname}`}>
        <Box sx={{ flex: 1, p: 4, overflow: 'auto', ...scrollbarStyles }}>
          <PostCard post={post} visibleMenu={false} />
        </Box>
      </ModalWrapper>
    </>
  )
}

export default TrashCard
