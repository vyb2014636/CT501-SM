import express from 'express'
import { auth } from './auth'
import { post } from './post'
import { user } from './user'
import { requestFriend } from './requestFriend'

const router = express.Router()

router.use('/auth', auth)
router.use('/post', post)
router.use('/user', user)
router.use('/requestFriend', requestFriend)

export const APIs_V1 = router
