const {initModels} = require('../model/init-models')
const {poverty,member} = initModels()
const {getFormatTime} = require('../utils/time')

//获取贫困户列表
const getPovertyList = async () =>{
    const result = await poverty.findAll()
    console.log(result);
    return result
}

//添加贫困户
const addPoverty = async (values)=>{
    /* const {id,poverty_name,poverty_sex,poverty_age,birth,card,poverty_address,reason,phone,capacity,level,poverty_income,bank} = values */
    const {name:poverty_name} = values
    const msgObj = {
        code:0,
        msg:'成功创建档案！'
    }

    const num = await poverty.count({
        where:{
            name:poverty_name
        }
    })
    
    if(num === 0){
        const result = await poverty.findOne({
            order:[['poverty_id','DESC']]
        })
        const str = values.date_of_birth
        values.date_of_birth = getFormatTime(str)
        /* poverty.create({
            poverty_id:result == null ? 1 : result.dataValues.village_id + 1,
            village_id:id,
            name:poverty_name,
            sex:poverty_sex,
            age:poverty_age,
            date_of_birth:birth,
            card_id:card,
            address:poverty_address,
            poverty_reason:reason,
            phone_num:phone,
            labor_capacity:capacity,
            poverty_level:level,
            income:poverty_income,
            bank_account:bank,
            add_time:getFormatTime(),
            update_time:getFormatTime(),
            is_poverty:0,
            is_pair:0,
        }).then(result=>{
            msgObj.code = 200
            console.log('插入成功',result);
        }).catch(err=>{
            msgObj.msg='创建档案失败！'
            console.log('插入失败',err);
        }) */
        try{
            await poverty.create({
            poverty_id:result == null ? 1 : result.dataValues.poverty_id + 1,
            ...values,
            add_time:getFormatTime(),
            update_time:getFormatTime(),
            is_poverty:0,
            is_pair:0,
        })  
            msgObj.code = 200
            console.log('插入成功',result);
        }catch(err){
            msgObj.msg='创建档案失败！'
            console.log('插入失败',err);
        }
    }
    else{
        msgObj.msg='贫困户档案已经存在！'
    }

    return msgObj
}

//通过编号修改贫困户
const modifyPovertyById = async (id,values)=>{
    if(values.date_of_birth){
        const str = values.date_of_birth
        values.date_of_birth = getFormatTime(str)
    }
    await poverty.update({
        ...values,
        update_time:getFormatTime()
    },{
        where:{
            poverty_id:id
        }
    })
}

//通过编号删除贫困户
const deletePovertyById = async (id)=>{
    await poverty.destory({
        where:{
            poverty_id:id
        }
    })
}


//添加家庭成员
const addFamilyMember = async (values)=>{
    const msgObj = {
        code:0,
        msg:'成功添加家庭成员！'
    }
    const num = await member.count({
        where:{
            name:values.name,
            poverty_id:values.poverty_id
        }
    })

    if(num === 0){
        const result = await member.findOne({
            order:[['member_id','DESC']]
        })
        try{
         await member.create({ 
            ...values,
            member_id:result == null ? 1 : result.dataValues.member_id + 1
         })
          msgObj.code = 200
          console.log('插入成功',result);
        }catch(err){
          msgObj.msg='添加家庭成员失败！'
          console.log('插入失败',err);
        }
    }else{
        msgObj.msg='该家庭成员已经存在！'
    }

    return msgObj
}

//删除
const deleteFamilyMemberById = async (id)=>{
    await member.destory({
        where:{
            member_id:id
        }
    })
}
//修改
const modifyFamilyMemberById = async (id,value)=>{
   await member.update({
      ...value
   },{
    where:{
        member_id:id
    }
   })
}
//获取
const getMemberList = async (id)=>{
    const result = await member.findAll({
        where:{
            poverty_id:id
        }
    })
    return result
}

module.exports={
    getPovertyList,
    addPoverty,
    modifyPovertyById,
    deletePovertyById,
    addFamilyMember,
    deleteFamilyMemberById,
    modifyFamilyMemberById,
    getMemberList
}
