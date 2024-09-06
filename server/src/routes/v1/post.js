import express from 'express'
import { postController } from '~/controllers/postController'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router.route('/').get(verifyToken, postController.getAllPosts).post(verifyToken, postController.createPost)
router.get('/profile', verifyToken, postController.getPostsUser)

export const post = router
