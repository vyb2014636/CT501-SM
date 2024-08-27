const { MailtrapClient } = require('mailtrap')
const { env } = require('./environment')

const TOKEN = env.MAILTRAP_TOKEN
const ENDPOINT = env.MAILTRAP_ENDPOINT

export const mailtrapClient = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN })

export const sender = {
  email: 'mailtrap@demomailtrap.com',
  name: 'VMEDIA'
}
const recipients = [
  {
    email: 'vyvn1003@gmail.com'
  }
]
