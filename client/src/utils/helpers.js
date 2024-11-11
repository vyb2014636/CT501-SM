import Swal from 'sweetalert2'

export const confirmAction = (text, action) => {
  Swal.fire({
    title: 'Xác nhận ',
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Đồng ý',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      action()
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        confirmButtonText: 'OK'
      })
    }
  })
}

export const setFalse = (...setters) => setters.forEach((setter) => setter(false))

export const setValues = (...statePairs) => {
  statePairs.forEach(([setter, value]) => setter(value))
}
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}

export const formatFullname = (firstName, lastName) => {
  return `${firstName} ${lastName}` || ''
}
export const getFriendshipStatus = (userId, userCurrent, sentRequests, receivedRequests) => {
  let requestId = null
  let statusFriendship = 'noRelationship'
  if (userId === userCurrent._id) return null

  console.log(userCurrent)

  const sentRequest = sentRequests.find((req) => req.to === userId)
  const receivedRequest = receivedRequests.find((req) => req.from === userId)
  const isFriend = userCurrent.friends.some((friend) => friend._id === userId)
  if (sentRequest) {
    statusFriendship = 'waitAccept'
    requestId = sentRequest._id
  }
  if (receivedRequest) {
    statusFriendship = 'waitMe'
    requestId = receivedRequest._id
  }
  if (isFriend) statusFriendship = 'friends'
  return { statusFriendship, requestId }
}

export const isMe = (userId, userCurrentId) => {
  return userId.toString() === userCurrentId.toString()
}
