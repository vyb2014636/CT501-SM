import React from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

const TableTitle = ({ title, path }) => {
  const navigate = useNavigate()
  return (
    <Box position='relative' p={2}>
      <Typography variant='h5' align='center' fontWeight='bold'>
        {title}
      </Typography>
      {path && (
        <IconButton onClick={() => navigate(`${path}`)} sx={{ position: 'absolute', top: 0, left: 0 }} size='large'>
          <ArrowBackOutlinedIcon />
        </IconButton>
      )}
    </Box>
  )
}

export default TableTitle
