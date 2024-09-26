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
