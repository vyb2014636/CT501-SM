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
  const response = await axiosIntercept.post('requestFriend/sendRequest', { to })
  return response
}

export const cancelAddFriendAPI = async (to) => {
  const response = await axiosIntercept.put('requestFriend/cancelRequest', { to })
  return response
}
export const acceptAddFriendAPI = async (from) => {
  const response = await axiosIntercept.put('requestFriend/acceptRequest', { from })
  return response
}
export const rejectAddFriendAPI = async (from) => {
  const response = await axiosIntercept.put('requestFriend/rejectRequest', { from })
  return response
}
export const unFriendAPI = async (to) => {
  const response = await axiosIntercept.put('requestFriend/unfriend', { to })
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

export const uploadAvatar = async (formData) => {
  const response = await axiosIntercept.put('user/uploadAvatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response
}

export const uploadBackground = async (formData) => {
  const response = await axiosIntercept.put('user/uploadBackground', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response
}

export const uploadInfo = async (formData) => {
  const response = await axiosIntercept.put('user/uploadInfo', formData)
  return response
}

export const searchAPI = async (query) => {
  const response = await axiosIntercept.get('user/search', { params: { query: query } })
  return response
}

export const fetchAllSearchAPI = async (query) => {
  const response = await axiosIntercept.get('user/searchAll', { params: { query: query } })
  return response
}
