const express = require('express')
const multer = require('multer')
const avatarRouter = express.Router()
const {modifyAvatar} = require('../router_handler/user_handler')

const storage = multer.diskStorage({
    //保存路径
    destination: function (req, file, cb) {
      cb(null, '/毕设/poverty_alleviation_api_server/public/avatar')
    
    },  
    //保存在 destination 中的文件名

    filename: function (req, file, cb) {    
      let type = file.originalname.replace(/.+\./,".")
      cb(null, file.fieldname + '-' + Date.now()+type)
    }
  })
  const upload = multer({ storage: storage })
  
  avatarRouter.post('/profile', upload.single('avatar'),async function (req, res, next) {
    // req.file 是 `avatar` 文件的信息
    // req.body 将具有文本域数据，如果存在的话
    let name = req.file.filename
    let imgUrl = 'avatar/'+ name
    await modifyAvatar(req.body.id,imgUrl)
    console.log(req.body);
    res.json({
       code:200,
       msg:'头像上传成功！'
    })
})

  module.exports = avatarRouter