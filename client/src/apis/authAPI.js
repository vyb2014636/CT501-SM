import axiosIntercept from '@/utils/axiosIntercept'

export const registerAPI = async (user) => {
  const response = await axiosIntercept.post('auth/signup', user)
  return response
}
export const verifyEmailAPI = async (email, code) => {
  const response = await axiosIntercept.post('auth/verifyEmail', { email, code })
  return response
}
