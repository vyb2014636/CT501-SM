import React, { useState } from 'react'
import { styleThreeButton } from '@/styles/stylePost/style'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Divider, Modal, Typography } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import ShareForm from '../Form/ShareForm'
import { toast } from 'react-toastify'
import { sharePostAPI } from '@/apis/post/postsAPI'
import { useNavigate } from 'react-router-dom'
import { closeBackdrop, openBackdrop } from '@/features/loading/loadingSlice'
import ModalWrapper from '@/components/Common/Modal/ModalWrapper'
const ShareButton = ({ post }) => {
  const [openShare, setOpenShare] = useState(false)
  const [descibeShare, setDescribeShare] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleOpenShare = () => setOpenShare(true)
  const handleCloseShare = () => setOpenShare(false)

  const handleSubmitShare = async () => {
    dispatch(openBackdrop())
    try {
      const response = await sharePostAPI(post._id, descibeShare)
      toast.success(response.message)
      handleCloseShare()
      navigate('/', { state: { refresh: true } })
    } catch (error) {
      toast.error(error.message)
    }
    dispatch(closeBackdrop())
  }

  const { user } = useSelector((state) => state.auth)
  return (
    <>
      <Button sx={styleThreeButton} onClick={handleOpenShare}>
        <ShareIcon />
        <Typography variant='body1' fontWeight='bold'>
          Chia sẻ
        </Typography>
      </Button>
      <ModalWrapper open={openShare} onClose={handleCloseShare} title='Chia sẻ'>
        <ShareForm user={user} post={post} descibeShare={descibeShare} setDescribeShare={setDescribeShare} handleSubmitShare={handleSubmitShare} />
      </ModalWrapper>
    </>
  )
}

export default ShareButton
