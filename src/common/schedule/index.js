const schedule = require('node-schedule');
const redis = require('../../connect/redis')
const VISUAL_LIST = 'VISUAL_LIST';
const moment = require('moment');

// 创建定时任务
const generateTimerTasks = async() => {
        let TAST_HASH = {
            visitedCountBysite: 0, // 访问量
            loginCountBysite: 0, // 登录量
            likedCountBysite: 0, // 点赞量
            articlePublishCountBysite: 0, // 文章发布量
        }
        let TIME = moment(new Date()).format("YYYY-MM-DD");
        TAST_HASH = TIME + '+' + JSON.stringify(TAST_HASH); // 以日期+字符串形式存储
        console.log(TAST_HASH);
        await redis.lpush(VISUAL_LIST, TAST_HASH); // 创建网站统计hash
    }
    // 查询后的回调
const queryCallback = (error, result) => {
    if (!error) {
        let len = result.length;
        let TIME = [],
            DATA = [];
        for (let i = 0; i < len; i++) {
            TIME.push(result[i].split('+')[0])
            DATA.push(result[i].split('+')[1])
        }
        console.log(TIME, DATA);
    }
}

// 执行定时任务
const scheduleControl = () => {
    // 每天的0点0分0秒执行当前任务
    schedule.scheduleJob('0 0 0 * * *', generateTimerTasks);
    // redis.lrange(VISUAL_LIST, 0, 0, queryCallback);
}

module.exports = {
    scheduleControl
}