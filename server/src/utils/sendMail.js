import nodemailer from 'nodemailer'
import { env } from '~/config/environment'

export const sendMail = async ({ email, html, subject }) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
      user: env.NODEMAILER_NAME,
      pass: env.NODEMAILER_PASSWORD
    }
  })
  let info = await transporter.sendMail({
    from: '"VMEDIA-CT501" <no-reply@CT501.email>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: html // html body
  })
  return info
}
