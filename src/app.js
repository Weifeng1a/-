const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {verifyToken} = require('./utils/authorization')
const app = express()
//配置cors中间件，实现跨域
app.use(cors())
app.use(express.json())
//配置解析表单数据的中间件
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('../public'))
//路由
const loginRouter = require('./router/login')
const userRouter = require('./router/user')
const avatarRouter = require('./router/avatar')
const villageRouter = require('./router/village')
const newsRouter = require('./router/news')
const povertyRouter = require('./router/poverty')
const helpRouter = require('./router/help')
const projectRouter = require('./router/project')
const statisticsRouter = require('./router/statistics')
app.use('/api',loginRouter)
app.use('/api',statisticsRouter)
app.use('/api/*',verifyToken)

app.use('/api',userRouter)
app.use('/api',avatarRouter)
app.use('/api',villageRouter)
app.use('/api',newsRouter)
app.use('/api',povertyRouter)
app.use('/api',helpRouter)
app.use('/api',projectRouter)


app.listen(80,()=>{
    console.log('server open in http://127.0.0.1');
})