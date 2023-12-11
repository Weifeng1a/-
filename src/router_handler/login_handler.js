//登录路由的处理函数

const {initModels} = require('../model/init-models')
const {user,role} = initModels()
const {generateToken} = require('../utils/authorization')

//登录业务,登录成功返回token和该用户的信息
const login =async (user_account,user_password)=>{
   const msgObj = {
      code:0,
      msg:'登录成功！',
      data:{
         userInfo:null,
         permission:-1
      }
   }
  const result=await user.findOne({
     where:{
        account:user_account
     }
   })
   if(result == null || result.dataValues.is_delete === 1){
     msgObj.msg = '登录失败，账号错误！'
   }else{
    if(result.dataValues.password !== user_password){
        msgObj.msg = '登录失败，密码错误！'
    }else{
        const token = generateToken({account:user_account})
        msgObj.code = 200
        msgObj.token = token
        msgObj.data.userInfo = result.dataValues
        const {dataValues:{permission}} = await role.findOne({
         where:{
            user_id:result.dataValues.user_id
         }
        })
        msgObj.data.permission = permission
    }
   }
   return msgObj
}


module.exports={
    login
}