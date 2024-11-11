import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import ReportButton from '@/components/Report/ReportButton'
import { confirmAction } from '@/utils/helpers'
import { moveToTrashAPI, restoreFromTrashAPI } from '@/apis/post/postsAPI'
import { updatedPost } from '@/features/post/postSlice'
import { toast } from 'react-toastify'
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined'

const MoreVertButton = ({ userPost, post }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const moveTrash = async (postId) => {
    setAnchorEl(null)
    confirmAction('Bạn có chắc muốn di chuyển vào thùng rác?', async () => {
      try {
        const response = await moveToTrashAPI(postId)
        dispatch(updatedPost({ post: response.post, action: 'trash' }))
        console.log(response.post)
      } catch (error) {
        toast.error(error.message)
      }
    })
  }

  const restoreFromTrash = async (postId) => {
    setAnchorEl(null)
    confirmAction('Bạn có chắc muốn phục hồi bài đăng này?', async () => {
      try {
        const response = await restoreFromTrashAPI(postId)
        // dispatch(updatedPost({ post: response.post, action: 'trash' }))
        // console.log(response.post)
      } catch (error) {
        toast.error(error.message)
      }
    })
  }

  return (
    <>
      <IconButton aria-haspopup='true' aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='option-post'
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        onClose={() => setAnchorEl(null)}>
        {userPost._id === user._id && post.status === 'normal' ? (
          <MenuItem onClick={() => moveTrash(post._id)}>
            <DeleteOutlinedIcon />
            <Typography ml={1}>Gỡ bài đăng</Typography>
          </MenuItem>
        ) : userPost._id === user._id && post.status === 'trash' ? (
          <MenuItem onClick={() => restoreFromTrash(post._id)}>
            <RestoreOutlinedIcon />
            <Typography ml={1}>Phục hồi</Typography>
          </MenuItem>
        ) : (
          <ReportButton setAnchorEl={setAnchorEl} post={post} userPost={userPost} />
        )}
        {post.status === 'normal' && (
          <MenuItem onClick={() => setAnchorEl(null)}>
            <FavoriteBorderOutlinedIcon />
            <Typography ml={1}>Yêu thích</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

export default MoreVertButton
