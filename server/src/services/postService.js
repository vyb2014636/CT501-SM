import ApiError from '~/middlewares/ApiError'
import notificationModel from '~/models/notificationModel'
import postModel from '~/models/postModel'
import userModel from '~/models/userModel'
import { sendNotification } from '~/sockets'

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
      receiver,
      type: type,
      postId
    })
    await notification.save()
    await notification.populate('sender postId', 'firstname lastname fullname avatar')

    sendNotification(receiver, 'sharedPost', {
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

    return newPost
  } catch (error) {
    throw error
  }
}

const getPost = async (postId) => {
  try {
    let postQuery = postModel.findById(postId)

    postQuery = postModel.populateFields(postQuery)

    const post = await postQuery.lean()

    if (!post) throw new ApiError(404, 'Bài viết không tồn tại')

    return post
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
      filter = { byPost: { $in: [loggedInId, ...friendIds] } }
    } else {
      user = await userModel.findByIdPopulateAddress(userId)
      filter = { byPost: userId }
      if (!user) throw new ApiError(404, 'Không tìm thấy')
    }

    const totalPosts = await postModel.find(filter).countDocuments()

    let postsQuery = postModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)

    postsQuery = postModel.populateFields(postsQuery)

    const posts = await postsQuery.lean()

    return { posts, totalPosts, user }
  } catch (error) {
    throw error
  }
}

const likePost = async (userId, postId) => {
  try {
    const post = await postModel.findByIdPopulates(postId)

    if (!post) throw new ApiError(404, 'Không tìm thấy bài post')

    const isLiked = post.likes.includes(userId)
    let message = ''
    if (isLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId)
      message = 'Bỏ like thành công'
    } else {
      post.likes.push(userId)
      message = 'Like thành công'
    }

    const quantity = post.likes.length
    await post.save()

    return { message, post, quantity }
  } catch (error) {
    throw error
  }
}

const sharePost = async (postId, myId, describe) => {
  try {
    const post = await postModel.findById(postId).populate('sharedPost')

    if (!post) throw new Error('Bài đăng bạn muốn chia sẻ không tồn tại')

    const originalPost = post.sharedPost ? post.sharedPost : post

    // if (originalPost.byPost.toString() === myId.id) throw new Error('Bạn không thể tự chia sẻ bài viết của chính mình')

    const sharedPost = new postModel({
      byPost: myId.id,
      describe,
      sharedPost: originalPost._id
    })

    await sharedPost.save()

    originalPost.sharesBy.push(myId.id)
    await originalPost.save()

    if (originalPost.byPost.toString() !== myId.id) await notifyShareToByPost(myId, originalPost.byPost, sharedPost._id, 'sharedPost')

    return sharedPost
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
  //  try {
  //   const post = await Post.findByIdPopulates(postID)

  //   const totalComments = post.comments.length
  //   const slicedComments = post.comments.slice((page - 1) * limit, page * limit)
  //   await Post.populate(slicedComments, {
  //     path: 'user replies.user likes',
  //     select: 'firstname lastname avatar '
  //   })

  //   const hasMoreComments = page * limit < totalComments
  //   return {
  //     ...post.toObject(),
  //     comments: slicedComments,
  //     hasMoreComments
  //   }
  //  } catch (error) {
  //   throw error
  //  }
}

const addComment = async (postID, content, myId) => {
  try {
    const post = await postModel.findById(postID)

    if (!post) throw new ApiError(404, 'Không tìm thấy bài post')

    // post.comments.push({
    //   user: myId,
    //   content
    // })

    // await post.save()

    // const populatedPost = await post.populate('comments.user comments.replies.user comments.likes')

    // Sử dụng phương thức addComment đã tạo trong model
    const populatedPost = await post.addComment(myId, content)
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

    const populatedPost = await post.populate({
      path: 'comments.replies.user',
      select: 'firstname lastname avatar'
    })
    return populatedPost.comments.id(commentId)
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

    const isLiked = reply.likes.includes(userId)
    if (isLiked) {
      reply.likes = reply.likes.filter((id) => id.toString() !== userId)
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
  getPost
}
