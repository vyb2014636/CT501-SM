import axiosIntercept from '@/apis/axiosIntercept'

export const sendFriendAPI = async (userId) => {
  const response = await axiosIntercept.post('user/sendFriend', userId)
  return response
}
export const getListNoFriends = async () => {
  const response = await axiosIntercept.get('user/noFriends')
  return response
}
export const getRequests = async () => {
  const response = await axiosIntercept.get('user/listRequests')
  return response
}
