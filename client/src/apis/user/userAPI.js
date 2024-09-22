import axiosIntercept from '@/apis/axiosIntercept'

export const getListSuggestion = async () => {
  const response = await axiosIntercept.get('user/noFriends')
  return response
}
export const checkFriendshipAPI = async (checkUserId) => {
  const response = await axiosIntercept.get(`requestFriend/friendship/${checkUserId}`)
  return response
}

export const getRequests = async () => {
  const response = await axiosIntercept.get('requestFriend/')
  return response
}

export const sendFriendAPI = async (to) => {
  const response = await axiosIntercept.post('requestFriend/sendRequest', to)
  return response
}

export const cancelAddFriendAPI = async (to) => {
  const response = await axiosIntercept.post('requestFriend/cancelRequest', to)
  return response
}
export const acceptAddFriendAPI = async (requestId) => {
  const response = await axiosIntercept.post('requestFriend/acceptRequest', { requestId: requestId })
  return response
}
export const rejectAddFriendAPI = async (requestId) => {
  const response = await axiosIntercept.post('requestFriend/rejectRequest', { requestId: requestId })
  return response
}
export const cancelFriendAPI = async (toUser) => {
  const response = await axiosIntercept.put('user/unFriend', { targetId: toUser })
  return response
}

export const requestsToMe = async () => {
  const requests = await axiosIntercept.get('requestFriend/requests-to-me')
  return requests
}
export const requestsMysent = async () => {
  const requests = await axiosIntercept.get('requestFriend/requests-my-sent')
  return requests
}
