import { SvgIcon } from '@mui/material'
import React from 'react'

const LinkLine = ({ startX, startY, endX, endY }) => {
  const curve = `M${startX},${startY} C${startX},${startY + 50} ${endX},${endY - 50} ${endX},${endY}`
  return (
    <svg height='200' width='50' style={{ overflow: 'visible' }}>
      <path
        d='M10 0 C10 50, 10 50, 10 100 S 10 150, 10 200'
        stroke='#E5E7EB' // Màu sắc đường cong giống màu trong hình
        fill='transparent'
        strokeWidth='2'
      />
    </svg>
  )
}

export default LinkLine
