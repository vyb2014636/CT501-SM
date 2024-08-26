import express from 'express'

const router = express.Router()

router
  .get('/profile', (req, res) => {
    return res.status(200).json({
      message: 'login'
    })
  })
  .get('/favorites', (req, res) => {
    return res.status(200).json({
      message: 'signup'
    })
  })

export const user = router
