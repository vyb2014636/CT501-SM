import { useState, cloneElement } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { TextField, Avatar, IconButton, Card, CardContent, CardHeader, Typography, Divider, CardActions } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SlowMotionVideoOutlinedIcon from '@mui/icons-material/SlowMotionVideoOutlined'
import { useSelector } from 'react-redux'
import { formatFullname } from '@/utils/helpers'
import { scrollbarStyles, styleModal } from '@/styles/styles'
import VisuallyHiddenInput from '../Inputs/VisuallyHiddenInput'
import { postAPI } from '@/apis/post/postsAPI'

const ModalPost = ({ children, user }) => {
  const [open, setOpen] = useState(false)
  const [describe, setDescribe] = useState('')
  const [files, setFiles] = useState([])
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const [previews, setPreviews] = useState([]) // State để lưu URL tạm thời cho hình ảnh/video

  const handleClose = () => {
    setOpen(false)
    setFiles([])
    setImages([])
    setVideos([])
    setPreviews([])
    setDescribe('')
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    const newImages = []
    const newVideos = []
    const filePreviews = []

    selectedFiles.forEach((file) => {
      if (file.type.startsWith('image/')) {
        newImages.push(file)
      } else if (file.type.startsWith('video/')) {
        newVideos.push(file)
      }
      filePreviews.push(URL.createObjectURL(file)) // Tạo URL tạm thời cho preview
    })
    setImages((prevImages) => [...prevImages, ...newImages])
    setVideos((prevVideos) => [...prevVideos, ...newVideos])
    setPreviews((prevPreviews) => [...prevPreviews, ...filePreviews])
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]) // Lưu các file để phân loại đúng
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('describe', describe)
    images.forEach((image) => formData.append('images', image))
    videos.forEach((video) => formData.append('videos', video))
    await postAPI(formData)
    setOpen(false)
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {cloneElement(children, { onClick: () => setOpen(true) })}
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Card sx={styleModal} style={{ maxHeight: '1000px' }} component='form' onSubmit={handleSubmit}>
          <Typography align='center' fontWeight={900} variant='h6' marginBottom={2} padding={0}>
            Tạo bài viết
          </Typography>
          <Divider />
          <CardHeader
            avatar={<Avatar src={user && user?.avatar} alt='Profile Picture' sx={{ width: 52, height: 52 }} />}
            title={
              <Typography variant='h6' fontWeight='bold'>
                {user && formatFullname(user?.firstname, user?.lastname)}
              </Typography>
            }
          />
          <CardContent>
            <Box display='flex' alignItems='center' mb={2}>
              <TextField
                placeholder={`${user?.lastname} ơi bạn đang nghĩ gì`}
                fullWidth
                multiline
                rows={3}
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
                sx={{ '& .MuiInputBase-input': scrollbarStyles }}
              />
            </Box>
            <Box mt={2} sx={{ maxHeight: '200px', overflowY: 'auto', ...scrollbarStyles }}>
              {previews.map((preview, index) => {
                const fileType = files[index]?.type
                return (
                  <Box key={index} mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                    {fileType && fileType.startsWith('video/') ? (
                      <video src={preview} controls style={{ gap: 2, width: '100%', height: 'auto', objectFit: 'cover' }} />
                    ) : (
                      <img src={preview} alt={`Preview ${index}`} style={{ gap: 2, width: '100%', height: 'auto', objectFit: 'cover' }} />
                    )}
                  </Box>
                )
              })}
            </Box>
          </CardContent>
          <CardContent>
            <Box>
              <IconButton component='label' role={undefined} variant='contained' tabIndex={-1} color='primary'>
                <VisuallyHiddenInput type='file' multiple accept='image/*,video/*' onChange={handleFileChange} />
                <ImageIcon />
                <SlowMotionVideoOutlinedIcon />
              </IconButton>

              <IconButton color='primary'>
                <EmojiEmotionsIcon />
              </IconButton>
              <IconButton color='primary'>
                <LocationOnIcon />
              </IconButton>
            </Box>
          </CardContent>
          <CardActions>
            <Button type='submit' variant='contained' color='primary' disabled={!describe} fullWidth>
              Đăng
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </div>
  )
}

export default ModalPost
