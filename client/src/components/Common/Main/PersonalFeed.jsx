import React, { memo, useRef } from 'react'
import Box from '@mui/material/Box'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts } from '@/features/post/postThunk'
import { scrollbarStyleMui, styleMain } from '@/styles/styles'
import useScrollInfinite from '@/hooks/useScrollInfinite'
import ProfileCard from '../ProfileCard/ProfileCard'
import NotFoundPage from '@/pages/Error/NotFoundPage'
import ProfileMain from '../ProfileMain/ProfileMain'

const PersonalFeed = ({ posts, user, currentUser, totalPosts }) => {
  if (user?.isAdmin) return <NotFoundPage />
  const scrollRef = useRef(null)

  return (
    <Box sx={{ ...styleMain, ...scrollbarStyleMui }} ref={scrollRef}>
      <ProfileCard user={user} totalPosts={totalPosts} />

      {currentUser ? (
        <ProfileMain posts={posts} user={user} scrollRef={scrollRef} currentUser={currentUser} />
      ) : (
        <ProfileMain posts={posts} user={user} scrollRef={scrollRef} />
      )}
    </Box>
  )
}

export default memo(PersonalFeed)
