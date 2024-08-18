import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

const hostname = 'localhost'
const port = 8017

app.use(express.json()) // server sẽ đọc được data json mà client gửi lên
app.use(cookieParser())
app.use(express.urlencoded({ extended: true })) // server sẽ đọc được data dạng mảng và object và convert về json mà client gửi lên

app.listen(port, hostname, () => {
  console.log('Server is running on the port:  ' + port)
})
