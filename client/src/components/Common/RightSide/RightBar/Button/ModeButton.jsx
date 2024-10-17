import React from 'react'
import { Tooltip, useColorScheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'

const ModeButton = () => {
  function ModeToggle() {
    const { mode, setMode } = useColorScheme()
    return (
      <Tooltip title='Chế độ'>
        <IconButton
          size='medium'
          color='primary'
          onClick={() => {
            setMode(mode === 'light' ? 'dark' : 'light')
          }}>
          {mode === 'light' ? <DarkModeOutlinedIcon fontSize='medium' /> : <LightModeOutlinedIcon />}
        </IconButton>
      </Tooltip>
    )
  }

  return <ModeToggle />
}

export default ModeButton
