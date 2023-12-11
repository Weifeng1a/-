const {initModels} = require('../model/init-models')
const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const {pair,user,poverty,help_log,history_log,help_effect,history_effect} = initModels()
const {getFormatTime} = require('../utils/time')
const {getPermission} = require('../utils/permission')

//高级用户功能
//帮扶结对
const pairing = async (values)=>{
    const msgObj = {
        code:0,
        msg:'结对成功！'
    }
    try{
        const result = await pair.findOne({
            order:[['pairing_id','DESC']]
        })
        await pair.create({
            pairing_id:result == null ? 1 : result.dataValues.pairing_id + 1,
            ...values,
            start_time:getFormatTime(),
        })
        await poverty.update({
            is_pair:1
        },{
            where:{
                poverty_id:values.poverty_id
            }
        })
        msgObj.code = 200
        console.log('插入成功',result);
    }catch(err){
        msgObj.msg='结对失败！'
        console.log('插入失败',err);
    }
   return msgObj
}

//获取满足配对条件的贫困户和帮扶责任人
const getPovertyAndHelper =async ()=>{
    const result = await pair.findAll({
        attributes: ['responsible_person_id'],
        group: ['responsible_person_id'],
        having: Sequelize.literal('COUNT(*) < 5')
    })
    const searchList = result.map(item=>{
        return item.dataValues.responsible_person_id
    })
    console.log(searchList);
    const helperList = []
    for(let i = 0;i<searchList.length;i++){
        const permission = await getPermission(searchList[i])
        if(permission != 0) continue
        const result = await user.findOne({
            where:{
               user_id:searchList[i]
            }
        })
        helperList.push(result.dataValues)
    }
    console.log(helperList);

    const list = await poverty.findAll({
        where:{
            is_pair:0
        }
    })
    const povertyList = list.map(item=>item.dataValues)
    console.log('--------------');
    console.log(povertyList);
    return {
        helperList,
        povertyList
    }
}
/* getPovertyAndHelper() */
//解绑  参数responsible_person_id，poverty_id  
const unbind =async (value)=>{
    const result =await pair.findOne({
        where:{
            responsible_person_id:value.responsible_person_id,
            poverty_id:value.poverty_id
        }
    })
    
    const userResult = await user.findOne({
        where:{
            user_id:value.responsible_person_id
        }
    })
    const povertyResult = await poverty.findOne({
        where:{
            poverty_id:value.poverty_id
        }
    })
    const logList = await help_log.findAll({
        where:{
            pair_id:result.dataValues.pairing_id
        }
    })
    
    if(logList != null){
        const logValue = logList.map(item=>{
            const {content,demand,solve} = item.dataValues
            return {content,demand,solve}
        })
        let idNum = await history_log.findOne({
             order:[['id','DESC']]
        })
        idNum = idNum == null ? 1 : idNum.dataValues.id + 1 
        logValue.forEach((item,index)=>{
            item.id = idNum + index,
            item.user_name=userResult.dataValues.name
            item.poverty_name=povertyResult.dataValues.name
        })
        await history_log.bulkCreate(logValue)
    }   
    

    const effectList = await help_effect.findAll({
        where:{
            pair_id:result.dataValues.pairing_id
        }
    })
    if(effectList != null){
        let num = await history_effect.findOne({
             order:[['id','DESC']]
        })
        num = num == null ? 1 : num.dataValues.id + 1 
        const effectValue = effectList.map((item,index)=>{
            const {measure,start_time,end_time,effect} = item.dataValues
            return {
                id:num + index,
                user_name:userResult.dataValues.name,
                poverty_name:povertyResult.dataValues.name,
                measure,start_time,end_time,effect
            }
        })
        await history_effect.bulkCreate(effectValue)
    }
    
  /*   for(let i = 0;i<logValue.length;i++){
        await history_log.create({
            id:idNum + i,
            user_name:userResult.dataValues.name,
            poverty_name:povertyResult.dataValues.name,
            ...logValue[i]
        })
    } */
    await help_log.destroy({
        where:{
            pair_id:result.dataValues.pairing_id
        }
    })
    await help_effect.destroy({
        where:{
            pair_id:result.dataValues.pairing_id
        }
    })
    await pair.destroy({
        where:{
            pairing_id:result.dataValues.pairing_id
        }
    })

    await poverty.update({
        is_pair:0
    },{
        where:{
            poverty_id:value.poverty_id
        }
    })
}
/* unbind({responsible_person_id:2,poverty_id:1}) */

