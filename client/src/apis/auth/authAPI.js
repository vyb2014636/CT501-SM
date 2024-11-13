import axiosIntercept from '@/apis/axiosIntercept'

export const registerAPI = async (user) => {
  const response = await axiosIntercept.post('auth/signup', user)
  return response
}
export const verifyEmailAPI = async (email, otp) => {
  const response = await axiosIntercept.post('auth/verifyEmail', { email, otp })
  return response
}
export const fetchUsersOnline = async () => {
  const response = await axiosIntercept.get('auth/online')
  return response
}

export const logout = async (user) => {
  const response = await axiosIntercept.get('auth/logout')
  return response
}
export const enable2FAAPI = async (email) => {
  const response = await axiosIntercept.post('auth/enable-2fa', { email })
  return response
}
export const disable2FAAPI = async (email) => {
  const response = await axiosIntercept.post('auth/disable-2fa')
  return response
}
export const verifyEnable2FAAPI = async (email, token) => {
  const response = await axiosIntercept.post('auth/verifyEnable2FA', { email, token })
  return response
}

export const changePasswordAPI = async (currentPassword, newPassword) => {
  const response = await axiosIntercept.post('auth/changePassword', { currentPassword, newPassword })
  return response
}
