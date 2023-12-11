const {initModels} = require('../model/init-models')
const {user,role} = initModels()


//获取用户列表
const getUserList = async ()=>{
    const allUsers =await user.findAll({
        where:{
            is_delete:0
        }
    })
    return allUsers
}

//注册用户
const addUser = async (values)=>{
    
    const {user_name,user_account,user_password,user_tel,user_card,user_permission} = values
    const msgObj = {
        code:0,
        msg:'成功创建用户！'
    }

    const num = await user.count({
        where:{
            account:user_account
        }
    })
    
    if(num === 0){
        const result = await user.findOne({
            order:[['user_id','DESC']]
        })
        user.create({
            user_id:result == null ? 1 : result.dataValues.user_id + 1,
            name:user_name,
            account:user_account,
            password:user_password,
            tel:user_tel,
            card:user_card,
            is_delete:0
        }).then(result=>{
            role.create({
                user_id:result.dataValues.user_id,
                permission:user_permission
            }).then(result=>{
                console.log(result);
            })
            msgObj.code = 200
            console.log('插入成功',result);
        }).catch(err=>{
            msgObj.msg='创建用户失败！'
            console.log('插入失败',err);
        })
    }
    else{
        msgObj.msg='账号已经存在！'
    }

    return msgObj

}


//通过编号删除用户
const deleteUserById = async (id)=>{
    await user.update({
        is_delete:1
     },{
        where:{
            user_id:id
        }
     })

    await role.destroy({
        where:{
            user_id:id
        }
    })
}

//通过编号修改用户信息
const modifyUserById = async (id,values)=>{
    await user.update(values,{
        where:{
            user_id:id
        }
    })
}

//更新头像
const modifyAvatar = async(id,imgUrl)=>{
    await user.update({
        avatar:imgUrl
    },{
        where:{
            user_id:id
        }
    })
}

module.exports = {
    addUser,
    getUserList,
    deleteUserById,
    modifyUserById,
    modifyAvatar
}