//换绑 参数poverty_id和新responsible_person_id  //todo  删除相关效益，添加相关历史
const changeBinding = async (value)=>{
    const result =await pair.findOne({
        where:{
            poverty_id:value.poverty_id
        }
    })
    
    const userResult = await user.findOne({
        where:{
            user_id:result.dataValues.responsible_person_id
        }
    })
    const povertyResult = await poverty.findOne({
        where:{
            poverty_id:value.poverty_id
        }
    })
    const logList = await help_log.findAll({
        where:{
            pair_id:result.dataValues.pairing_id
        }
    })
    if(logList != null){
        const logValue = logList.map(item=>{
            const {content,demand,solve} = item.dataValues
            return {content,demand,solve}
        })
        let idNum = await history_log.findOne({
             order:[['id','DESC']]
        })
        idNum = idNum == null ? 1 : idNum.dataValues.id + 1 
        logValue.forEach((item,index)=>{
            item.id = idNum + index,
            item.user_name=userResult.dataValues.name
            item.poverty_name=povertyResult.dataValues.name
        })
        await history_log.bulkCreate(logValue)
    }   
    const effectList = await help_effect.findAll({
        where:{
            pair_id:result.dataValues.pairing_id
        }
    })
    if(effectList != null){
        let num = await history_effect.findOne({
             order:[['id','DESC']]
        })
        num = num == null ? 1 : num.dataValues.id + 1 
        const effectValue = effectList.map((item,index)=>{
            const {measure,start_time,end_time,effect} = item.dataValues
            return {
                id:num + index,
                user_name:userResult.dataValues.name,
                poverty_name:povertyResult.dataValues.name,
                measure,start_time,end_time,effect
            }
        })
        await history_effect.bulkCreate(effectValue)
    }
    await help_log.destroy({
        where:{
            pair_id:result.dataValues.pairing_id
        }
    })
    await help_effect.destroy({
        where:{
            pair_id:result.dataValues.pairing_id
        }
    })
    await pair.update({
        responsible_person_id:value.responsible_person_id,
        start_time:getFormatTime()
    },{
        where:{
            poverty_id:value.poverty_id
        }
    })
}
/* changeBinding({poverty_id:3,responsible_person_id:2}) */
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
//普通用户功能
//获取帮扶日志列表(所有或我的) 普通用户获取我的  value分页获取
const getHelpLogs = async (id,value)=>{
    const permission = await getPermission(id)
    console.log(permission);
    let result = null
    if(permission == 0){
        result = await pair.findAndCountAll({
            limit:value.limit,
            offset:(value.page - 1) * value.limit,
            where:{
                responsible_person_id:id
            }
        })
    }else{
        result = await pair.findAndCountAll({
            limit:value.limit,
            offset:(value.page - 1) * value.limit,
        })
    }
    const count = result.count
    const totalPages = Math.ceil(count / value.limit)
    console.log(result.rows);
    const searchList =  result.rows.map(item=>{
       const {pairing_id,poverty_id,responsible_person_id} = item.dataValues
       return {pairing_id,poverty_id,responsible_person_id}
    })
    console.log(searchList);
    const helpLogList = []
    for(let i = 0;i<searchList.length;i++){
        
        const result = await help_log.findAll({
            where:{
                pair_id:searchList[i].pairing_id
            }
        })
        const povertyResult = await poverty.findOne({
            where:{
                poverty_id:searchList[i].poverty_id
            },
        })
        let userResult = null
        let userName = ''
        if(permission != 0){
            userResult = await user.findOne({
                where:{
                    user_id:searchList[i].responsible_person_id
                }
            })
            userName = userResult.dataValues.name
        }
        const povertyName = povertyResult.dataValues.name
        result.forEach(item=>{
            const {content,demand,solve,help_log_id} = item.dataValues
            if(permission == 0){
                helpLogList.push({help_log_id,povertyName,content,demand,solve})
            }else{
                helpLogList.push({help_log_id,userName,povertyName,content,demand,solve})
            } 
        })
    }
    console.log(helpLogList);
    return {
        helpLogList,
        count,
        totalPages
    }
}
/* getHelpLogs(2) */
//获取扶贫对象列表（所有或我的）普通用户获取我的
const getMyPovertyList = async (id)=>{
   const permission = await getPermission(id)
   let result = null
   if(permission == 0){
    result =await pair.findAll({
      where:{
        responsible_person_id:id
      },
    })
   }else{
    result = await pair.findAll()
   }
   const pairingList = []
   const searchList = result.map(item=>{
      const {poverty_id,responsible_person_id} = item.dataValues
      return {poverty_id,responsible_person_id}
   })

   for(let i = 0;i < searchList.length;i++){
      const currentPoverty = await poverty.findOne({
        where:{
            poverty_id:searchList[i].poverty_id
        }
      })
      let currentUser = null
      let userName = ''
      if(permission != 0){
        currentUser = await user.findOne({
            where:{
                user_id:searchList[i].responsible_person_id
            }
        })
        userName = currentUser.dataValues.name
      }
      if(permission == 0){
        pairingList.push(currentPoverty.dataValues)
      }else{
         pairingList.push({
            user_id:searchList[i].responsible_person_id,
            userName,
            poverty:currentPoverty.dataValues
         })
      }
   }
 /*   const list = await poverty.findAll({
      where:{
        poverty_id:{
            [Op.in]:searchList
        }
      }
   })
   return list.map(item=>item.dataValues) */
   console.log(pairingList);
   return pairingList
}
/* getMyPovertyList(2) */

