import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Tooltip } from '@mui/material'
import ReplayIcon from '@mui/icons-material/Replay'
import { triggerReload } from '@/features/loading/reloadSlice'
import { fetchAllPosts } from '@/features/post/postThunk'
import { useNavigate } from 'react-router-dom'

const ReloadButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { reload } = useSelector((state) => state.reload)

  const handleReload = () => {
    navigate('/', { state: { refresh: true } })
    dispatch(triggerReload())
  }

  if (!reload) return null

  return (
    <Tooltip title='Tải lại bài viết'>
      <IconButton
        onClick={handleReload}
        sx={{
          position: 'fixed',
          top: 4,
          left: '50%',
          transform: 'translateX(-50%)',
          bgcolor: 'background.default',
          '&:hover': {
            backgroundColor: '#e0e0e0'
          },
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}>
        <ReplayIcon sx={{ fontSize: 28, color: '#1877f2' }} />
      </IconButton>
    </Tooltip>
  )
}

export default ReloadButton
