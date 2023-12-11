const {initModels} = require('../model/init-models')
const {village} = initModels()
const {getFormatTime} = require('../utils/time')

//获取村落列表
const getVillageList = async ()=>{
   const list = await village.findAll({
    where:{
        is_delete:0
    }
   })
   return list
}

//添加村落
const addVillage = async (values)=>{
    const {_name,_num,_size,reason} = values
    const msgObj = {
        code:0,
        msg:'成功添加！'
    }

    const num = await village.count({
        where:{
            village_name:_name
        }
    })
    
    if(num === 0){
        const result = await village.findOne({
            order:[['village_id','DESC']]
        })
        console.log(result);
        village.create({
            village_id:result == null? 1 : result.dataValues.village_id +  1,
            village_name:_name,
            household_num:_num,
            size:_size,
            poverty_reason:reason,
            add_time:getFormatTime(),
            update_time:getFormatTime(),
            is_delete:0
        }).then(result=>{
            msgObj.code = 200
            console.log('插入成功',result);
        }).catch(err=>{
            msgObj.msg='创建村落失败！'
            console.log('插入失败',err);
        })
    }
    else{
        msgObj.msg='村落已经存在！'
    }

    return msgObj
}


//通过编号删除用户
const deleteVillageById = async (id)=>{
    await village.update({
         is_delete:1
    },{
        where:{
            village_id:id
        }
    })
}

//通过编号修改村落信息
const modifyVillageById = async (id,values)=>{
    await village.update({
        ...values,
        update_time:getFormatTime()
    },{
        where:{
            village_id:id
        }
    })
}

module.exports={
    getVillageList,
    addVillage,
    deleteVillageById,
    modifyVillageById
}