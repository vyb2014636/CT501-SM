import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import PageviewRoundedIcon from '@mui/icons-material/PageviewRounded'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useDebounce from '@/hooks/useDebounce'
import { searchAPI } from '@/apis/user/userAPI'
import { Avatar, ListItemAvatar } from '@mui/material'
import { useProfileNavigation } from '@/hooks/useProfileNavigation'
import { useSelector } from 'react-redux'

const SearchTextField = () => {
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()
  const debouncedQuery = useDebounce(query, 300)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    const handleSearch = async () => {
      if (debouncedQuery.length > 0) {
        setLoading(true)
        try {
          const response = await searchAPI(debouncedQuery)
          setUsers(response.users)
        } catch (error) {
          console.error('Error fetching search users', error)
        }
        setLoading(false)
      } else {
        setUsers([])
      }
    }

    handleSearch()
  }, [debouncedQuery])

  const handleInputChange = (e) => {
    setQuery(e.target.value)
    setAnchorEl(e.currentTarget)
  }

  const handleFocus = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileClick = useProfileNavigation()

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query.trim())}`)
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div>
      <TextField
        variant='outlined'
        size='small'
        placeholder='Tìm kiếm'
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        autoComplete='off'
        onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: (
            <IconButton sx={{ cursor: 'pointer' }} onClick={handleSearch}>
              <PageviewRoundedIcon fontSize='large' color='primary' />
            </IconButton>
          ),
          sx: {
            borderRadius: '12px'
          }
        }}
      />
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement='bottom-start' style={{ zIndex: 1300 }}>
        <Paper style={{ width: '100%' }}>
          <List>
            {users.map((userSearch) => (
              <ListItem key={userSearch._id} onClick={() => handleProfileClick(userSearch._id, user._id)} button>
                <ListItemAvatar>
                  <Avatar src={userSearch.avatar} />
                </ListItemAvatar>
                <ListItemText primary={`${userSearch.firstname} ${userSearch.lastname}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>
    </div>
  )
}

export default SearchTextField
