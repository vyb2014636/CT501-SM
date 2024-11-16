import axiosIntercept from '@/apis/axiosIntercept'

export const leaveGroupAPI = async (chatId) => {
  const response = await axiosIntercept.post('chat/leaveGroup', { chatId })
  return response
}
export const updatedAdminGroupAPI = async (chatID, newAdminID, currentAdminID) => {
  const response = await axiosIntercept.put('chat/updateAdmin', { chatID, newAdminID, currentAdminID })
  return response
}
export const dissolveGroupAPI = async (chatId) => {
  const response = await axiosIntercept.delete('chat/dissolve', { params: { chatId } })
  return response
}
export const removeMemberGroupAPI = async (chatId, userId) => {
  const response = await axiosIntercept.post('chat/removeMemberGroup', { chatId, userId })
  return response
}
export const addMembersToGroupAPI = async (chatId, userIds) => {
  const response = await axiosIntercept.post('chat/addMemberGroup', { chatId, userIds })
  return response
}
