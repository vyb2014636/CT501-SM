import axiosIntercept from '@/apis/axiosIntercept'
export const getReports = async (status) => {
  const response = await axiosIntercept.get('report/', { params: { status } })
  return response
}
export const sendReport = async (reporterID, reportedUserID, postID, reason) => {
  const response = await axiosIntercept.post('report/', { reporterID, reportedUserID, postID, reason })
  return response
}

export const hiddenPostByAdminAPI = async (reportID, status, notify) => {
  const response = await axiosIntercept.put(`report/${reportID}/hiddenPost`, { status, notify })
  return response
}
export const unVioletAPI = async (reportID) => {
  const response = await axiosIntercept.put(`report/${reportID}/unViolet`)
  return response
}
export const respondToReportAPI = async (reportId, content) => {
  const response = await axiosIntercept.post(`report/${reportId}/response`, { content })
  return response
}
