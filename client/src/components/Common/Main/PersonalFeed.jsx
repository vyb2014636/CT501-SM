import React, { memo, useRef } from 'react'
import Box from '@mui/material/Box'
import { scrollbarStyleMui, styleMain } from '@/styles/styles'
import ProfileCard from '../ProfileCard/ProfileCard'
import NotFoundPage from '@/pages/Error/NotFoundPage'
import ProfileMain from '../ProfileMain/ProfileMain'
import MenuMobile from '@/components/Mobile/MenuMobile'

const PersonalFeed = ({ posts, user, currentUser, totalPosts }) => {
  if (user?.isAdmin) return <NotFoundPage />
  const scrollRef = useRef(null)

  return (
    <>
      <MenuMobile />
      <Box sx={{ ...styleMain, ...scrollbarStyleMui }} ref={scrollRef}>
        <ProfileCard user={user} totalPosts={totalPosts} />

        {currentUser ? (
          <ProfileMain posts={posts} user={user} scrollRef={scrollRef} currentUser={currentUser} />
        ) : (
          <ProfileMain posts={posts} user={user} scrollRef={scrollRef} />
        )}
      </Box>
    </>
  )
}

export default memo(PersonalFeed)
