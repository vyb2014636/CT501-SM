import React, { useState, useEffect, useRef } from 'react'
import { Box, TextField, IconButton } from '@mui/material'
import PageviewRoundedIcon from '@mui/icons-material/PageviewRounded'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined'
import { useNavigate } from 'react-router-dom'
import useDebounce from '@/hooks/useDebounce'
import { searchAPI } from '@/apis/user/userAPI'
import SearchList from './List/SearchList'
import FlexRow from '../Common/Flex/FlexRow'

const SearchTextField = () => {
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const debouncedQuery = useDebounce(query, 300)
  const navigate = useNavigate()

  const inputRef = useRef(null)

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

  useEffect(() => {
    // Khi box mở (anchorEl không null), focus vào input dưới
    if (anchorEl) {
      inputRef.current?.focus()
    }
  }, [anchorEl]) // Mỗi khi anchorEl thay đổi, focus vào input

  const handleOpenSearch = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleChangeInput = (e) => setQuery(e.target.value)
  const handleFocus = (event) => setAnchorEl(event.currentTarget)

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query)
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
          onClick={handleOpenSearch}
          autoComplete='off'
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

      {anchorEl && (
        <Box position='absolute' top={0} left={0} right={0} sx={{ backgroundColor: 'background.paper', minHeight: 100, zIndex: 1000, boxShadow: 3 }}>
          <FlexRow gap={2} p={3}>
            <IconButton onClick={() => setAnchorEl(null)}>
              <KeyboardBackspaceOutlinedIcon />
            </IconButton>
            <TextField
              variant='outlined'
              size='small'
              placeholder='Tìm kiếm'
              fullWidth
              autoComplete='off'
              value={query}
              onChange={handleChangeInput}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              inputRef={inputRef} // Đưa ref vào input dưới
            />
          </FlexRow>
          <SearchList loading={loading} users={users} query={query} setQuery={setQuery} handleSearch={handleSearch} />
        </Box>
      )}
    </>
  )
}

export default SearchTextField
