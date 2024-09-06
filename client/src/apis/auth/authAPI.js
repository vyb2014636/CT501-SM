import axiosIntercept from '@/utils/axiosIntercept'

export const registerAPI = async (user) => {
  const response = await axiosIntercept.post('auth/signup', user)
  return response
}
export const verifyEmailAPI = async (email, otp) => {
  const response = await axiosIntercept.post('auth/verifyEmail', { email, otp })
  return response
}

export const logout = async (user) => {
  const response = await axiosIntercept.get('auth/logout')
  return response
}
