import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { getListSuggestion } from '@/apis/user/userAPI'
import FlexColumn from '../Common/Flex/FlexColumn'
import SuggestionCard from './ListSuggestion/SuggestionCard'
import { useSelector } from 'react-redux'

const Suggestion = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [suggestions, setSuggestions] = useState(null)
  const { requests, sends } = useSelector((state) => state.request)

  const fetchListNoFriends = async () => {
    try {
      setLoading(true)
      const response = await getListSuggestion()
      setSuggestions(response.listUser)
    } catch (error) {
      setError(true)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchListNoFriends()
  }, [])

  if (loading) return <Typography>...loading</Typography>

  if (error) return <Typography>Không có dữ liệu</Typography>

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