//编写帮扶日志
const addHelpLogs = async (value)=>{
    const msgObj = {
        code:0,
        msg:'日志提交成功！'
    }
    try{
        const {content,demand,solve} = value
        const currentPair = await pair.findOne({
            where:{
                responsible_person_id:value.responsible_person_id,
                poverty_id:value.poverty_id
            }
        })
        const result = await help_log.findOne({
            order:[['help_log_id','DESC']]
        })
        await help_log.create({
            pair_id:currentPair.dataValues.pairing_id,
            content,
            demand,
            solve,
            help_log_id:result == null ? 1 : result.dataValues.help_log_id + 1
        })
        msgObj.code = 200
        console.log('插入成功',result);
    }catch(err){
        msgObj.msg='日志提交失败！'
        console.log('插入失败',err);
    }
    return msgObj
}
/* addHelpLogs({responsible_person_id:2,poverty_id:1,content:'fuck',demand:'fuck',solve:'fuck'}) */
//修改帮扶日志
const modifyHelpLogs = async (id,value)=>{
   await help_log.update({
       ...value
   },{
    where:{
        help_log_id:id
    }
   })
}
/* modifyHelpLogs(1,{content:'thanks'}) */
const deleteHelpLogs = async (id)=>{
    await help_log.destroy({
        where:{
            help_log_id:id
        }
    })
}
/* deleteHelpLogs(1) */
/* addHelpLogs({responsible_person_id:2,poverty_id:4,content:'114514',demand:'555555',solve:'6666666'}) */



