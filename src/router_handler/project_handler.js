const {initModels} = require('../model/init-models')
const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const {project,assignment,evaluation,user} = initModels()
const {getFormatTime} = require('../utils/time')
const {getPermission} = require('../utils/permission')


//申请项目 
const applyProject = async (value)=>{
    const msgObj = {
        code:0,
        msg:'项目提交成功！'
    }
    try{
        const result = await project.findOne({
            order:[['project_id','DESC']]
        })
        await project.create({
            project_id:result == null ? 1 : result.dataValues.project_id + 1,
            ...value,
            statu:0
        })
        msgObj.code = 200
        console.log('插入成功',result);
    }catch(err){
        msgObj.msg='项目提交失败！'
        console.log('插入失败',err);
    }
    return msgObj
}

//获取项目列表 分页数据limit 和 page ，搜索数据searchValue
const getProjectList = async (value,searchValue = null)=>{
    let result = null
    if(searchValue){
        result = await project.findAndCountAll({
                limit:value.limit,
                offset:(value.page - 1) * value.limit,
                where:{
                    ...searchValue
                }
            })
    }else{
        result = await project.findAndCountAll({
            limit:value.limit,
            offset:(value.page - 1) * value.limit,
        })
    }
    
    const projectList = result.rows.map(item=>item.dataValues)
    const count = result.count
    const totalPages = Math.ceil(count / value.limit)
    console.log(projectList);
    console.log(count);
    console.log(totalPages);
    return {
        projectList,
        count,
        totalPages
    }
}
/* getProjectList({limit:10,page:1}) */

//项目审核  value.statu 1不通过  2通过
const reviewProject = async (value)=>{
    await project.update({
        statu:value.statu
    },{
        where:{
            project_id:value.project_id,
            statu:0
        }
    })
}
//项目分配
const assigned = async (value)=>{
    const msgObj = {
        code:0,
        msg:'项目分配成功！'
    }
    try{
        await project.update({
            statu:3
        },{
            where:{
                project_id:value.project_id,
                statu:2
            }
        })
        const result = await assignment.findOne({
            order:[['assignment_id','DESC']]
        })
        await assignment.create({
            assignment_id:result == null ? 1 : result.dataValues.assignment_id + 1,
            ...value,
            start_time:getFormatTime()
        })
        msgObj.code = 200
        console.log('插入成功',result);
    }catch(err){
        msgObj.msg='项目分配失败！'
        console.log('插入失败',err);
    }
    return msgObj
}

//获取项目分配列表
const getAssignmentList = async (id)=>{
    const permission = getPermission(id)
    let result = null
    if(permission == 0){
        result = await assignment.findAll({
            where:{
                leader_id:id
            }
        })
    }else{
        result = await assignment.findAll()
    }
    const searchList = result.map(item=>{
        const {assignment_id,project_id,leader_id,end_time} = item.dataValues
        return {assignment_id,project_id,leader_id,end_time}
    })

    const assignmentList = []
    for(let i = 0;i < searchList.length;i++){
        const projectResult = await project.findOne({
            where:{
                project_id:searchList[i].project_id
            }
        })
        const userResult = await user.findOne({
            where:{
                user_id:searchList[i].leader_id
            }
        })
        assessmentList.push({
            assignment_id:searchList[i].assignment_id,
            project_id:searchList[i].project_id,
            projectName:projectResult.dataValues.project_name,
            leader_id:searchList[i].leader_id,
            userName:userResult.dataValues.name,
            end_time:searchList[i].end_time
        })
    }
    console.log(assignmentList);
    return assignmentList
}
//获取项目评价(已经评价和未评价)
const getEvaluationList = async (id)=>{
    const permission = getPermission(id)
    let listResult = null
    if(permission == 0){
        const result = await assignment.findAll({
            where:{
                leader_id:id
            }
        })
        const searchId = result.map(item=>item.dataValues.assignment_id)
        listResult = await evaluation.findAll({
            where:{
                assignment_id:{
                    [Op.in]:searchId
                }
            }
        })
    }else{
        listResult = await evaluation.findAll()
    } 
    const searchList = listResult.map(item=>{
        const {assignment_id,project_effect,assessment} = item.dataValues
        return {assignment_id,project_effect,assessment}
    })

    const evaluationList = []
    for(let i = 0;i < searchList.length;i++){
        const assignmentResult = await assignment.findOne({
            where:{
                assignment_id:searchList[i].assignment_id
            }
        })
        const projectResult = await project.findOne({
            where:{
                project_id:assignmentResult.dataValues.project_id
            }
        })
        const userResult = await user.findOne({
            where:{
                user_id:assignmentResult.dataValues.leader_id
            }
        })
        evaluationList.push({
            assignment_id:searchList[i].assignment_id,
            project_id:assignmentResult.dataValues.project_id,
            projectName:projectResult.dataValues.project_name,
            leader_id:assignmentResult.dataValues.leader_id,
            leaderName:userResult.dataValues.name,
            project_effect:searchList[i].project_effect,
            assessment:searchList[i].assessment
        })
    }
    console.log(evaluationList);
    return evaluationList
}
//完成项目
const completeTask = async (value)=>{
    await project.update({
        statu:4,
    },{
        where:{
            project_id:value.project_id,
            statu:3
        }
    })
    await assignment.update({
        end_time:getFormatTime()
    },{
        where:{
            project_id:value.project_id
        }
    })
    const currentAssignment = await assignment.findOne({
        where:{
            project_id:value.project_id
        }
    })
    await evaluation.create({
        assignment_id:currentAssignment == null ? 1 : currentAssignment.dataValues.assignment_id + 1,
        project_effect:value.project_effect
    })
}

//项目评估
const evaluateProject = async (value)=>{
     await evaluation.update({
        assessment:value.assessment
     },{
        where:{
            assignment_id:value.assignment_id
        }
     })
}



module.exports={
    applyProject,
    getProjectList,
    reviewProject,
    assigned,
    getAssignmentList,
    getEvaluationList,
    completeTask,
    evaluateProject
}