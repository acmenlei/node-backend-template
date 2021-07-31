const Tip = require('../common/tip/tip')
const express = require('express');
const router = express.Router();
const Article = require("../models/Article");
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
/* 获取单篇 */
router.post("/single", async (request, response) => {
    const { ll_id } = request.body;
    try {
        const data = await Article.findOne({ where: { ll_id } })
        return response.json({ code: 200, data, msg: Tip.SEARCH_OK })
    } catch (e) {
        return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
    }
})
/* 删除单篇 */
router.post('/delete', async (request, response) => {
    const { ll_id } = request.body;
    try {
        const flag = await Article.destroy({ where: { ll_id } });
        return response.json({ code: 200, count: flag, msg: Tip.OPERATOR_OK })
    } catch (e) {
        return response.json({ code: -999, msg: Tip.OPERATOR_ERROR })
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
    try {
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
        return response.json({ data, msg: Tip.OPERATOR_OK, code: 200 })
    } catch {
        return response.json({ msg: Tip.OPERATOR_ERROR, code: -999 })
    }
})

/* 更新 */
router.post("/update", async (request, response) => {
    const {
        ll_id,
        ll_title,
        ll_introduce,
        ll_content,
        ll_content_html,
        ll_category,
        ll_tags,
        ll_cover } = request.body;
    try {
        const data = await Article.update({
            ll_title,
            ll_introduce,
            ll_content,
            ll_content_html,
            ll_category,
            ll_tags,
            ll_cover
        }, { where: { ll_id } });
        return response.json({ data, msg: Tip.OPERATOR_OK, code: 200 })
    } catch {
        return response.json({ msg: Tip.OPERATOR_ERROR, code: 200 })
    }
})

module.exports = router;