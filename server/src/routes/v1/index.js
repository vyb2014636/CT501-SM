import express from 'express'
import { auth } from './auth'
import { post } from './post'
import { user } from './user'
import { request } from './request'
import { address } from './address'
import { notification } from './notification'
import { chat } from './chat'
import { report } from './report'
import { warning } from './warning'
import { statistic } from './statistic'

const router = express.Router()

router.use('/auth', auth)
router.use('/post', post)
router.use('/user', user)
router.use('/requestFriend', request)
router.use('/address', address)
router.use('/notification', notification)
router.use('/chat', chat)
router.use('/report', report)
router.use('/warning', warning)
router.use('/statistic', statistic)

export const APIs_V1 = router
