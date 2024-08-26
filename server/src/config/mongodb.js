import mongoose from 'mongoose'
import { env } from './environment'

const dbconnect = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI)
    console.log(env.MONGODB_URI)
    if (conn.connection.readyState === 1) console.log('Connection to database successfully')
    else console.log('Connection failed')
  } catch (error) {
    console.log('Connect failed')
    throw new Error(error)
  }
}

export default dbconnect
