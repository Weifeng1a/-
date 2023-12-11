//贫困户路由
const express = require('express')

const povertyRouter = express.Router()
const {addPoverty,getPovertyList,modifyPovertyById,deletePovertyById,
       addFamilyMember,deleteFamilyMemberById,modifyFamilyMemberById,getMemberList} = require('../router_handler/poverty_handler')

//获取贫困户列表
povertyRouter.get('/poverty/list',async (req,res)=>{
     const list = await getPovertyList()
     res.json({
        code:200,
        msg:'成功获取列表',
        data:list
     })
})


//添加贫困户
povertyRouter.post('/poverty/add',async (req,res)=>{
    const msgObj = await addPoverty(req.body)
    res.json(msgObj)
})


//修改贫困户信息
povertyRouter.post('/poverty/modify',async (req,res)=>{
    await modifyPovertyById(req.body.id,req.body.data)
    res.json({
        code:200,
        msg:'信息修改成功！'
    })
})

//删除贫困户信息
povertyRouter.post('/poverty/delete',async (req,res)=>{
    await deletePovertyById(req.body.id) 
    res.json({
        code:200,
        msg:'贫困户删除成功！'
    })
})

povertyRouter.post('/family/add',async (req,res)=>{
    const msgObj = await addFamilyMember(req.body)
    res.json(msgObj)
})

povertyRouter.post('/family/delete',async (req,res)=>{
    await deleteFamilyMemberById(req.body.id)
    res.json({
        code:200,
        msg:'家庭成员删除成功！'
    })
})

povertyRouter.post('/family/modify',async (req,res)=>{
    await modifyFamilyMemberById(req.body.id,req.body.data)
    res.json({
        code:200,
        msg:'家庭成员信息修改成功！'
    })
})

povertyRouter.get('/family/list',async (req,res)=>{
    const list = await getMemberList(req.body.id)
    res.json({
        code:200,
        msg:'成功获取列表',
        data:list
     })
})
module.exports = povertyRouter