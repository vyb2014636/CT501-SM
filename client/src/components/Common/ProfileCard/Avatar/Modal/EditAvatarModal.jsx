import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import TitleModal from '@components/Common/Modal/Title/TitleModal'
import HiddenTextField from '@components/Common/TextField/HiddenTextField'
import { styleModal } from '@/styles/styles'
import getCroppedImg from '@/utils/cropImage'
import { uploadAvatar } from '@/apis/user/userAPI'
import { updateUser } from '@/features/auth/authSlice'
import { closeBackdrop, openBackdrop } from '@/features/loading/loadingSlice'

const EditAvatarModal = ({ openModal, setOpenModal }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [cropPreview, setCropPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleCloseModal = () => {
    if (selectedImage && !window.confirm('Bạn có muốn bỏ ảnh đã chọn không?')) return
    resetModal()
  }

  const resetModal = () => {
    setOpenModal(false)
    setSelectedImage(null)
    setCropPreview(null)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setSelectedImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      getCroppedImg(selectedImage, croppedAreaPixels).then(setCropPreview)
    },
    [selectedImage]
  )

  const handleUpload = async () => {
    if (!cropPreview) return

    setLoading(true)
    const blob = await fetch(cropPreview).then((r) => r.blob())
    const formData = new FormData()
    formData.append('avatar', blob)

    dispatch(openBackdrop())
    try {
      const { user, message } = await uploadAvatar(formData)
      dispatch(updateUser(user))
      toast.success(message)
      resetModal()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
      dispatch(closeBackdrop())
    }
  }

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box sx={{ ...styleModal, height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TitleModal title='Chỉnh sửa ảnh đại diện' />
        <Button component='label' variant='contained' startIcon={<CloudUploadIcon />}>
          Chọn ảnh đại diện
          <HiddenTextField type='file' accept='image/*' onChange={handleImageChange} />
        </Button>

        {selectedImage && (
          <Box sx={{ position: 'relative', width: 180, height: 180, mt: 2, borderRadius: '50%', overflow: 'hidden' }}>
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              aspect={1} // Đảm bảo tỷ lệ cắt 1:1 (hình vuông)
              cropShape='round' // Cắt hình tròn
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Đảm bảo ảnh bao phủ khung tròn
            />
          </Box>
        )}

        {cropPreview && (
          <>
            <Box
              component='img'
              src={cropPreview}
              alt='Cropped Avatar'
              sx={{ mt: 2, width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }}
            />
            <Button variant='contained' onClick={handleUpload} sx={{ mt: 2 }} disabled={loading}>
              Lưu Ảnh
            </Button>
          </>
        )}
      </Box>
    </Modal>
  )
}

export default EditAvatarModal
