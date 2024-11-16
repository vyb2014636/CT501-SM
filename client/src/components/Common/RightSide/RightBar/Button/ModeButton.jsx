import React from 'react'
import { Tooltip, useColorScheme } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'

const ModeButton = () => {
  function ModeToggle() {
    const { mode, setMode } = useColorScheme()
    return (
      <Tooltip title='Chế độ'>
        <MenuItem
          size='medium'
          color='primary'
          onClick={() => {
            setMode(mode === 'light' ? 'dark' : 'light')
          }}>
          {mode === 'light' ? <DarkModeOutlinedIcon fontSize='medium' color='primary' /> : <LightModeOutlinedIcon color='primary' />}
        </MenuItem>
      </Tooltip>
    )
  }

  return <ModeToggle />
}

export default ModeButton
