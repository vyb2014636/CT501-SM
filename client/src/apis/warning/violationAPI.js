import axiosIntercept from '@/apis/axiosIntercept'
export const getViolations = async () => {
  const response = await axiosIntercept.get('warning/')
  return response
}
export const getUserViolations = async (userId) => {
  const response = await axiosIntercept.get(`warning/${userId}`)
  return response
}

export const getSpamViolations = async () => {
  const response = await axiosIntercept.get(`report/spamReports`)
  return response
}
