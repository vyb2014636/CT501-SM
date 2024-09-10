import { useColorScheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import React from 'react'

const ModeButton = () => {
  function ModeToggle() {
    const { mode, setMode } = useColorScheme()
    return (
      <IconButton
        size='medium'
        color='primary'
        onClick={() => {
          setMode(mode === 'light' ? 'dark' : 'light')
        }}>
        {mode === 'light' ? <DarkModeOutlinedIcon fontSize='medium' /> : <LightModeOutlinedIcon />}
      </IconButton>
    )
  }

  return <ModeToggle />
}

export default ModeButton
