import React, { useState } from 'react'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import FlexRow from '@/components/Flex/FlexRow'
import FlexColumn from '@/components/Flex/FlexColumn'
import { formatFullname } from '@/utils/helpers'
import MyAvartarBackground from '../Common/AvatarBackground/MyAvartarBackground'
import OtherAvartarBackground from '../Common/AvatarBackground/OtherAvartarBackground'
import ProfileStat from '../Common/Profile/ProfileStat'
import ProfileTabs from '../Common/Profile/ProfileTabs'
import EditInfoButton from '../Button/EditInfoButton'
import EditProfileForm from '../Form/EditProfileForm'

const CardProfile = ({ user, totalPosts, children, myCardProfile = false }) => {
  const [value, setValue] = useState(0)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleEditClick = () => setIsEditOpen(true)
  const handleCloseEdit = () => setIsEditOpen(false)

  const handleEditSubmit = (formData) => {
    console.log('Updated data:', formData)
    handleCloseEdit()
  }
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const { firstname, lastname, friends } = user || {}

  return (
    <FlexColumn sx={{ backgroundColor: 'background.paper', height: 500, borderRadius: '12px 12px 0 0', mb: 2 }}>
      {myCardProfile ? <MyAvartarBackground user={user} /> : <OtherAvartarBackground user={user} />}

      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant='h5' fontWeight='bold'>
          {formatFullname(firstname, lastname)}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        {myCardProfile ? <EditInfoButton onClick={handleEditClick} /> : <FlexRow gap={2}>{children}</FlexRow>}
      </Box>

      <ProfileStat friendsCount={friends?.length} totalPosts={totalPosts} />
      <ProfileTabs value={value} handleChange={handleChange} />

      <EditProfileForm open={isEditOpen} onClose={handleCloseEdit} user={user} onSubmit={handleEditSubmit} />
    </FlexColumn>
  )
}

export default CardProfile
