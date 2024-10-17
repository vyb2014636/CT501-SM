import express from 'express'
import { auth } from './auth'
import { post } from './post'
import { user } from './user'
import { requestFriend } from './requestFriend'
import { address } from './address'
import { notification } from './notification'
import { chat } from './chat'

const router = express.Router()

router.use('/auth', auth)
router.use('/post', post)
router.use('/user', user)
router.use('/requestFriend', requestFriend)
router.use('/address', address)
router.use('/notification', notification)
router.use('/chat', chat)

export const APIs_V1 = router
