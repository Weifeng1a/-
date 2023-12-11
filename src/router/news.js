//新闻路由
const express = require('express')
const multer = require('multer')
const newsRouter = express.Router()
const {addNews,getNewsList,deleteNewsById,modifyNewsById} =require('../router_handler/news_handler')
const storage = multer.diskStorage({
    //保存路径
    destination: function (req, file, cb) {
      cb(null, '/毕设/poverty_alleviation_api_server/public/picture')
    },  
    //保存在 destination 中的文件名

    filename: function (req, file, cb) {    
      let type = file.originalname.replace(/.+\./,".")
      cb(null, file.fieldname + '-' + Date.now()+type)
    }
})
const upload = multer({ storage: storage })


newsRouter.get('/news/list',async (req,res)=>{
    const list = await getNewsList()
    res.json({
      code:200,
      msg:'新闻列表获取成功！',
      data:list
    }) 
})


newsRouter.post('/news/add',upload.single('picture'),async (req,res,next)=>{
    let name = req.file.filename
    let imgUrl = 'picture/'+ name
    console.log(req.body);
    const msgObj = await addNews(req.body,imgUrl)
    res.json(msgObj)
})

newsRouter.post('/news/delete',async (req,res)=>{
   await deleteNewsById(req.body.id)
   res.json({
    code:200,
    msg:'新闻删除成功！'
   })
})

newsRouter.post('/news/modify',async (req,res)=>{
    await modifyNewsById(req.body.id,req.body.data)
    res.json({
      code:200,
      msg:'新闻修改成功！'
    })
})

module.exports = newsRouter