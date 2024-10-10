import React, { memo } from 'react'

// HOC withLoader.js
const withLoader = (WrappedComponent, LoadingSkeleton, EmptyMessage) => {
  return (props) => {
    const { loading, items } = props

    // Kiểm tra loading và items
    if (loading && items.length === 0) {
      return LoadingSkeleton
    }

    if (items.length === 0) {
      return EmptyMessage
    }

    return <WrappedComponent {...props} />
  }
}

export default withLoader
