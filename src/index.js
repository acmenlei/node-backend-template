const express = require('express')
const app = express();
const studentRouter = require('./routes/student');
const cookieConfig = require('./authentication/cookie-session');
const cors = require('cors')

app.use(cookieConfig) // 配置cookie

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/student', studentRouter) // 配置路由

app.use(cors()) // 跨域

app.listen(3000)