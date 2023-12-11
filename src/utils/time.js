const moment = require('moment')
const sequelize = require('sequelize')
require('moment/locale/zh-cn')
moment.locale('zh-cn')

const getFormatTime = (str = '')=>{
   if(str == ''){
    const now = moment()
    const formatted = now.format('YYYY-MM-DD HH:mm:ss')
    console.log(formatted);
    return sequelize.fn('STR_TO_DATE', formatted, '%Y-%m-%d %H:%i:%s')
   }
   return sequelize.fn('STR_TO_DATE',str,'%Y-%m-%d')
}

module.exports = {
    getFormatTime
}