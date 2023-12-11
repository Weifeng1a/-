const {initModels} = require('../model/init-models')
const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const {poverty,village,location} = initModels()

//统计各个导致贫困原因的人数
const countReason = async ()=>{
    const reason = ['因病','因学','因残','因灾','缺土地','缺技术','缺劳动力','缺资金','自身发展动力不足','交通条件不便','缺水']
    const result = await poverty.findAll({
        attributes:['poverty_reason',[Sequelize.fn('COUNT',Sequelize.col('poverty_reason')),'count']],
        group:['poverty_reason'],
        where:{
            poverty_reason:reason
        }
    })
    result.forEach(item=>{
        console.log(`${item.poverty_reason}:${item.dataValues.count}`);
    })
    
}

//获取平均年收入
const getAverageIncome = async ()=>{
    const result = await poverty.findOne({
        attributes:[
            [Sequelize.fn('avg',Sequelize.col('income')),'avgincome']
        ]
    }) 
    console.log(result.dataValues.avgincome);
    return result.dataValues.avgincome
}


//统计贫困村的人数
const getPovertyCount = async ()=>{
    const result = await village.findAll()
    const dataList = result.map(item=>{
        return {
            village:item.dataValues.village_name,
            num:item.dataValues.household_num
        }
    })
    return dataList
}

//获取地图信息
const getLocation = async ()=>{
    const result = await location.findAll()
    const data = result.map(item=>{
        return {
            name:item.dataValues.city,
            value:item.dataValues.village_num
        }
    })
    const geoCoordMap = {}
    result.forEach(item=>{
        geoCoordMap[item.dataValues.city] = [item.dataValues.abscissa,item.dataValues.ordinate]
    })
    console.log(geoCoordMap);
    console.log(data);
    return {
        geoCoordMap,
        data
    }
}

module.exports={
    getLocation,
    countReason,
    getPovertyCount,
    getAverageIncome
}