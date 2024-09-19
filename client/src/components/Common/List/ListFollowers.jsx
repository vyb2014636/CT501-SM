import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Followers } from '@/data/follower'
import FollowerCard from '../../Card/FollowerCard'
import { getListNoFriends } from '@/apis/user/userAPI'
import { toast } from 'react-toastify'

const ListFollowers = () => {
  const [listNoFriends, setlistNoFriends] = useState(null)
  const fetchListNoFriends = async () => {
    try {
      const response = await getListNoFriends()
      setlistNoFriends(response.listUser)
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
      {listNoFriends?.map((user, id) => (
        <FollowerCard follower={user} id={id} key={id} />
      ))}
    </Box>
  )
}

export default ListFollowers
