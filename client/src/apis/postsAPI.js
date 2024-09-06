import axiosIntercept from '@/utils/axiosIntercept'

export const listPostsAPI = async () => {
  const response = await axiosIntercept.get('post/')
  return response
}

export const listPostUserAPI = async () => {
  const response = await axiosIntercept.get('post/profile')
  return response
}
