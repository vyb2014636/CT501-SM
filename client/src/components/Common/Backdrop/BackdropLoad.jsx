import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const BackdropLoad = () => {
  const isOpen = useSelector((state) => state.loading.isOpen)

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1000 })} open={isOpen}>
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}

export default BackdropLoad
