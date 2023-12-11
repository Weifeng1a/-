const express = require('express')
const statisticsRouter = express.Router()
const {getLocation} = require('../router_handler/statistics_handler')
statisticsRouter.get('/location',async (req,res)=>{
     const {geoCoordMap,data} = await getLocation()
     res.json({
        code:200,
        msg:'数据获取成功！',
        data:{
            geoCoordMap,
            data
        }
     })
})


module.exports = statisticsRouter