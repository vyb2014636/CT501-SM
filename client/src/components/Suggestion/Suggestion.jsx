import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ListSuggestion from './ListSuggestion/ListSuggestion'
import { getListSuggestion } from '@/apis/user/userAPI'

const Suggestion = () => {
  const [suggestions, setSuggestions] = useState(null)
  const fetchListNoFriends = async () => {
    try {
      const response = await getListSuggestion()
      setSuggestions(response.listUser)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchListNoFriends()
  }, [])

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: '18px',
        p: 3,
        mt: '15px'
      }}>
      <Typography variant='h7' gutterBottom color='primary' fontWeight='bold'>
        Những người bạn có thể biết
      </Typography>
      {suggestions?.map((user, id) => (
        <ListSuggestion userNoFriend={user} id={id} key={id} />
      ))}
    </Box>
  )
}

export default Suggestion
