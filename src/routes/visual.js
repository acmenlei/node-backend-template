const express = require('express');
const router = express.Router();
const Article = require("../models/article")
const Tip = require('../common/tip/tip');
const redis = require('../connect/redis')
const { VISUAL_LIST } = require('../common/schedule')

/* 获取文章分类 分组 */
router.get('/queryCategoryGroup', async(request, response) => {
    try {
        const data = await Article.count({ group: 'll_category', attributes: ['ll_category'], })
        return response.json({ code: 200, data, msg: Tip.SEARCH_OK })
    } catch {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})

/* 获取近30日访问量 */
router.post('/queryVisitedBythirtyDay', (request, response) => {
    const { startTime, endTime } = request.body;
    // 查询后的回调
    const queryCallback = (error, result) => {
        if (!error) {
            let len = result.length;
            let TIME = [],
                DATA = [];
            for (let i = 0; i < len; i++) {
                let temp = result[i].split('+');
                let time = temp[0]
                let data = JSON.parse(temp[1]);
                data.dayTime = time;
                TIME.unshift(time);
                DATA.unshift(data);
            }
            return response.json({ data: { TIME, DATA }, code: 200, msg: Tip.SEARCH_OK })
        }
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
    redis.lrange(VISUAL_LIST, startTime, endTime, queryCallback);
})

module.exports = router;