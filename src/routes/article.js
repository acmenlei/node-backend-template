const Tip = require('../common/tip/tip')
const express = require('express');
const router = express.Router();
const Article = require("../models/Article")
/* 获取列表 */
router.post("/list", async (request, response) => {
    const { pageSize, pageNum } = request.body;
    try {
        const data = await Article.findAll({ limit: Number(pageSize), offset: (pageNum - 1) * pageSize });
        return response.json({ data, msg: Tip.SEARCH_OK, code: 200 })
    } catch (e) {
        return response.json({ msg: Tip.SEARCH_ERROR, code: -999 })
    }
})
/* 发表 */
router.post("/publish", async (request, response) => {
    const {
        ll_title,
        ll_introduce,
        ll_content,
        ll_content_html,
        ll_category,
        ll_tags,
        // ll_visitedCounts,
        // ll_likedCounts,
        ll_cover } = request.body,
        ll_id = new Date().getTime();
    const data = await Article.create({
        ll_id,
        ll_title,
        ll_introduce,
        ll_content,
        ll_content_html,
        ll_category,
        ll_tags,
        // ll_visitedCounts,
        // ll_likedCounts,
        ll_cover
    });
    return response.json({ data, msg: Tip.ARTICLE_PUBLISH_SUCCESS, code: 200 })
})

module.exports = router;