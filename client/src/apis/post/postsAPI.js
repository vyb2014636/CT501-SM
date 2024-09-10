import axiosIntercept from '@/apis/axiosIntercept'

export const listPostsAPI = async () => {
  try {
    const response = await axiosIntercept.get('post/')
    return response
  } catch (error) {
    console.log(error)
  }
}

export const listPostUserAPI = async () => {
  try {
    const response = await axiosIntercept.get('post/profile')
    return response
  } catch (error) {
    console.log(error)
  }
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
