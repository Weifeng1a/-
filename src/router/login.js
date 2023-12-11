//登录路由
const express = require('express')

const loginRouter = express.Router()

const {login} = require('../router_handler/login_handler')

loginRouter.post('/login', async (req,res)=>{
    console.log(req.body);
    const msgObj =await login(req.body.username,req.body.password)
    res.json(msgObj)
})


module.exports = loginRouter
