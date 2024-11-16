import ApiError from '~/middlewares/ApiError'
import logModel from '~/models/logModel'
import notificationModel from '~/models/notificationModel'
import postModel from '~/models/postModel'
import userModel from '~/models/userModel'
import { sendNotification } from '~/sockets/'
import mongoose from 'mongoose'

const notifyFriendsAboutPost = async (userId, post, type) => {
  try {
    const notifications = post.byPost.friends.map((friend) => ({
      type: type,
      sender: userId,
      receiver: friend,
      postId: post._id
    }))

    const savedNotifications = await notificationModel.insertMany(notifications)

    savedNotifications.forEach(async (notification) => {
      await notification.populate('sender postId', 'firstname lastname fullname avatar')
      sendNotification(notification.receiver, 'newPost', {
        userName: post.byPost.fullname,
        post: post,
        notification: notification
      })
    })
  } catch (error) {
    throw error
  }
}

const notifyShareToByPost = async (my, receiver, postId, type) => {
  try {
    const notification = new notificationModel({
      sender: my.id,
      receiver: receiver._id,
      type: type,
      postId
    })
    await notification.save()
    await notification.populate('sender postId', 'firstname lastname fullname avatar')

    sendNotification(receiver._id, 'sharedPost', {
      userName: my.fullname,
      notification: notification
    })
  } catch (error) {
    throw error
  }
}

const createPost = async (describe, myId, images, videos) => {
  try {
    if (videos?.length > 2) throw new ApiError(400, 'Không thể upload quá 2 video')

    const newPost = await postModel.create({
      describe,
      byPost: myId.id,
      images,
      videos
    })
    await newPost.populate('byPost', 'firstname lastname fullname avatar friends')

    await notifyFriendsAboutPost(myId.id, newPost, 'newPost')

    await logModel.create({
      user: myId.id,
      action: 'CREATE_POST',
      details: 'Người dùng đăng bài.',
      post: newPost._id
    })
    return newPost
  } catch (error) {
    throw error
  }
}
const sharePost = async (postId, myId, describe) => {
  try {
    const post = await postModel.findById(postId).populate('sharedPost')

    if (!post) throw new Error('Bài đăng bạn muốn chia sẻ không tồn tại')

    const originalPost = post.sharedPost || post.sharedPost === null ? post.sharedPost : post
    if (post.sharedPost === null) throw new ApiError(400, 'Bài đăng đã bị xóa')
    if (originalPost.status !== 'normal') throw new ApiError(400, 'Bài đăng này có dấu hiệu vi phạm hoặc đã bị xóa')
    const sharedPost = new postModel({
      byPost: myId.id,
      describe,
      sharedPost: originalPost._id
    })

    await sharedPost.save()

    originalPost.sharesBy.push(myId.id)
    await originalPost.save()

    if (originalPost.byPost.toString() !== myId.id) await notifyShareToByPost(myId, originalPost.byPost, sharedPost._id, 'sharedPost')

    await logModel.create({
      user: myId.id,
      action: 'SHARED_POST',
      details: 'Người dùng chia sẻ bài đăng.',
      post: sharedPost._id
    })

    return sharedPost
  } catch (error) {
    throw error
  }
}

const getPost = async (postId) => {
  try {
    const post = await postModel.findById(postId).lean()

    if (!post) throw new ApiError(404, 'Bài viết không tồn tại')

    return post
  } catch (error) {
    throw error
  }
}

const getPostsTrash = async (myId) => {
  try {
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1) // Lấy thời gian 1 tháng trước

    const days = await postModel.aggregate([
      {
        $match: {
          byPost: new mongoose.Types.ObjectId(myId), // Lọc bài viết theo user ID
          status: 'trash',
          createdAt: { $gte: oneMonthAgo } // Chỉ lấy bài viết trong vòng 1 tháng
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%d tháng %m, %Y', date: '$trashDate' } }, // Nhóm theo ngày
          posts: { $push: '$$ROOT' } // Đưa toàn bộ bài viết vào danh sách
        }
      },
      { $sort: { _id: -1 } } // Sắp xếp ngày giảm dần
    ])

    for (let group of days) {
      group.posts = await postModel.populate(group.posts, [
        { path: 'byPost' },
        { path: 'sharedPost', populate: { path: 'byPost', select: 'firstname lastname email background avatar' } },
        { path: 'sharesBy', select: 'firstname lastname email background avatar' }
      ])
    }

    return days
  } catch (error) {
    throw error
  }
}

