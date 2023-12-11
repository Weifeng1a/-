const express = require('express')

const helpRouter = express.Router()

const { pairing,
        unbind, 
        changeBinding,
        getPovertyAndHelper, 
        getMyPovertyList,
        deleteHelpLogs,
        modifyHelpLogs,
        addHelpLogs,
        getHelpLogs,
        deleteHelpEffect,
        modifyHelpEffect,
        addHelpEffect,
        getHelpEffect,
        gethistoryLogs,
        getHistoryEffect} = require('../router_handler/help_handler')


//pairing
helpRouter.post('/help/pairing',async (req,res)=>{
    const msgObj = await pairing(req.body) 
    res.json(msgObj)
})

//unbind
helpRouter.post('/help/unbind',async (req,res)=>{
    try{
        await unbind(req.body)
     res.json({
        code:200,
        msg:'解绑成功'
     })
    }catch(err){
        res.json({
            code:0,
            msg:'解绑失败！'
         })
    }
     
})

//changeBinding
helpRouter.post('/help/changeBind',async (req,res)=>{
    try{
        await changeBinding(req.body)
     res.json({
        code:200,
        msg:'换绑成功'
     })
    }catch(err){
        res.json({
            code:0,
            msg:'换绑失败！'
         })
    }
})
//getPovertyAndHelper
helpRouter.get('/help/povertyAndhelper',async (req,res)=>{
    const {helperList,povertyList} = await getPovertyAndHelper()
    res.json({
        code:200,
        msg:'获取成功！',
        data:{
            helperList,
            povertyList
        }
    })
})
//getMyPovertyList
helpRouter.get('/help/pairList/:id',async (req,res)=>{
    try{
        const pairingList = await getMyPovertyList(req.params.id)
        res.json({
         code:200,
         msg:'结对列表获取成功！',
         data:pairingList
        })
     }catch(err){
         res.json({
             code:0,
             msg:'结对列表获取失败！'
         })
     }
})

//deleteHelpLogs
helpRouter.post('/help/deletelog',async (req,res)=>{
    try{
        await deleteHelpLogs(req.body.id)
        res.json({
            code:200,
            msg:'日志删除成功！'
        })
    }catch(err){
        res.json({
            code:0,
            msg:'日志删除失败！'
        })
    }
})
//modifyHelpLogs
helpRouter.post('/help/modifylog',async (req,res)=>{
    try{
        await modifyHelpLogs(req.body.id,req.body.data)
        res.json({
            code:200,
            msg:'日志修改成功！'
        })
    }catch(err){
        res.json({
            code:0,
            msg:'日志修改失败！'
        })
    }
})

//addHelpLogs
helpRouter.post('/help/addlog',async (req,res)=>{
     const msgObj = await addHelpLogs(req.body)
     res.json(msgObj)
})

//getHelpLogs
helpRouter.get('/help/helplogs/:id',async (req,res)=>{
    try{
       const {helpLogList,count,totalPages} = await getHelpLogs(req.params.id,req.body)
       res.json({
        code:200,
        msg:'日志获取成功！',
        data:{helpLogList,count,totalPages}
       })
    }catch(err){
        res.json({
            code:0,
            msg:'日志获取失败！'
        })
    }
})

//getHelpEffect
helpRouter.get('/help/helpEffect/:id',async (req,res)=>{
    try{
        const {helpEffectList,count,totalPages} = await getHelpEffect(req.params.id,req.body)
        res.json({
         code:200,
         msg:'成效获取成功！',
         data:{helpEffectList,count,totalPages}
        })
     }catch(err){
         res.json({
             code:0,
             msg:'成效获取失败！'
         })
     }
})

//addHelpEffect
helpRouter.post('/help/addEffect',async (req,res)=>{
    const msgObj = await addHelpEffect(req.body)
    res.json(msgObj)
})
//deleteHelpEffect
helpRouter.post('/help/deleteEffect',async (req,res)=>{
    try{
        await deleteHelpEffect(req.body.id)
        res.json({
            code:200,
            msg:'成效删除成功！'
        })
    }catch(err){
        res.json({
            code:0,
            msg:'成效删除失败！'
        })
    }
})

//modifyHelpEffect
helpRouter.post('/help/modifyEffect',async (req,res)=>{
    try{
        await modifyHelpEffect(req.body.id,req.body.data)
        res.json({
            code:200,
            msg:'成效修改成功！'
        })
    }catch(err){
        res.json({
            code:0,
            msg:'成效修改失败！'
        })
    }
})

helpRouter.get('/history/log',async (req,res)=>{
    const {list,count,totalPages} = await gethistoryLogs(req.body)
    res.json({
        code:200,
        msg:'获取成功！',
        data:{list,count,totalPages}
    })
})

helpRouter.get('/history/effect',async (req,res)=>{
    const {list,count,totalPages} = await getHistoryEffect(req.body)
    res.json({
        code:200,
        msg:'获取成功！',
        data:{list,count,totalPages}
    })
})
module.exports = helpRouter