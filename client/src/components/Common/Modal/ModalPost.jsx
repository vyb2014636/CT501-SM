import { useState, cloneElement } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import {
  TextField,
  Avatar,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  CardActions,
  CircularProgress,
  Backdrop
} from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SlowMotionVideoOutlinedIcon from '@mui/icons-material/SlowMotionVideoOutlined'
import { formatFullname } from '@/utils/helpers'
import { scrollbarStyles, styleModal } from '@/styles/styles'
import VisuallyHiddenInput from '../TextField/HiddenTextField'
import { postAPI } from '@/apis/post/postsAPI'
import DescibeTextField from '../TextField/DescibeTextField'
import FlexColumn from '../Flex/FlexColumn'
import TitleModal from './Title/TitleModal'
import FlexRow from '../Flex/FlexRow'
import { toast } from 'react-toastify'
import { closeBackdrop, openBackdrop } from '@/features/loading/loadingSlice'
import { useDispatch } from 'react-redux'

const ModalPost = ({ children, user }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [describe, setDescribe] = useState('')
  const [files, setFiles] = useState([])
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const [previews, setPreviews] = useState([])
  const dispatch = useDispatch()

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
    const formData = new FormData()
    formData.append('describe', describe)
    images.forEach((image) => formData.append('images', image))
    videos.forEach((video) => formData.append('videos', video))
    dispatch(openBackdrop())

    try {
      const response = await postAPI(formData)
      toast.success(response.message)
    } catch (error) {
      toast.error(error)
    }

    dispatch(closeBackdrop())

    setOpen(false)
    handleClose()
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {cloneElement(children, { onClick: () => setOpen(true) })}
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <FlexColumn sx={{ ...styleModal, maxHeight: '600px', p: 0, overflow: 'hidden' }} onSubmit={handleSubmit}>
          <TitleModal title=' Tạo bài viết' />

          <Divider />

          <Box p={4}>
            <FlexRow sx={{ alignItems: 'flex-start', gap: '12px', mb: 2 }}>
              <Avatar alt={user?.lastname} src={user?.avatar} sx={{ width: 36, height: 36 }} />
              <Typography variant='subtitle1' fontWeight='bold'>
                {formatFullname(user?.firstname, user?.lastname)}
              </Typography>
            </FlexRow>

            <Box>
              <DescibeTextField placeholder={`${user?.lastname} ơi bạn đang nghĩ gì`} content={describe} setContent={setDescribe} />

              <Box mt={2} px={2} sx={{ maxHeight: '200px', overflowY: 'auto', ...scrollbarStyles }}>
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
            </Box>
          </Box>

          <Button variant='contained' color='primary' disabled={!describe} onClick={handleSubmit} sx={{ m: 4 }}>
            Đăng
          </Button>
        </FlexColumn>
      </Modal>
    </div>
  )
}

export default ModalPost
