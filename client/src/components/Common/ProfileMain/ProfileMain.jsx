import React, { useState } from 'react'
import ProfileTabs from '../ProfileCard/Tabs/ProfileTabs'
import PostsTab from './PostsTab/PostsTab'
import FriendsTab from './FriendsTab/FriendsTab'
import SharesTab from './SharesTab/SharesTab'
import ImagesTab from './ImagesTab/ImagesTab'

const ProfileMain = ({ currentUser, posts, scrollRef, user }) => {
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  const renderContent = () => {
    switch (value) {
      case 0:
        return <PostsTab posts={posts} currentUser={currentUser} scrollRef={scrollRef} userId={user._id} />
      case 1:
        return <FriendsTab user={user} />
      case 2:
        return <ImagesTab posts={posts} />
      case 3:
        return <SharesTab />
      default:
        return null
    }
  }

  return (
    <>
      <ProfileTabs value={value} handleChange={handleChange} />
      {renderContent()}
    </>
  )
}

export default ProfileMain
