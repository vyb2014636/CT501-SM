import axiosIntercept from '@/apis/axiosIntercept'

export const sendFriendAPI = async (to) => {
  const response = await axiosIntercept.post('requestFriend/sendRequest', to)
  return response
}
export const getListSuggestion = async () => {
  const response = await axiosIntercept.get('user/noFriends')
  return response
}
export const getRequests = async () => {
  const response = await axiosIntercept.get('requestFriend/')
  return response
}

export const cancelFriendAPI = async (to) => {
  const response = await axiosIntercept.post('requestFriend/cancelRequest', to)
  return response
}
export const acceptAddFriendAPI = async (requestId) => {
  const response = await axiosIntercept.post('user/acceptFriend', { requestId: requestId })
  return response
}
