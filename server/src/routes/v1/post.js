import express from 'express'
import { postController } from '~/controllers/postController'
import verifyToken from '~/middlewares/verifyToken'

const router = express.Router()

router.route('/').get(verifyToken, postController.getPosts).post(verifyToken, postController.createPost)

export const post = router
