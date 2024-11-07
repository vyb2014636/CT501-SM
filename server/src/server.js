import express from 'express'
import { errorHandle } from '~/middlewares/errorHandle'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { APIs_V1 } from '~/routes/v1'
import { env } from './config/environment'
import dbconnect from './config/mongodb'
import { initSocket } from './sockets'
import './scripts/unlockReportsCronJob.js'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

dbconnect()

const server = app.listen(env.APP_PORT, env.APP_HOST, () => {
  console.log(`Hello Thanh Vy, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
})

initSocket(server)

app.use('/v1', APIs_V1)
app.use(errorHandle)
