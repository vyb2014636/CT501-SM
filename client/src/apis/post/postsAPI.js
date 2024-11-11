import axiosIntercept from '@/apis/axiosIntercept'

export const listPostsAPI = async () => {
  try {
    const response = await axiosIntercept.get('post/')
    return response
  } catch (error) {
    console.log(error)
  }
}

export const listUserPostAPI = async (userId) => {
  try {
    const response = await axiosIntercept.get(`post/${userId}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const postAPI = async (formData) => {
  const response = await axiosIntercept.post('post/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response
}

export const fectchPostAPI = async (postId) => {
  const post = await axiosIntercept.get(`post/${postId}`)
  return post
}

export const sharePostAPI = async (postId, describe) => {
  const response = await axiosIntercept.post('post/share', { postId, describe })
  return response
}
export const moveToTrashAPI = async (postId) => {
  const response = await axiosIntercept.put('post/trash', { postId })
  return response
}
export const restoreFromTrashAPI = async (postId) => {
  const response = await axiosIntercept.put('post/restore', { postId })
  return response
}
export const getPostsTrashAPI = async (postId) => {
  const response = await axiosIntercept.get('post/trashPosts')
  return response
}

// // Lấy danh sách bình luận
// export const fetchComments = async (postId, page) => {
//   const response = await axiosIntercept.get('post/comments', { params: { postId, page } })
//   return response
// }

// // Thêm bình luận mới
// export const addComment = async (postId, content) => {
//   const response = await axiosIntercept.post('post/addComment', { postId, content })
//   return response
// }

// // Thêm phản hồi cho bình luận
// export const addReplyForComment = async (postId, commentId, content) => {
//   const response = await axiosIntercept.post('post/addReply', { postId, commentId, content })
//   return response
// }

// // Thích bình luận
// export const likeComment = async (postId, commentId) => {
//   const response = await axiosIntercept.put('post/likeComment', { postId, commentId })
//   return response
// }

// // Thích phản hồi
// export const likeReply = async (postId, commentId, replyId) => {
//   const response = await axiosIntercept.put('post/likeReply', { postId, commentId, replyId })
//   return response
// }
