import { useState, cloneElement } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Avatar, IconButton, Tooltip, Typography } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SlowMotionVideoOutlinedIcon from '@mui/icons-material/SlowMotionVideoOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { formatFullname } from '@/utils/helpers'
import { scrollbarStyles, styleModal } from '@/styles/styles'
import { postAPI } from '@/apis/post/postsAPI'
import { toast } from 'react-toastify'
import { closeBackdrop, openBackdrop } from '@/features/loading/loadingSlice'
import { useDispatch } from 'react-redux'
import HiddenTextField from '@/components/Common/TextField/HiddenTextField'
import DescribeTextField from '@/components/Common/TextField/DescribeTextField'
import FlexRow from '@/components/Common/Flex/FlexRow'
import ModalWrapper from '@/components/Common/Modal/ModalWrapper'
import { addPost } from '@/features/post/postSlice'

const ModalPost = ({ children, user }) => {
  const [open, setOpen] = useState(false)
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

  const handleDelete = (index) => {
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index))
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
    setVideos((prevVideos) => prevVideos.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    const formData = new FormData()
    formData.append('describe', describe)
    images.forEach((image) => formData.append('images', image))
    videos.forEach((video) => formData.append('videos', video))
    dispatch(openBackdrop())

    try {
      const response = await postAPI(formData)
      dispatch(addPost(response?.post))
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
      <ModalWrapper open={open} onClose={handleClose} title='Đăng bài viết' modal='post' maxHeight={800} width={650} maxWidth={650}>
        <Box p={4}>
          <FlexRow sx={{ alignItems: 'flex-start', gap: '12px', mb: 2 }}>
            <Avatar alt={user?.lastname} src={user?.avatar} sx={{ width: 36, height: 36 }} />
            <Typography variant='subtitle1' fontWeight='bold'>
              {formatFullname(user?.firstname, user?.lastname)}
            </Typography>
          </FlexRow>

          <Box>
            <DescribeTextField placeholder={`${user?.lastname} ơi bạn đang nghĩ gì`} content={describe} setContent={setDescribe} />

            <Box
              mt={2}
              px={2}
              width={1}
              sx={{
                display: previews.length > 2 && 'flex',
                flexWrap: previews.length > 2 && 'wrap',
                maxHeight: '300px',
                overflowY: 'auto',
                ...scrollbarStyles,
                gap: 2
              }}>
              {previews.map((preview, index) => {
                const fileType = files[index]?.type
                const height = previews.length <= 2 ? '500px' : '300px'

                return (
                  <Box
                    key={index}
                    mb={2}
                    sx={{
                      position: 'relative',
                      flex: 'calc(30.333%)',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: 2,
                      p: 2
                    }}>
                    <IconButton
                      onClick={() => handleDelete(index)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '50%'
                      }}>
                      <CloseIcon />
                    </IconButton>

                    {fileType && fileType.startsWith('video/') ? (
                      <video src={preview} controls style={{ width: '100%', height, objectFit: 'cover' }} />
                    ) : (
                      <img src={preview} alt={`Preview ${index}`} style={{ width: '100%', height, objectFit: 'cover' }} />
                    )}
                  </Box>
                )
              })}
            </Box>

            <Box>
              <Tooltip title='Ảnh hoặc video'>
                <IconButton component='label' role={undefined} variant='contained' tabIndex={-1} color='primary'>
                  <HiddenTextField type='file' multiple accept='image/*,video/*' onChange={handleFileChange} />
                  <ImageIcon />
                  <SlowMotionVideoOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        <Button variant='contained' color='primary' disabled={!describe} onClick={handleSubmit} sx={{ m: 4 }}>
          Đăng
        </Button>
      </ModalWrapper>
    </div>
  )
}

export default ModalPost
