import express from 'express'
import uploadCloud from '~/config/cloudinary.config'
import { postController } from '~/controllers/postController'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router
  .route('/')
  .get(verifyToken, postController.getAllPosts)
  .post(
    verifyToken,
    uploadCloud.fields([
      { name: 'images', minCount: 1, maxCount: 10 },
      { name: 'videos', maxCount: 2 }
    ]),
    postController.createPost
  )
router.get('/profile', verifyToken, postController.getPostsUser)

export const post = router
