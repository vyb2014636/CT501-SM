// components/ProfileMain/TabsContent/PostsTab.js
import React, { memo, useRef } from 'react'
import Typography from '@mui/material/Typography'
import SkeletonPosts from '../../Skeleton/PostsSkeleton'
import PostCreation from '@/components/PostCreation/Card/PostCreation'
import PostCard from '../../PostCard/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import useScrollInfinite from '@/hooks/useScrollInfinite'
import { fetchAllPosts } from '@/features/post/postThunk'
import PostSkeleton from '../../Skeleton/Children/PostSkeleton'

const PostsTab = ({ posts, currentUser, scrollRef, userId }) => {
  const { loading, hasMorePosts, totalPosts } = useSelector((state) => state.post)
  const pageRef = useRef(1)
  const dispatch = useDispatch()

  const loadMorePosts = () => {
    if (hasMorePosts && !loading) {
      pageRef.current += 1
      dispatch(fetchAllPosts({ page: pageRef.current, userId }))
    }
  }

  useScrollInfinite(scrollRef, loadMorePosts, hasMorePosts)

  return (
    <>
      {currentUser && <PostCreation />}
      {!loading && posts.length === 0 ? (
        <Typography variant='h6' fontWeight='semi' textAlign='center' py={2} my={2}>
          Không có bài viết nào được đăng
        </Typography>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} visibleMenu={true} />
          ))}
          {loading && posts.length > 0 && <PostSkeleton />}
          {!loading && posts.length !== 0 && posts.length >= totalPosts && (
            <Typography variant='h6' fontWeight='semi' textAlign='center' py={2} my={2}>
              Đã hết bài viết
            </Typography>
          )}
        </>
      )}
    </>
  )
}

export default memo(PostsTab)
