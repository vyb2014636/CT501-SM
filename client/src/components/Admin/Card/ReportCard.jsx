import React, { memo } from 'react'
import ReportShareCard from './ReportShareCard'
import ReportPostCard from './ReportPostCard'

const ReportCard = ({ reportPost }) => {
  return reportPost?.sharedPost ? <ReportShareCard post={reportPost} /> : <ReportPostCard post={reportPost} />
}

export default memo(ReportCard)