//普通用户功能
//获取帮扶成效列表(所有或我的) 普通用户获取我的
const getHelpEffect = async (id,value)=>{
    const permission = await getPermission(id)
    console.log(permission);
    let result = null
    if(permission == 0){
        result = await pair.findAndCountAll({
            limit:value.limit,
            offset:(value.page - 1) * value.limit,
            where:{
                responsible_person_id:id
            }
        })
    }else{
        result = await pair.findAndCountAll({
            limit:value.limit,
            offset:(value.page - 1) * value.limit,
        })
    }
    const count = result.count
    const totalPages = Math.ceil(count / value.limit)
    console.log(result.rows);
    const searchList =  result.rows.map(item=>{
       const {pairing_id,poverty_id,responsible_person_id} = item.dataValues
       return {pairing_id,poverty_id,responsible_person_id}
    })
    console.log(searchList);
    const helpEffectList = []
    for(let i = 0;i<searchList.length;i++){
        
        const result = await help_effect.findAll({
            where:{
                pair_id:searchList[i].pairing_id
            }
        })
        const povertyResult = await poverty.findOne({
            where:{
                poverty_id:searchList[i].poverty_id
            },
        })
        let userResult = null
        let userName = ''
        if(permission != 0){
            userResult = await user.findOne({
                where:{
                    user_id:searchList[i].responsible_person_id
                }
            })
            userName = userResult.dataValues.name
        }
        const povertyName = povertyResult.dataValues.name
        result.forEach(item=>{
            const {measure,start_time,end_time,effect,help_effect_id} = item.dataValues
            if(permission == 0){
                helpEffectList.push({help_effect_id,povertyName,measure,start_time,end_time,effect})
            }else{
                helpEffectList.push({help_effect_id,userName,povertyName,measure,start_time,end_time,effect})
            } 
        })
    }
    console.log(helpEffectList);
    return {helpEffectList,count,totalPages}
}
/* getHelpLogs(2) */



//编写帮扶成效
const addHelpEffect = async (value)=>{
    const msgObj = {
        code:0,
        msg:'成效提交成功！'
    }
    try{
        const {measure,effect,start_time,end_time} = value
        const currentPair = await pair.findOne({
            where:{
                responsible_person_id:value.responsible_person_id,
                poverty_id:value.poverty_id
            }
        })
        const result = await help_effect.findOne({
            order:[['help_effect_id','DESC']]
        })
        await help_effect.create({
            pair_id:currentPair.dataValues.pairing_id,
            measure,
            effect,
            start_time:getFormatTime(start_time),
            end_time:getFormatTime(end_time),
            help_effect_id:result == null ? 1 : result.dataValues.help_effect_id + 1
        })
        msgObj.code = 200
        console.log('插入成功',result);
    }catch(err){
        msgObj.msg='成效提交失败！'
        console.log('插入失败',err);
    }
    return msgObj
}
/* addHelpLogs({responsible_person_id:2,poverty_id:1,content:'fuck',demand:'fuck',solve:'fuck'}) */
//修改帮扶成效
const modifyHelpEffect = async (id,value)=>{
   if(value.start_time){
      value.start_time = getFormatTime(value.start_time)
   }
   if(value.end_time){
    value.end_time = getFormatTime(value.end_time)
 }
   await help_effect.update({
       ...value
   },{
    where:{
        help_effect_id:id
    }
   })
}
/* modifyHelpLogs(1,{content:'thanks'}) */
const deleteHelpEffect = async (id)=>{
    await help_effect.destroy({
        where:{
            help_effect_id:id
        }
    })
}
/* deleteHelpLogs(1) */
/* addHelpLogs({responsible_person_id:2,poverty_id:4,content:'114514',demand:'555555',solve:'6666666'}) */
const gethistoryLogs = async (value)=>{
    const result = await history_log.findAndCountAll({
        limit:value.limit,
        offset:(value.page - 1) * value.limit,
    })
    const list = result.rows.map(item=>item.dataValues)
    const count = result.count
    const totalPages = Math.ceil(count / value.limit)
    return {
        list,
        count,
        totalPages
    }
}
const getHistoryEffect = async ()=>{
    const result = await history_effect.findAndCountAll({
        limit:value.limit,
        offset:(value.page - 1) * value.limit,
    })
    const list = result.rows.map(item=>item.dataValues)
    const count = result.count
    const totalPages = Math.ceil(count / value.limit)
    return {
        list,
        count,
        totalPages
    }
}
module.exports={
    pairing,
    deleteHelpEffect,
    modifyHelpEffect,
    addHelpEffect,
    getHelpEffect,
    deleteHelpLogs,
    modifyHelpLogs,
    addHelpLogs,
    getMyPovertyList,
    changeBinding,
    getHelpLogs,
    getPovertyAndHelper,
    unbind,
    gethistoryLogs,
    getHistoryEffect
}