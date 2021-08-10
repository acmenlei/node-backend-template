const redis = require('../../connect/redis');
const { VISUAL_LIST } = require('../schedule')
const FRIST = 0;

/* 公共处理函数 */
const commonHandler = (result) => {
        let dataSplit = null,
            dateTime = null,
            data = null
        try {
            dataSplit = result[0] && result[0].split('+');
            dateTime = dataSplit[0]; // 时间
            data = JSON.parse(dataSplit[1]);
        } catch {
            return { dateTime, data }
        }
        return { dateTime, data }
    }
    // 处理访问量
const queryCallbackofVisite = (error, result) => {
        if (!error) {
            let { dateTime, data } = commonHandler(result);
            if (dateTime == null || data == null) {
                return
            }
            data.visitedCountBysite = data.visitedCountBysite + 1; // 访问量自增
            let newValue = dateTime + '+' + JSON.stringify(data); // 新值
            redis.lset(VISUAL_LIST, FRIST, newValue); // 给当前List最新的一条设置
        }
    }
    // 处理文章发布数量
const queryCallbackofArticlePublish = (error, result) => {
        if (!error) {
            let { dateTime, data } = commonHandler(result);
            if (dateTime == null || data == null) {
                return
            }
            data.articlePublishCountBysite = data.articlePublishCountBysite + 1; // 访问量自增
            let newValue = dateTime + '+' + JSON.stringify(data); // 新值
            redis.lset(VISUAL_LIST, FRIST, newValue); // 给当前List最新的一条设置
        }
    }
    // 处理文章注册人数
const queryCallbackofRegister = (error, result) => {
    if (!error) {
        let { dateTime, data } = commonHandler(result);
        if (dateTime == null || data == null) {
            return
        }
        data.registerCountBysite = data.registerCountBysite + 1; // 访问量自增
        let newValue = dateTime + '+' + JSON.stringify(data); // 新值
        redis.lset(VISUAL_LIST, FRIST, newValue); // 给当前List最新的一条设置
    }
}

// 处理文章登录人数
const queryCallbackofLogin = (error, result) => {
    if (!error) {
        let { dateTime, data } = commonHandler(result);
        if (dateTime == null || data == null) {
            return
        }
        data.loginCountBysite = data.loginCountBysite + 1; // 访问量自增
        let newValue = dateTime + '+' + JSON.stringify(data); // 新值
        redis.lset(VISUAL_LIST, FRIST, newValue); // 给当前List最新的一条设置
    }
}

const increaseVisited = () => {
    redis.lrange(VISUAL_LIST, 0, 0, queryCallbackofVisite)
}

const increaseArticlePublish = () => {
    redis.lrange(VISUAL_LIST, 0, 0, queryCallbackofArticlePublish)
}

const increaseRegister = () => {
    redis.lrange(VISUAL_LIST, 0, 0, queryCallbackofRegister)
}

const increaseLogin = () => {
    redis.lrange(VISUAL_LIST, 0, 0, queryCallbackofLogin)
}

module.exports = {
    increaseVisited,
    increaseArticlePublish,
    increaseRegister,
    increaseLogin
}