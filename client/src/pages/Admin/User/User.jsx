import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { fetchListUserForAdmin, updateStatusAPI } from '@/apis/user/userAPI'
import ConfirmationDialog from '@/components/Common/ConfirmationDialog/ConfirmationDialog'
import EditUserForm from '@/components/Admin/Form/EditUserForm'
import { toast } from 'react-toastify'
import UsersTable from '@/components/Admin/Table/UsersTable'
import MiniPostList from '@/components/Admin/List/MiniPostList'

export default function User() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editPosts, setEditPosts] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const response = await fetchListUserForAdmin()
        setUsers(response.users)
      } catch (error) {
        console.log(error.message)
      }
      setLoading(false)
    }
    fetchUsers()

    // Khôi phục trạng thái từ localStorage
    const savedEditMode = localStorage.getItem('editMode')

    const savedUser = JSON.parse(localStorage.getItem('selectedUser'))

    if (savedEditMode && savedUser) {
      setEditMode(JSON.parse(savedEditMode))
      setSelectedUser(savedUser)
    }
  }, [])

  const handleCancelEdit = () => {
    setEditMode(false)
    localStorage.removeItem('editMode')
    localStorage.removeItem('selectedUser')
  }
  const handleCancelPosts = () => setEditPosts(false)

  if (loading) return <Typography>Loading....</Typography>
  if (!loading && !users.length) return <Typography>Không có dữ liệu</Typography>

  return (
    <Box sx={{ backgroundColor: 'background.paper', width: '100%', overflow: 'hidden', mt: 4 }}>
      {editMode ? (
        <EditUserForm user={selectedUser} onCancel={handleCancelEdit} setUsers={setUsers} setEditMode={setEditMode} />
      ) : editPosts ? (
        <MiniPostList user={selectedUser} onBack={handleCancelPosts} />
      ) : (
        <UsersTable
          users={users}
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
          handleCloseMenu={handleCancelEdit}
          setUsers={setUsers}
          setEditMode={setEditMode}
          setEditPosts={setEditPosts}
        />
      )}
    </Box>
  )
}
