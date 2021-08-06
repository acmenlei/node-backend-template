const express = require('express');
const router = express.Router();
const Article = require("../models/article")
const Tip = require('../common/tip/tip');

/* 获取文章分类 分组 */
router.get('/getCategoryGroup', async(request, response) => {
    try {
        const data = await Article.count({ group: 'll_category', attributes: ['ll_category'], })
        return response.json({ code: 200, data, msg: Tip.SEARCH_OK })
    } catch {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})

/* 获取近30日访问量 */
router.get('/visitedBythirtyDay', async(request, response) => {

})

module.exports = router;