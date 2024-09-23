// hooks/useProfileNavigation.js
import { useNavigate } from 'react-router-dom'

export const useProfileNavigation = () => {
  const navigate = useNavigate()

  const handleProfileClick = (userId, currentUserId) => {
    if (currentUserId === userId) {
      navigate(`/${userId}/person`)
    } else {
      navigate(`/${userId}`)
    }
  }

  return handleProfileClick
}
