import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'

const generateAccessToken = (user) =>
  jwt.sign({ id: user._id, isAdmin: user.isAdmin }, env.JWT_SECRET, { expiresIn: '24h' })

const generateRefreshToken = (user) =>
  jwt.sign({ id: user._id, isAdmin: user.isAdmin }, env.JWT_SECRET, { expiresIn: '7d' })
export { generateAccessToken, generateRefreshToken }
