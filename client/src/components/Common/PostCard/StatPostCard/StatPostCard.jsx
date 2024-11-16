import React, { useState } from 'react'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { Box, Tabs, Tab, List, ListItem, Divider, Avatar } from '@mui/material'
import ModalWrapper from '../../Modal/ModalWrapper'
import FlexRow from '../../Flex/FlexRow'
import FriendShip from '@/components/Search/Button/FriendShip'

const StatPostCard = ({ post, shared }) => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0) // State để lưu tab hiện tại
  // Hàm mở modal
  const handleOpenModal = () => {
    setOpenModal(true)
  }
  // Hàm đóng modal
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  // Hàm thay đổi tab
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }
  const getUniqueUsersFromShares = () => {
    const users = {}
    const uniqueShares = []

    post?.sharesBy?.forEach((share) => {
      if (share && !users[share._id]) {
        users[share._id] = true
        uniqueShares.push(share)
      }
    })

    return uniqueShares
  }
  const getUniqueUsersFromComments = () => {
    const users = {}
    const uniqueComments = []

    // Xử lý từng comment
    post?.comments?.forEach((comment) => {
      // Thêm user của comment nếu chưa tồn tại
      if (comment?.user && !users[comment.user._id]) {
        users[comment.user._id] = true
        uniqueComments.push(comment.user)
      }

      // Xử lý các phản hồi (replies) của comment
      comment?.replies?.forEach((reply) => {
        if (reply?.user && !users[reply.user._id]) {
          users[reply.user._id] = true
          uniqueComments.push(reply.user)
        }
      })
    })

    return uniqueComments
  }

  const getTabContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <List>
            {post?.likes?.length > 0 ? (
              post?.likes?.map((like, index) => (
                <ListItem key={index}>
                  <FlexRow gap={2}>
                    <Avatar src={like?.avatar} sx={{ border: '1px solid' }} />
                    <Typography fontWeight='bold'>{like?.fullname}</Typography>
                  </FlexRow>
                  <Box ml='auto'>
                    <FriendShip user={like} />
                  </Box>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <Typography fontWeight='bold' align='center'>
                  Không có người dùng nào thích
                </Typography>
              </ListItem>
            )}
          </List>
        )
      case 1:
        return (
          <List>
            {getUniqueUsersFromComments?.length > 0 ? (
              getUniqueUsersFromComments().map((comment, index) => (
                <ListItem key={index}>
                  <FlexRow gap={2}>
                    <Avatar src={comment?.avatar} sx={{ border: '1px solid' }} />
                    <Typography>{comment?.fullname}</Typography>
                  </FlexRow>
                  <Box ml='auto'>
                    <FriendShip user={comment} />
                  </Box>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <Typography fontWeight='bold' align='center'>
                  Không có người dùng nào bình luận
                </Typography>
              </ListItem>
            )}
          </List>
        )
      case 2:
        return (
          <List>
            {getUniqueUsersFromShares?.length > 0 ? (
              getUniqueUsersFromShares().map((share, index) => (
                <ListItem key={index}>
                  <FlexRow gap={2}>
                    <Avatar src={share?.avatar} sx={{ border: '1px solid' }} />
                    <Typography>{share?.fullname}</Typography>
                  </FlexRow>
                  <Box ml='auto'>
                    <FriendShip user={share} />
                  </Box>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <Typography fontWeight='bold' align='center'>
                  Không có người dùng nào chia sẻ
                </Typography>
              </ListItem>
            )}
          </List>
        )

      default:
        return null
    }
  }

  return (
    <>
      <MenuItem sx={{ p: 0 }} onClick={handleOpenModal}>
        <CardContent>
          <Typography variant='body2'>
            {post?.likes?.length} người thích, {post?.comments?.reduce((total, comment) => total + 1 + (comment.replies?.length || 0), 0)} Bình luận
            {!shared && `, ${post?.sharesBy?.length} lượt chia sẻ `}
          </Typography>
        </CardContent>
      </MenuItem>

      {/* Modal hiển thị tab */}
      <ModalWrapper open={openModal} onClose={handleCloseModal} title='Thông tin bài viết' width={600} maxWidth={600}>
        {/* Tabs */}
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label='Thích' />
          <Tab label='Bình luận' />
          {!shared && <Tab label='Chia sẻ' />}
        </Tabs>

        <Divider sx={{ my: 2 }} />

        {/* Nội dung của tab */}
        {getTabContent()}
      </ModalWrapper>
    </>
  )
}

export default StatPostCard
