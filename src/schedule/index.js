const schedule = require('node-schedule');
const redis = require('../connect/redis')
const VISUAL_LIST = 'VISUAL_LIST';
const moment = require('moment');

// 创建定时任务
const generateTimerTasks = async() => {
    let TAST_HASH = {
        visitedCountBysite: 0, // 访问量
        loginCountBysite: 0, // 登录量
        registerCountBysite: 0, // 注册量
        likedCountBysite: 0, // 点赞量
        articlePublishCountBysite: 0, // 文章发布量
    }
    let TIME = moment(new Date()).format("YYYY-MM-DD");
    TAST_HASH = TIME + '+' + JSON.stringify(TAST_HASH); // 以日期+字符串形式存储
    await redis.lpush(VISUAL_LIST, TAST_HASH); // 创建网站统计hash
}

// 执行定时任务
const scheduleControl = () => {
    // 每天的0点0分0秒执行当前任务
    schedule.scheduleJob('0 0 0 * * *', generateTimerTasks);
}

module.exports = {
    scheduleControl,
    VISUAL_LIST
}