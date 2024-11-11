import express from 'express'
import uploadCloud from '~/config/cloudinary.config'
import { postController } from '~/controllers/postController'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router
  .route('/')
  .get(verifyToken, postController.getPosts)
  .post(
    verifyToken,
    uploadCloud.fields([
      { name: 'images', minCount: 1, maxCount: 10 },
      { name: 'videos', maxCount: 2 }
    ]),
    postController.createPost
  )
router
  .get('/comments/replies', verifyToken, postController.getReplies)
  .get('/comments', verifyToken, postController.getComments)
  .get('/post/:postId', verifyToken, postController.getPost)
  .get('/trashPosts', verifyToken, postController.getPostsTrash)
  .post('/share', verifyToken, postController.sharePost)
  .post('/addComment', verifyToken, postController.addComment)
  .post('/addReply', verifyToken, postController.addReply)
  .put('/like', verifyToken, postController.likePost)
  .put('/likeComment', verifyToken, postController.likeComment)
  .put('/likeReply', verifyToken, postController.likeReply)
  .put('/trash', verifyToken, postController.putInTrashPost)
  .put('/restore', verifyToken, postController.restorePostFromTrash)

// router
//   .route('/')
//   .get(verifyToken, postController.getPosts) // Lấy danh sách bài viết
//   .post(
//     verifyToken,
//     uploadCloud.fields([
//       { name: 'images', minCount: 1, maxCount: 10 },
//       { name: 'videos', maxCount: 2 }
//     ]),
//     postController.createPost // Tạo bài viết mới
//   )

// router
//   .route('/:postId')
//   .get(verifyToken, postController.getPost) // Lấy bài viết theo ID
//   .put(verifyToken, postController.likePost) // Thích bài viết
//   .post('/share', verifyToken, postController.sharePost) // Chia sẻ bài viết

// router
//   .route('/:postId/comments')
//   .get(verifyToken, postController.getComments) // Lấy bình luận cho bài viết
//   .post(verifyToken, postController.addComment) // Thêm bình luận cho bài viết

// router.route('/:postId/comments/:commentId/replies').post(verifyToken, postController.addReply) // Thêm phản hồi cho bình luận

// router.route('/:postId/comments/:commentId/like').put(verifyToken, postController.likeComment) // Thích bình luận

// router.route('/:postId/comments/:commentId/replies/:replyId/like').put(verifyToken, postController.likeReply) // Thích phản hồi

export const post = router
