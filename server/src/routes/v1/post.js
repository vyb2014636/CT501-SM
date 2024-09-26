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
  .post('/share', verifyToken, postController.sharePost)
  .post('/addComment', verifyToken, postController.addComment)
  .post('/addReply', verifyToken, postController.addReply)
  .put('/like', verifyToken, postController.likePost)
export const post = router
