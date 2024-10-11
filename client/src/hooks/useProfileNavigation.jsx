// hooks/useProfileNavigation.js
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const useProfileNavigation = () => {
  const navigate = useNavigate()
  const currentUserId = useSelector((state) => state.auth.user._id)

  const handleProfileClick = (userId) => {
    if (currentUserId === userId) {
      navigate(`/personal`)
    } else {
      navigate(`/personal/${userId}`)
    }
  }

  return handleProfileClick
}
