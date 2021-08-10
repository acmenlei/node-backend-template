const Tip = require('../common/tip/tip')
const express = require('express');
const router = express.Router();
const Article = require("../models/Article");
const { Op } = require('../connect/mysql')
const { increaseArticlePublish } = require('../common/visual')

/* 获取列表 */
router.post("/list", async(request, response) => {
        const { pageSize, pageNum, ll_category, ll_title } = request.body;
        try {
            const filterCondition = {
                ll_category,
                ll_title: {
                    [Op.like]: `%${ll_title}%` // 模糊查询
                }
            };
            // 如果存在再查询 不存在则不放入where条件
            !ll_category && delete filterCondition.ll_category;
            !ll_title && delete filterCondition.ll_title;
            // 查询每页文章并 统计文章总数
            const { rows, count } = await Article.findAndCountAll({
                limit: Number(pageSize),
                offset: (pageNum - 1) * pageSize,
                where: filterCondition
            });
            return response.json({ data: rows, total: count, msg: Tip.SEARCH_OK, code: 200 })
        } catch (e) {
            return response.json({ msg: Tip.SEARCH_ERROR, code: -999 })
        }
    })
    /* 获取单篇 */
router.post("/single", async(request, response) => {
        const { ll_id } = request.body;
        try {
            const data = await Article.findOne({ where: { ll_id } })
            return response.json({ code: 200, data, msg: Tip.SEARCH_OK })
        } catch (e) {
            return response.json({ code: -999, msg: Tip.SEARCH_ERROR })
        }
    })
    /* 删除单篇 */
router.post('/delete', async(request, response) => {
        const { ll_id } = request.body;
        try {
            const flag = await Article.destroy({ where: { ll_id } });
            return response.json({ code: 200, count: flag, msg: Tip.OPERATOR_OK })
        } catch (e) {
            return response.json({ code: -999, msg: Tip.OPERATOR_ERROR })
        }
    })
    /* 发表 */
router.post("/publish", async(request, response) => {
    const {
        ll_title,
        ll_introduce,
        ll_content,
        ll_content_html,
        ll_category,
        ll_tags,
        // ll_visitedCounts,
        // ll_likedCounts,
        ll_cover
    } = request.body,
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
        increaseArticlePublish(); // 文章发布数量自增
        return response.json({ data, msg: Tip.OPERATOR_OK, code: 200 })
    } catch {
        return response.json({ msg: Tip.OPERATOR_ERROR, code: -999 })
    }
})

/* 更新 */
router.post("/update", async(request, response) => {
    const {
        ll_id,
        ll_title,
        ll_introduce,
        ll_content,
        ll_content_html,
        ll_category,
        ll_tags,
        ll_cover
    } = request.body;
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