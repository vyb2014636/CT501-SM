import { useState, useEffect } from 'react'
import axios from 'axios'

const useFriendShip = (userId) => {
  const [friendRequestId, setFriendRequestId] = useState(null)
  const [sentFriendRequestId, setSentFriendRequestId] = useState(null)

  useEffect(() => {
    const fetchFriendRequests = async () => {
      const [receivedRequests, sentRequests] = await Promise.all([
        axios.get('/api/users/friend-requests'),
        axios.get('/api/users/sent-friend-requests')
      ])

      const receivedRequest = receivedRequests.data.find((req) => req.from._id === userId)
      const sentRequest = sentRequests.data.find((req) => req.to._id === userId)

      setFriendRequestId(receivedRequest ? receivedRequest._id : null)
      setSentFriendRequestId(sentRequest ? sentRequest._id : null)
    }

    fetchFriendRequests()
  }, [userId])

  return { friendRequestId, sentFriendRequestId }
}
