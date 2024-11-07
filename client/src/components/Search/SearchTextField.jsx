import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import PageviewRoundedIcon from '@mui/icons-material/PageviewRounded'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import useDebounce from '@/hooks/useDebounce'
import { searchAPI } from '@/apis/user/userAPI'
import { useProfileNavigation } from '@/hooks/useProfileNavigation'
import { useSelector } from 'react-redux'
import SearchList from './List/SearchList'

const SearchTextField = () => {
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
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
          setError(true)
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
    <>
      <Box sx={{ flex: 3, height: (theme) => theme.myApp.heighHeader, alignItems: 'stretch' }}>
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
      </Box>
      {query && query.trim !== '' && <SearchList loading={loading} users={users} userCurrent={user} />}
    </>
  )
}

export default SearchTextField
