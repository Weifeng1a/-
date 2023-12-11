const express = require('express')

const villageRouter = express.Router()
const {getVillageList,addVillage,modifyVillageById,deleteVillageById} = require('../router_handler/village_handler')



villageRouter.get('/village/list',async (req,res)=>{
     const list = await getVillageList()
     res.json({
        code:200,
        msg:'村落列表获取成功！',
        data:list
     })
})


villageRouter.post('/village/add',async (req,res)=>{
    const result = await addVillage(req.body)
    res.json(result)
})

villageRouter.post('/village/delete',async (req,res)=>{
    await deleteVillageById(req.body.id)
    res.json({
        code:200,
        msg:"村落删除成功！"
    })
})

villageRouter.post('/village/modify',async (req,res)=>{
    await modifyVillageById(req.body.id,req.body.data)
    res.json({
        code:200,
        msg:"村落信息修改成功！"
    })
})
module.exports = villageRouter