import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, MenuItem, Button, Typography } from '@mui/material'
import FlexCenter from '@/components/Common/Flex/FlexCenter'
import { toast } from 'react-toastify'
import { updateStatusAPI } from '@/apis/user/userAPI'
import { useLocation, useNavigate } from 'react-router-dom'
import ConfirmationDialog from '@/components/Common/ConfirmationDialog/ConfirmationDialog'

const WarningForm = () => {
  return <div>WarningForm</div>
}

export default WarningForm
