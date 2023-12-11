const {initModels} = require('../model/init-models')
const {news} = initModels()
const {getFormatTime} = require('../utils/time')

//新闻
const getNewsList = async ()=>{
    const result = await news.findAll()
    return result
}

const addNews = async (values,imgUrl)=>{
    const {new_title,new_content,new_source} = values
    const msgObj = {
        code:0,
        msg:'成功添加新闻！'
    }
       /*  const result = await news.findOne({
            order:[['news_id','DESC']]
        }) */
        /* console.log(result); */
        news.create({
           news_id:1,
           title:new_title,
           picture:imgUrl,
           content:new_content,
           source:new_source,
           publication_time:getFormatTime()
        }).then(result=>{
            msgObj.code = 200
            console.log('插入成功',result);
        }).catch(err=>{
            msgObj.msg='创建新闻失败！'
            console.log('插入失败',err);
        })
    
    return msgObj
}

const deleteNewsById = async (id)=>{
    await news.destroy({
        where:{
           news_id:id
        }
     })
}

const modifyNewsById = async (id,values)=>{
    await news.update(values,{
        where:{
            news_id:id
        }
    })
}
module.exports = {
    getNewsList,
    addNews,
    deleteNewsById,
    modifyNewsById
}