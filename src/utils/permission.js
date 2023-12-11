const {initModels} = require('../model/init-models')
const {role} = initModels()


const getPermission= async (id)=>{
    const result = await role.findOne({
        where:{
            user_id:id
        }
    })
    return result.dataValues.permission
}

module.exports={
    getPermission
}