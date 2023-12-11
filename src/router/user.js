const express = require('express')

const userRouter = express.Router()
const {getUserList,addUser,deleteUserById,modifyUserById} = require('../router_handler/user_handler')

//获取用户列表
userRouter.get('/user/list',async (req,res)=>{
    try{
        const users = await getUserList()
        res.json({
            code:200,
            msg:'用户列表获取成功！',
            data:users
        })
    }catch(err){
        res.json({
            code:0,
            msg:'用户列表获取失败！',
            err
        })
    }
    
})

//通过用户编号删除
userRouter.post('/user/deleteUser',async (req,res)=>{
     try{
        console.log(req.body.id);
        const result = await deleteUserById(req.body.id)
        res.json({
            code:200,
            msg:'用户删除成功！'
        })
     }catch(err){
        res.json({
            code:0,
            msg:'用户删除失败！',
            err
        })
     }
})

//添加用户
userRouter.post('/user/addUser',async (req,res)=>{
    const result = await addUser(req.body)
    res.json(result)
})

//通过编号修改用户信息
userRouter.post('/user/modifyUser',async (req,res)=>{
   try{
      const result = await modifyUserById(req.body.id,req.body.data)
      res.json({
        code:200,
        msg:'信息修改成功！'
    })
   }catch(err){
    res.json({
        code:0,
        msg:'用户信息修改失败！',
        err
    })
   }
})

module.exports = userRouter 