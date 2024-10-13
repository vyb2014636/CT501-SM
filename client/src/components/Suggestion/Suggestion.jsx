import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { getListSuggestion } from '@/apis/user/userAPI'
import FlexColumn from '../Common/Flex/FlexColumn'
import SuggestionCard from './ListSuggestion/SuggestionCard'

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
    <FlexColumn
      sx={{
        mt: '15px',
        flex: 10
      }}>
      <List sx={{ bgcolor: 'background.paper', borderRadius: '18px', display: 'flex', flexDirection: 'column' }}>
        <ListItem>
          <Typography variant='h6' gutterBottom color='primary' fontWeight='bold'>
            Những người bạn có thể biết
          </Typography>
        </ListItem>
        {suggestions?.map((user, id) => (
          <SuggestionCard userNoFriend={user} key={id} />
        ))}
      </List>
    </FlexColumn>
  )
}

export default Suggestion
