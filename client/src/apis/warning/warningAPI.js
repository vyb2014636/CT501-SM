import axiosIntercept from '@/apis/axiosIntercept'
export const getWarnings = async () => {
  const response = await axiosIntercept.get('warning/')
  return response
}
export const getWarningsForUser = async (userId) => {
  const response = await axiosIntercept.get(`warning/${userId}`)
  return response
}
