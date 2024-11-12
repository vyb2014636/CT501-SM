import FlexColumn from '@/components/Common/Flex/FlexColumn'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FlexRow from '@/components/Common/Flex/FlexRow'
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined'
import { memo, useState } from 'react'
import { removeFavoriteAPI } from '@/apis/user/userAPI'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { updatedFavorites } from '@/features/auth/authSlice'
import ModalWrapper from '@/components/Common/Modal/ModalWrapper'
import PostCard from '@/components/Common/PostCard/PostCard'
import { scrollbarStyles } from '@/styles/styles'
import { selectViewPost } from '@/features/post/postSlice'

const FavoriteCard = ({ post, ref, setFavorites }) => {
  const [open, setOpen] = useState(false)
  const { viewPost } = useSelector((state) => state.post)
  const dispatch = useDispatch()

  const handleOpen = (post) => {
    dispatch(selectViewPost(post))
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    dispatch(selectViewPost(null))
  }
  const removeFavorite = async (postId) => {
    try {
      const response = await removeFavoriteAPI(postId)
      dispatch(updatedFavorites(response.user))
      setFavorites((prevFavorites) => prevFavorites.filter((post) => post._id !== postId))
      toast.success(response.message)
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
      <FlexColumn height={130} bgcolor='background.paper' p={3} borderRadius={3} my={3}>
        <FlexRow display='flex' alignItems='stretch' sx={{ width: 1, height: 1 }} gap={4}>
          <Avatar
            src={post.sharedPost ? post?.sharedPost?.images[0] : post?.images[0]}
            sx={{
              width: 100,
              height: 1,
              borderRadius: 3,
              boxShadow: 2,
              '&:hover': {
                opacity: 0.6 // Khi hover, ảnh sẽ mờ đi
              }
            }}
          />
          <FlexColumn sx={{ height: 1, flex: 1, justifyContent: 'space-between' }}>
            <FlexColumn>
              <Typography
                variant='h6'
                fontWeight='bold'
                onClick={() => handleOpen(post)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline' // Gạch dưới khi hover
                  }
                }}>
                {post.sharedPost ? post?.sharedPost?.describe : post?.describe}
              </Typography>

              <Typography variant='body2'>
                Bài viết của <strong>{post.sharedPost ? post.sharedPost.byPost.fullname : post.byPost.fullname}</strong>
              </Typography>
            </FlexColumn>
            <FlexRow gap={2} height={44} justifyContent='end'>
              <Button variant='contained' size='large' sx={{ height: 1 }}>
                <ReplyOutlinedIcon />
              </Button>
              <Button variant='contained' size='large' sx={{ height: 1 }} onClick={() => removeFavorite(post?._id)}>
                Bỏ yêu thích
              </Button>
            </FlexRow>
          </FlexColumn>
        </FlexRow>
      </FlexColumn>
      <ModalWrapper
        open={open}
        onClose={handleClose}
        title={post?.sharedPost ? `Bài viết của ${post?.sharedPost?.byPost.fullname}` : `Bài viết của ${post?.byPost?.fullname}`}>
        <Box sx={{ flex: 1, p: 4, overflow: 'auto', ...scrollbarStyles }}>
          <PostCard post={viewPost} visibleMenu={false} />
        </Box>
      </ModalWrapper>
    </>
  )
}

export default memo(FavoriteCard)
