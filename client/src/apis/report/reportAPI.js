import axiosIntercept from '@/apis/axiosIntercept'
export const getReports = async () => {
  const response = await axiosIntercept.get('report/')
  return response
}
export const sendReport = async (reporterID, reportedUserID, postID, reason) => {
  const response = await axiosIntercept.post('report/', { reporterID, reportedUserID, postID, reason })
  return response
}
