import React, { useState } from 'react'
import { styleThreeButton } from '@/styles/stylePost/style'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Divider, Modal, Typography } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import TitleModal from '../Modal/Title/TitleModal'
import FlexColumn from '../Flex/FlexColumn'
import { styleModal } from '@/styles/styles'
import ShareForm from '../Form/ShareForm'
import { toast } from 'react-toastify'
import { sharePostAPI } from '@/apis/post/postsAPI'
import { useNavigate } from 'react-router-dom'
import { closeBackdrop, openBackdrop } from '@/features/loading/loadingSlice'

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
      <Modal open={openShare} onClose={handleCloseShare} handleCloseShare={handleCloseShare}>
        <FlexColumn sx={{ ...styleModal, maxHeight: '600px', p: 0, overflow: 'hidden' }}>
          <TitleModal title='Chia sẻ' />
          <Divider />

          <ShareForm user={user} post={post} descibeShare={descibeShare} setDescribeShare={setDescribeShare} handleSubmitShare={handleSubmitShare} />
        </FlexColumn>
      </Modal>
    </>
  )
}

export default ShareButton
