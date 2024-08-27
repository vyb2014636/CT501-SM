import 'dotenv/config'

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_NAME: process.env.DATABASE_NAME,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  BUILD_MODE: process.env.BUILD_MODE,
  MAILTRAP_TOKEN: process.env.MAILTRAP_TOKEN,
  MAILTRAP_ENDPOINT: process.env.MAILTRAP_ENDPOINT,
  NODEMAILER_NAME: process.env.NODEMAILER_NAME,
  NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
  AUTHOR: process.env.AUTHOR
}
