import axiosIntercept from '@/utils/axiosIntercept'

export const listPostsAPI = async () => {
  const response = await axiosIntercept.get('post/')
  return response
}

export const listPostUserAPI = async () => {
  const response = await axiosIntercept.get('post/profile')
  return response
}

export const postAPI = async (formData) => {
  try {
    const response = await axiosIntercept.post('post/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  } catch (error) {
    console.error('Error creating post:', error.response)
  }
}