const getPosts = async (loggedInId, userId, limit, skip) => {
  try {
    let filter = { byPost: loggedInId }
    let user = null

    if (!userId) {
      user = await userModel.findByIdPopulateAddress(loggedInId)
      const friendIds = user?.friends.map((friend) => friend._id)
      filter = { byPost: { $in: [loggedInId, ...friendIds] }, status: 'normal' }
      // filter = { byPost: { $in: [loggedInId, ...friendIds] } }
    } else {
      user = await userModel.findByIdPopulateAddress(userId)
      if (!user) throw new ApiError(404, 'Không tìm thấy người dùng')
      filter = { byPost: userId, status: 'normal' }
      // filter = { byPost: userId }
    }

    const totalPosts = await postModel.find(filter).countDocuments()

    const posts = await postModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)

    return { posts, totalPosts, user }
  } catch (error) {
    throw error
  }
}

const likePost = async (userId, postId) => {
  try {
    const post = await postModel.findById(postId)

    if (!post) throw new ApiError(404, 'Không tìm thấy bài post')

    if (post.status !== 'normal') throw new ApiError(400, 'Bài đăng này có dấu hiệu vi phạm hoặc đã bị xóa')

    const isLiked = post.likes.some((like) => like._id.toString() === userId.toString())
    let message = ''
    if (isLiked) {
      post.likes = post.likes.filter((like) => like._id.toString() !== userId)
      message = 'Bỏ like thành công'
    } else {
      post.likes.push(userId)
      message = 'Like thành công'
    }

    const quantity = post.likes.length

    await post.save()

    await post.populatePost()

    return { message, post, quantity }
  } catch (error) {
    throw error
  }
}

const getComments = async (postID, page, limit) => {
  try {
    // Tìm post và populate comments
    const post = await postModel.findByIdWithComments(postID)

    if (!post) throw new ApiError(404, 'Không tìm thấy bài Post')

    const totalComments = post.comments.length
    const slicedComments = post.comments.slice((page - 1) * limit, page * limit)

    return {
      ...post,
      comments: slicedComments,
      hasMoreComments: page * limit < totalComments
    }
  } catch (error) {
    throw error
  }
}

const addComment = async (postID, content, myId) => {
  try {
    const post = await postModel.findById(postID)

    if (!post) throw new ApiError(404, 'Không tìm thấy bài post')

    post.comments.push({
      user: myId,
      content
    })
    const populatedPost = await post.populate('comments.user comments.replies.user comments.likes')
    await post.save()

    return populatedPost
  } catch (error) {
    throw error
  }
}

const getReplies = async (postId, commentId, page, limit) => {
  try {
    const post = await postModel.findById(postId).populate('comments.user comments.replies.user comments.likes') //.lean()

    const comment = post.comments.id(commentId)
    if (!comment) throw new ApiError(404, 'Comment không tồn tại')

    const startIndex = (page - 1) * limit
    const replies = comment.replies.slice(startIndex, startIndex + limit)
    const hasMoreReplies = comment.replies.length > startIndex + limit

    return { replies, hasMoreReplies }
  } catch (error) {
    throw error
  }
}

const addReply = async (postId, commentId, content, myId) => {
  try {
    const post = await postModel.findById(postId)
    if (!post) throw new ApiError(404, 'Không tìm thấy')

    const comment = post.comments.id(commentId)

    if (!comment) throw new ApiError(404, 'Không tìm thấy comment này')

    comment.replies.push({
      user: myId,
      content,
      createdAt: new Date()
    })

    await post.save()

    comment.replies.sort((a, b) => b.createdAt - a.createdAt)

    const populatedPost = await post.populatePost()
    return { comment: populatedPost.comments.id(commentId), post: populatedPost }
  } catch (error) {
    throw error
  }
}

