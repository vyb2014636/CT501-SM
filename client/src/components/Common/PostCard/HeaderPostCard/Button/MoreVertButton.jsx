import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'

const MoreVertButton = ({ userPost }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { user } = useSelector((state) => state.auth)
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  return (
    <>
      <IconButton aria-haspopup='true' aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='option-post'
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        onClose={() => setAnchorEl(null)}>
        {userPost._id === user._id && (
          <MenuItem onClick={() => setAnchorEl(null)}>
            <DeleteOutlinedIcon />
            <Typography ml={1}>Xóa</Typography>
          </MenuItem>
        )}
        <MenuItem onClick={() => setAnchorEl(null)}>
          <FavoriteBorderOutlinedIcon />
          <Typography ml={1}>Yêu thích</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

export default MoreVertButton
