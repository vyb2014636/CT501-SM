import React, { useEffect, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { getListSuggestion } from '@/apis/user/userAPI'
import FlexColumn from '../Common/Flex/FlexColumn'
import SuggestionCard from './ListSuggestion/SuggestionCard'
import { SentimentDissatisfied } from '@mui/icons-material'
import SuggestionSkeleton from '../Common/Skeleton/SuggestionSkeleton'

const Suggestion = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [suggestions, setSuggestions] = useState([])

  const fetchListNoFriends = useCallback(async () => {
    try {
      setLoading(true)
      const response = await getListSuggestion()
      setSuggestions(response.listUser || [])
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi khi tải dữ liệu.')
      console.log(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchListNoFriends()
  }, [fetchListNoFriends])

  const renderContent = () => {
    if (loading) return <SuggestionSkeleton />
    if (error)
      return (
        <Typography color='error' align='center'>
          {error}
        </Typography>
      )
    if (suggestions.length === 0)
      return (
        <FlexColumn alignItems='center' mt={2}>
          <SentimentDissatisfied sx={{ fontSize: 50, color: 'gray', mb: 1 }} />
          <Typography borderRadius={4} p={2} variant='body1' sx={{ backgroundColor: 'background.paper' }} align='center' fontWeight='bold'>
            Bạn đã kết bạn với tất cả
          </Typography>
        </FlexColumn>
      )

    return suggestions.map((user, id) => <SuggestionCard userNoFriend={user} key={id} />)
  }

  return (
    <FlexColumn
      sx={{
        mt: '15px',
        flex: 10
      }}>
      <List
        sx={{
          bgcolor: 'background.paper',
          borderRadius: '18px',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <ListItem>
          <Typography variant='h6' gutterBottom color='primary' fontWeight='bold'>
            Những người bạn có thể biết
          </Typography>
        </ListItem>
        {renderContent()}
      </List>
    </FlexColumn>
  )
}

export default React.memo(Suggestion)