const likeComment = async (postId, commentId, userId) => {
  try {
    const post = await postModel.findById(postId)
    if (!post) throw new ApiError(404, 'Post not found')
    const comment = post.comments.id(commentId)
    if (!comment) throw new ApiError(404, 'Comment not found')

    const isLiked = comment.likes.includes(userId)

    if (isLiked) {
      comment.likes = comment.likes.filter((id) => id.toString() !== userId)
    } else {
      comment.likes.push(userId)
    }

    await post.save()

    await post.populate([
      { path: 'comments.user', select: 'firstname lastname avatar' },
      { path: 'comments.likes', select: 'firstname lastname avatar' }
    ])

    // await post.populate({
    //   path: 'comments.user',
    //   select: 'firstname lastname avatar'
    // })
    // await post.populate({
    //   path: 'comments.likes',
    //   select: 'firstname lastname avatar'
    // })
    return {
      message: isLiked ? 'Bỏ like thành công' : 'Like thành công',
      comment: post.comments.id(commentId)
    }
  } catch (error) {
    throw error
  }
}

const likeReply = async (postId, commentId, replyId, userId) => {
  try {
    const post = await postModel.findById(postId)
    if (!post) throw new ApiError(404, 'Post not found')

    const comment = post.comments.id(commentId)
    if (!comment) throw new ApiError(404, 'Comment not found')

    const reply = comment.replies.id(replyId)
    if (!reply) throw new ApiError(404, 'Reply not found')

    const isLiked = reply.likes.some((like) => like._id.toString() === userId)
    if (isLiked) {
      reply.likes = reply.likes.filter((like) => like._id.toString() !== userId)
    } else {
      reply.likes.push(userId)
    }

    await post.save()

    const populatedPost = await post.populate({
      path: 'comments.replies.user',
      select: 'firstname lastname avatar'
    })

    return {
      message: isLiked ? 'Bỏ like phản hồi thành công' : 'Like phản hồi thành công',
      comment: populatedPost.comments.id(commentId),
      reply: populatedPost.comments.id(commentId).replies.id(replyId)
    }
  } catch (error) {
    throw error
  }
}

const putInTrashPost = async (postId, userId) => {
  try {
    if (!(postId || userId)) throw new ApiError(403, 'Vui lòng cung cấp đủ trường')

    // Lấy bài viết theo ID
    const post = await postModel.findById(postId)

    if (!post) throw new ApiError(404, 'Bài viết không tồn tại')

    // Cập nhật trạng thái thành trash và lưu lại thời gian trashDate
    post.status = 'trash'
    post.trashDate = Date.now()

    // Lưu bài viết với trạng thái mới
    await post.save()

    return post
  } catch (error) {
    throw error
  }
}

const restorePostFromTrash = async (postId, userId) => {
  try {
    if (!(postId || userId)) throw new ApiError(403, 'Vui lòng cung cấp đủ trường')

    // Cập nhật trạng thái bài viết từ "trash" thành "normal" và xóa trường trashDate
    const post = await postModel.findOneAndUpdate(
      { _id: postId, status: 'trash' },
      { status: 'normal', trashDate: null }, // Gán null cho trashDate để xóa TTL
      { new: true }
    )

    if (!post) {
      throw new ApiError(404, 'Bài viết không tồn tại hoặc không ở trạng thái trash')
    }

    // Gửi thông báo (nếu có)
    // if (post) {
    //   sendNotification(receiver, 'restorePost', {
    //     userName: my.fullname,
    //     notification: 'Bài viết đã được phục hồi.'
    //   });
    // }

    return post
  } catch (error) {
    throw error
  }
}

const deleteFromTrashPost = async (postId, userId) => {
  try {
    if (!(postId || userId)) throw new ApiError(403, 'Vui lòng cung cấp đủ trường')

    // Lấy bài viết theo ID
    const post = await postModel.findOne({ _id: postId, status: 'trash' })

    if (!post) throw new ApiError(404, 'Bài viết cần xóa không tồn tại không tồn tại')

    // Cập nhật trạng thái thành trash và lưu lại thời gian trashDate
    post.status = 'delete'
    post.deleteDate = Date.now()

    // Lưu bài viết với trạng thái mới
    await post.save()

    return post
  } catch (error) {
    throw error
  }
}

export const postService = {
  createPost,
  getPosts,
  sharePost,
  likePost,
  getComments,
  addComment,
  getReplies,
  addReply,
  likeComment,
  likeReply,
  getPost,
  putInTrashPost,
  restorePostFromTrash,
  getPostsTrash,
  deleteFromTrashPost
}
